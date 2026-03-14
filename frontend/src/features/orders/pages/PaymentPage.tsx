import { useMemo, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useCart } from "@/features/cart/CartContext";
import OrderSummaryCard from "../components/OrderSummaryCard";
import { clearCheckoutDraft, getCheckoutDraft } from "../order.storage";
import { createOrderAPI } from "../order.service";
import PaymentForm from "../components/PaymentForm";

export default function PaymentPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { clearCart } = useCart();
  const checkoutDraft = useMemo(() => getCheckoutDraft(), []);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<
    "cash_on_delivery" | "pay_on_pickup"
  >("cash_on_delivery");

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
    setLoading(true);

    try {
      const isCashOnDelivery = paymentMethod === "cash_on_delivery";

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
        paymentStatus: isCashOnDelivery ? "pending" : "awaiting_payment",
        paymentMethod,
        status: "confirmed",
      });

      clearCheckoutDraft();
      clearCart();
      toast.success("Order placed successfully.");
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
    <section className="min-h-screen bg-[linear-gradient(135deg,#fff7ed_0%,#ffffff_40%,#f8fafc_100%)] px-4 py-10">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1fr_0.85fr]">
        <div className="rounded-[2rem] border border-slate-100 bg-white p-8 shadow-sm">
          <h1 className="mt-4 text-4xl font-semibold text-slate-900">
            Choose payment method
          </h1>
          <p className="mt-3 text-sm text-slate-500">
            Stripe has been removed from checkout. Choose how you want to pay,
            place the order, and we&apos;ll save it right away.
          </p>

          <PaymentForm
            amount={checkoutDraft.totalAmount}
            loading={loading}
            error={error}
            paymentMethod={paymentMethod}
            onPaymentMethodChange={setPaymentMethod}
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
