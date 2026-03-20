import { useEffect, useMemo, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import toast from "react-hot-toast";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useCart } from "@/features/cart/CartContext";
import OrderSummaryCard from "../components/OrderSummaryCard";
import { clearCheckoutDraft, getCheckoutDraft } from "../order.storage";
import {
  createOrderAPI,
  createStripePaymentIntentAPI,
} from "../order.service";
import PaymentForm from "../components/PaymentForm";
import { STRIPE_PUBLISHABLE_KEY } from "@/lib/env";

const stripePromise = STRIPE_PUBLISHABLE_KEY
  ? loadStripe(STRIPE_PUBLISHABLE_KEY)
  : null;

export default function PaymentPage() {
  if (!stripePromise) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-4">
        <div className="surface-card w-full max-w-md p-6">
          <h1 className="text-xl font-semibold text-foreground">Stripe not configured</h1>
          <p className="mt-2 text-sm text-foreground/70">
            Set VITE_STRIPE_PUBLISHABLE_KEY in your environment and reload.
          </p>
        </div>
      </div>
    );
  }

  return (
    <Elements stripe={stripePromise}>
      <PaymentContent />
    </Elements>
  );
}

function PaymentContent() {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { clearCart } = useCart();
  const checkoutDraft = useMemo(() => getCheckoutDraft(), []);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [intentLoading, setIntentLoading] = useState(true);
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  useEffect(() => {
    const initIntent = async () => {
      if (!checkoutDraft) return;
      setIntentLoading(true);
      try {
        const intent = await createStripePaymentIntentAPI(
          checkoutDraft.totalAmount
        );
        setClientSecret(intent.clientSecret);
        setError("");
      } catch (err: any) {
        setError(
          err?.message || "Unable to start payment. Please refresh and retry."
        );
      } finally {
        setIntentLoading(false);
      }
    };
    initIntent();
  }, [checkoutDraft]);

  if (!checkoutDraft) {
    return <Navigate to="/checkout" replace />;
  }

  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: { pathname: "/payment" } }}
      />
    );
  }

  const handlePayment = async () => {
    setError("");

    if (!stripe || !elements || !clientSecret) {
      setError("Payment is still preparing. Please wait a moment.");
      return;
    }

    setLoading(true);

    try {
      const cardElement = elements.getElement(CardElement);
      if (!cardElement) {
        throw new Error("Card element not ready");
      }

      const { error: confirmError, paymentIntent } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: cardElement,
            billing_details: {
              name: checkoutDraft.shippingInfo.name,
              email: checkoutDraft.shippingInfo.email,
              phone: checkoutDraft.shippingInfo.phone,
            },
          },
        });

      if (confirmError || paymentIntent?.status !== "succeeded") {
        throw new Error(confirmError?.message || "Card could not be charged.");
      }

      const order = await createOrderAPI({
        items: checkoutDraft.items.map((item) => ({
          productId: Number(item.id),
          quantity: item.quantity,
          price: item.price,
        })),
        totalAmount: checkoutDraft.totalAmount,
        customerName: checkoutDraft.shippingInfo.name,
        customerEmail: checkoutDraft.shippingInfo.email,
        shippingAddress: checkoutDraft.shippingInfo.address,
        phone: checkoutDraft.shippingInfo.phone,
        paymentStatus: "paid",
        paymentMethod: "stripe",
        paymentReference: paymentIntent.id,
        status: "confirmed",
      });

      clearCheckoutDraft();
      clearCart();
      toast.success("Payment successful. Your order has been placed.");
      navigate(`/orders/${order.id}`, { replace: true });
    } catch (requestError: any) {
      console.error(requestError);
      setError(
        requestError?.message ||
          "Unable to place your order right now. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-amber-50 via-white to-rose-50 px-4 py-10 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(251,146,60,0.12),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(244,114,182,0.12),transparent_40%)]" />
      <div className="relative mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1fr_0.85fr]">
        <div className="rounded-[2rem] border border-border/60 bg-card/85 p-8 shadow-xl backdrop-blur">
          <h1 className="mt-4 text-4xl font-semibold text-foreground">
            Pay with Card
          </h1>
          <p className="mt-3 text-sm text-foreground/70">
            Fast, secure checkout powered by Stripe. We never store your card details.
          </p>

          <PaymentForm
            amount={checkoutDraft.totalAmount}
            loading={loading}
            error={error}
            isReady={Boolean(stripe && elements && clientSecret) && !intentLoading}
            preparing={intentLoading || !clientSecret}
            cardElement={<CardElement options={cardStyleOptions} />}
            onSubmit={handlePayment}
          />
        </div>

        <OrderSummaryCard
          items={checkoutDraft.items}
          totalAmount={checkoutDraft.totalAmount}
          title="Amount to charge"
        />
      </div>
    </section>
  );
}

const cardStyleOptions = {
  style: {
    base: {
      color: "var(--color-foreground, #0f172a)",
      fontSize: "16px",
      "::placeholder": { color: "#94a3b8" },
    },
    invalid: { color: "#ef4444" },
  },
};
