import React from "react";
import { AlertCircle, LoaderCircle, ShieldCheck } from "lucide-react";

interface PaymentFormProps {
  amount: number;
  loading: boolean;
  error: string;
  cardElement: React.ReactNode;
  onSubmit: () => Promise<void>;
}

export default function PaymentForm({
  amount,
  loading,
  error,
  cardElement,
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
          Pay securely with Stripe
        </span>
      </div>

      <div className="space-y-3 rounded-2xl border border-slate-200 px-4 py-4">
        <p className="font-medium text-slate-900">Pay with card</p>
        <p className="text-sm text-slate-500">
          Secure checkout powered by Stripe. We never store your card details.
        </p>
        <div className="mt-3 rounded-xl border border-slate-100 bg-white p-3">
          {cardElement}
        </div>
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
          <>Continue</>
        )}
      </button>
    </form>
  );
}
