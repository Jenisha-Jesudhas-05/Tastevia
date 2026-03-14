import { useMemo, useState, type ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/features/cart/CartContext";
import { useAuth } from "@/features/auth/hooks/useAuth";
import OrderSummaryCard from "../components/OrderSummaryCard";
import { saveCheckoutDraft } from "../order.storage";
import type { ShippingInfo } from "../types/order.types";
import CheckoutForm from "../components/CheckoutForm";

const emptyShippingInfo: ShippingInfo = {
  name: "",
  email: "",
  address: "",
  phone: "",
};

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { cart, totalPrice } = useCart();
  const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({
    ...emptyShippingInfo,
    name: user?.name ?? "",
    email: user?.email ?? "",
  });
  const [error, setError] = useState("");

  const cartItems = useMemo(() => cart, [cart]);

  const handleChange =
    (field: keyof ShippingInfo) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setShippingInfo((current) => ({
        ...current,
        [field]: event.target.value,
      }));
    };

  const handleProceedToPayment = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!cartItems.length) {
      setError("Your cart is empty. Add a few items before checkout.");
      return;
    }

    const hasMissingField = Object.values(shippingInfo).some(
      (value) => !value.trim()
    );

    if (hasMissingField) {
      setError("Please complete all shipping details before continuing.");
      return;
    }

    saveCheckoutDraft({
      items: cartItems,
      shippingInfo,
      totalAmount: totalPrice,
    });

    navigate("/payment");
  };

  return (
    <section className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(251,146,60,0.14),_transparent_42%),linear-gradient(180deg,#fff7ed_0%,#ffffff_52%,#fffaf5_100%)] px-4 py-10">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-[2rem] border border-orange-100 bg-white/95 p-8 shadow-sm backdrop-blur">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-orange-500">
            Checkout
          </p>
          <h1 className="mt-3 text-4xl font-semibold text-gray-900">
            Shipping and order review
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-gray-500">
            Review your cart, confirm your delivery details, and continue to a
            secure payment step.
          </p>

          <div className="mt-8 space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex flex-col gap-4 rounded-3xl border border-gray-100 p-4 sm:flex-row sm:items-center"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-24 w-24 rounded-2xl object-cover"
                />

                <div className="flex-1">
                  <h2 className="text-lg font-semibold text-gray-900">
                    {item.name}
                  </h2>
                  <p className="mt-1 text-sm text-gray-500">
                    Quantity: {item.quantity}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-sm text-gray-500">
                    ${item.price.toFixed(2)} each
                  </p>
                  <p className="text-lg font-semibold text-gray-900">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <CheckoutForm
            shippingInfo={shippingInfo}
            error={error}
            onSubmit={handleProceedToPayment}
            onChange={handleChange}
          />
        </div>

        <OrderSummaryCard items={cartItems} totalAmount={totalPrice} />
      </div>
    </section>
  );
}
