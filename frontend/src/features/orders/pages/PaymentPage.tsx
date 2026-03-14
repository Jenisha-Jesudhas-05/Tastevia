import { useEffect, useMemo, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import type { Stripe, StripeElements } from "@stripe/stripe-js";
import toast from "react-hot-toast";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useCart } from "@/features/cart/CartContext";
import OrderSummaryCard from "../components/OrderSummaryCard";
import { clearCheckoutDraft, getCheckoutDraft } from "../order.storage";
import { createOrderAPI, createPaymentIntentAPI } from "../order.service";
import PaymentForm from "../components/PaymentForm";
import { STRIPE_PUBLISHABLE_KEY } from "@/lib/env";

const stripePromise = STRIPE_PUBLISHABLE_KEY
  ? loadStripe(STRIPE_PUBLISHABLE_KEY)
  : null;

export default function PaymentPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { clearCart } = useCart();
  const checkoutDraft = useMemo(() => getCheckoutDraft(), []);
  const [cardholderName, setCardholderName] = useState(
    checkoutDraft?.shippingInfo.name ?? ""
  );
  const [loading, setLoading] = useState(false);
  const [intentLoading, setIntentLoading] = useState(false);
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");

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

  useEffect(() => {
    const createIntent = async () => {
      try {
        setIntentLoading(true);
        setError("");
        const intent = await createPaymentIntentAPI({
          amount: checkoutDraft.totalAmount,
          currency: "usd",
        });
        setClientSecret(intent.clientSecret);
      } catch (requestError) {
        console.error(requestError);
        setError("Unable to initialize Stripe payment. Please try again.");
      } finally {
        setIntentLoading(false);
      }
    };

    if (!clientSecret) {
      void createIntent();
    }
  }, [checkoutDraft.totalAmount, clientSecret]);

  const handlePayment = async (stripe: Stripe, elements: StripeElements) => {
    if (!cardholderName.trim()) {
      setError("Cardholder name is required.");
      return;
    }

    const cardElement = elements.getElement("card");

    if (!cardElement || !clientSecret) {
      setError("Payment form is not ready yet. Please try again.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const paymentResult = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: cardholderName,
            email: checkoutDraft.shippingInfo.email,
            phone: checkoutDraft.shippingInfo.phone,
            address: {
              line1: checkoutDraft.shippingInfo.address,
            },
          },
        },
      });

      if (paymentResult.error) {
        throw new Error(paymentResult.error.message);
      }

      if (paymentResult.paymentIntent?.status !== "succeeded") {
        throw new Error("Payment was not completed successfully.");
      }

      const order = await createOrderAPI({
        userId: user.id,
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
        paymentReference: paymentResult.paymentIntent.id,
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
          "Payment failed. Please review your details and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-[linear-gradient(135deg,#fff7ed_0%,#ffffff_40%,#f8fafc_100%)] px-4 py-10">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1fr_0.85fr]">
        <div className="rounded-[2rem] border border-slate-100 bg-white p-8 shadow-sm">
          <h1 className="mt-4 text-4xl font-semibold text-slate-900">
            Complete your payment
          </h1>
          <p className="mt-3 text-sm text-slate-500">
            Pay securely with Stripe. Once payment succeeds, your order will be
            saved and you&apos;ll be redirected to the order details page.
          </p>

          {!STRIPE_PUBLISHABLE_KEY ? (
            <div className="mt-8 rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">
              Missing `VITE_STRIPE_PUBLISHABLE_KEY`. Add it in your frontend
              environment before using live Stripe payments.
            </div>
          ) : intentLoading ? (
            <div className="mt-8 flex items-center gap-2 text-sm text-slate-500">
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-orange-500 border-t-transparent" />
              Preparing secure payment form...
            </div>
          ) : clientSecret && stripePromise ? (
            <Elements stripe={stripePromise} options={{ clientSecret }}>
              <PaymentForm
                amount={checkoutDraft.totalAmount}
                loading={loading}
                error={error}
                cardholderName={cardholderName}
                onCardholderChange={setCardholderName}
                onSubmit={handlePayment}
              />
            </Elements>
          ) : (
            <div className="mt-8 rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">
              {error || "Unable to load Stripe payment details."}
            </div>
          )}
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
