import { AlertCircle, LoaderCircle, ShieldCheck } from "lucide-react";

interface PaymentFormProps {
  amount: number;
  loading: boolean;
  error: string;
  paymentMethod: "cash_on_delivery" | "pay_on_pickup";
  onPaymentMethodChange: (value: "cash_on_delivery" | "pay_on_pickup") => void;
  onSubmit: () => Promise<void>;
}

export default function PaymentForm({
  amount,
  loading,
  error,
  paymentMethod,
  onPaymentMethodChange,
  onSubmit,
}: PaymentFormProps) {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await onSubmit();
  };

  return (
    <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
      <div className="flex items-center gap-3 text-orange-500">
        <ShieldCheck size={20} />
        <span className="text-sm font-semibold uppercase tracking-[0.22em]">
          Offline payment options
        </span>
      </div>

      <div className="space-y-3">
        <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-slate-200 px-4 py-4 transition hover:border-orange-300">
          <input
            type="radio"
            name="paymentMethod"
            value="cash_on_delivery"
            checked={paymentMethod === "cash_on_delivery"}
            onChange={() => onPaymentMethodChange("cash_on_delivery")}
            className="mt-1 h-4 w-4 accent-orange-500"
          />
          <div>
            <p className="font-medium text-slate-900">Cash on delivery</p>
            <p className="mt-1 text-sm text-slate-500">
              Pay the delivery partner when your order arrives.
            </p>
          </div>
        </label>

        <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-slate-200 px-4 py-4 transition hover:border-orange-300">
          <input
            type="radio"
            name="paymentMethod"
            value="pay_on_pickup"
            checked={paymentMethod === "pay_on_pickup"}
            onChange={() => onPaymentMethodChange("pay_on_pickup")}
            className="mt-1 h-4 w-4 accent-orange-500"
          />
          <div>
            <p className="font-medium text-slate-900">Pay on pickup</p>
            <p className="mt-1 text-sm text-slate-500">
              Reserve the order now and pay when you collect it.
            </p>
          </div>
        </label>
      </div>

      <div className="rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-500">
        Order total:{" "}
        <span className="font-semibold text-slate-900">${amount.toFixed(2)}</span>
      </div>

      {error ? (
        <div className="flex items-center gap-2 rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">
          <AlertCircle size={16} />
          <span>{error}</span>
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
            Placing order
          </>
        ) : (
          <>Place order</>
        )}
      </button>
    </form>
  );
}
