import type { ChangeEvent } from "react";
import { AlertCircle, ArrowRight } from "lucide-react";
import type { ShippingInfo } from "../types/order.types";

interface CheckoutFormProps {
  shippingInfo: ShippingInfo;
  error: string;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onChange: (
    field: keyof ShippingInfo
  ) => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export default function CheckoutForm({
  shippingInfo,
  error,
  onSubmit,
  onChange,
}: CheckoutFormProps) {
  return (
    <form className="mt-10 space-y-5" onSubmit={onSubmit}>
      <div className="grid gap-5 md:grid-cols-2">
        <label className="space-y-2 text-sm font-medium text-gray-700">
          <span>Full name</span>
          <input
            value={shippingInfo.name}
            onChange={onChange("name")}
            className="w-full rounded-2xl border border-gray-200 px-4 py-3 outline-none transition focus:border-orange-400"
            placeholder="Enter your full name"
          />
        </label>

        <label className="space-y-2 text-sm font-medium text-gray-700">
          <span>Email</span>
          <input
            type="email"
            value={shippingInfo.email}
            onChange={onChange("email")}
            className="w-full rounded-2xl border border-gray-200 px-4 py-3 outline-none transition focus:border-orange-400"
            placeholder="name@example.com"
          />
        </label>
      </div>

      <label className="block space-y-2 text-sm font-medium text-gray-700">
        <span>Shipping address</span>
        <textarea
          value={shippingInfo.address}
          onChange={onChange("address")}
          className="min-h-28 w-full rounded-2xl border border-gray-200 px-4 py-3 outline-none transition focus:border-orange-400"
          placeholder="Street, apartment, city, postal code"
        />
      </label>

      <label className="block space-y-2 text-sm font-medium text-gray-700">
        <span>Phone</span>
        <input
          value={shippingInfo.phone}
          onChange={onChange("phone")}
          className="w-full rounded-2xl border border-gray-200 px-4 py-3 outline-none transition focus:border-orange-400"
          placeholder="+1 555 123 4567"
        />
      </label>

      {error ? (
        <div className="flex items-center gap-2 rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">
          <AlertCircle size={16} />
          <span>{error}</span>
        </div>
      ) : null}

      <button
        type="submit"
        className="inline-flex items-center gap-2 rounded-2xl bg-orange-500 px-6 py-3 font-semibold text-white transition hover:bg-orange-600"
      >
        Proceed to Payment
        <ArrowRight size={18} />
      </button>
    </form>
  );
}
