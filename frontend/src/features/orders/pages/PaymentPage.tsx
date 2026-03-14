import { useMemo, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { CreditCard, LoaderCircle, ShieldCheck } from "lucide-react";
import toast from "react-hot-toast";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useCart } from "@/features/cart/CartContext";
import OrderSummaryCard from "../components/OrderSummaryCard";
import { clearCheckoutDraft, getCheckoutDraft } from "../order.storage";
import { createOrderAPI } from "../order.service";

export default function PaymentPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { clearCart } = useCart();
  const checkoutDraft = useMemo(() => getCheckoutDraft(), []);
  const [cardNumber, setCardNumber] = useState("4242 4242 4242 4242");
  const [cardName, setCardName] = useState(checkoutDraft?.shippingInfo.name ?? "");
  const [expiryDate, setExpiryDate] = useState("12/30");
  const [cvv, setCvv] = useState("123");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!checkoutDraft) {
    return <Navigate to="/checkout" replace />;
  }

  const handlePayment = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!user) {
      setError("Please log in to complete your order.");
      return;
    }

    if (!cardNumber.trim() || !cardName.trim() || !expiryDate.trim() || !cvv.trim()) {
      setError("Card details are required to continue.");
      return;
    }

    setError("");
    setLoading(true);

    try {
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
        paymentMethod: "mock_stripe",
        paymentReference: `mock_pi_${Date.now()}`,
        status: "confirmed",
      });

      clearCheckoutDraft();
      clearCart();
      toast.success("Payment successful. Your order has been placed.");
      navigate(`/orders/${order.id}`, { replace: true });
    } catch (requestError) {
      console.error(requestError);
      setError("Payment failed. Please review your details and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-[linear-gradient(135deg,#fff7ed_0%,#ffffff_40%,#f8fafc_100%)] px-4 py-10">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1fr_0.85fr]">
        <div className="rounded-[2rem] border border-slate-100 bg-white p-8 shadow-sm">
          <div className="flex items-center gap-3 text-orange-500">
            <ShieldCheck size={20} />
            <span className="text-sm font-semibold uppercase tracking-[0.22em]">
              Mock Stripe payment
            </span>
          </div>

          <h1 className="mt-4 text-4xl font-semibold text-slate-900">
            Complete your payment
          </h1>
          <p className="mt-3 text-sm text-slate-500">
            This mock payment screen is ready to swap with Stripe Elements
            later, but already supports order creation and success redirect.
          </p>

          <form className="mt-8 space-y-5" onSubmit={handlePayment}>
            <label className="block space-y-2 text-sm font-medium text-slate-700">
              <span>Name on card</span>
              <input
                value={cardName}
                onChange={(event) => setCardName(event.target.value)}
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-orange-400"
              />
            </label>

            <label className="block space-y-2 text-sm font-medium text-slate-700">
              <span>Card number</span>
              <div className="flex items-center gap-3 rounded-2xl border border-slate-200 px-4 py-3 focus-within:border-orange-400">
                <CreditCard size={18} className="text-slate-400" />
                <input
                  value={cardNumber}
                  onChange={(event) => setCardNumber(event.target.value)}
                  className="w-full outline-none"
                />
              </div>
            </label>

            <div className="grid gap-5 md:grid-cols-2">
              <label className="space-y-2 text-sm font-medium text-slate-700">
                <span>Expiry date</span>
                <input
                  value={expiryDate}
                  onChange={(event) => setExpiryDate(event.target.value)}
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-orange-400"
                />
              </label>

              <label className="space-y-2 text-sm font-medium text-slate-700">
                <span>CVV</span>
                <input
                  value={cvv}
                  onChange={(event) => setCvv(event.target.value)}
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-orange-400"
                />
              </label>
            </div>

            <div className="rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-500">
              Charged amount:{" "}
              <span className="font-semibold text-slate-900">
                ${checkoutDraft.totalAmount.toFixed(2)}
              </span>
            </div>

            {error ? (
              <div className="rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">
                {error}
              </div>
            ) : null}

            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-900 px-6 py-3 font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? (
                <>
                  <LoaderCircle size={18} className="animate-spin" />
                  Processing payment
                </>
              ) : (
                <>Pay ${checkoutDraft.totalAmount.toFixed(2)}</>
              )}
            </button>
          </form>
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
