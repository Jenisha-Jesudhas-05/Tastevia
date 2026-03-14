import { useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { AlertCircle, LoaderCircle, ShieldCheck } from "lucide-react";
import type { StripeCardElementOptions } from "@stripe/stripe-js";

const cardElementOptions: StripeCardElementOptions = {
  style: {
    base: {
      color: "#0f172a",
      fontFamily: "Geist Variable, sans-serif",
      fontSize: "16px",
      "::placeholder": {
        color: "#94a3b8",
      },
    },
    invalid: {
      color: "#dc2626",
    },
  },
};

interface PaymentFormProps {
  amount: number;
  loading: boolean;
  error: string;
  cardholderName: string;
  onCardholderChange: (value: string) => void;
  onSubmit: (
    stripe: NonNullable<ReturnType<typeof useStripe>>,
    elements: NonNullable<ReturnType<typeof useElements>>
  ) => Promise<void>;
}

export default function PaymentForm({
  amount,
  loading,
  error,
  cardholderName,
  onCardholderChange,
  onSubmit,
}: PaymentFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [localError, setLocalError] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!stripe || !elements) {
      setLocalError("Payment form is still loading. Please try again in a moment.");
      return;
    }

    setLocalError("");
    await onSubmit(stripe, elements);
  };

  return (
    <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
      <div className="flex items-center gap-3 text-orange-500">
        <ShieldCheck size={20} />
        <span className="text-sm font-semibold uppercase tracking-[0.22em]">
          Secure Stripe payment
        </span>
      </div>

      <label className="block space-y-2 text-sm font-medium text-slate-700">
        <span>Name on card</span>
        <input
          value={cardholderName}
          onChange={(event) => onCardholderChange(event.target.value)}
          className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-orange-400"
          placeholder="Cardholder full name"
        />
      </label>

      <label className="block space-y-2 text-sm font-medium text-slate-700">
        <span>Card details</span>
        <div className="rounded-2xl border border-slate-200 px-4 py-4 focus-within:border-orange-400">
          <CardElement options={cardElementOptions} />
        </div>
      </label>

      <div className="rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-500">
        Charged amount:{" "}
        <span className="font-semibold text-slate-900">${amount.toFixed(2)}</span>
      </div>

      {localError || error ? (
        <div className="flex items-center gap-2 rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">
          <AlertCircle size={16} />
          <span>{localError || error}</span>
        </div>
      ) : null}

      <button
        type="submit"
        disabled={loading || !stripe || !elements}
        className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-900 px-6 py-3 font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {loading ? (
          <>
            <LoaderCircle size={18} className="animate-spin" />
            Processing payment
          </>
        ) : (
          <>Pay ${amount.toFixed(2)}</>
        )}
      </button>
    </form>
  );
}
