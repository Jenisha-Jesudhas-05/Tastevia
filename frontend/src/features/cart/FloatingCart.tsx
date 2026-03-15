import { useCart } from "@/features/cart/CartContext";
import { useNavigate } from "react-router-dom";
import { ShoppingCart } from "lucide-react";

export default function FloatingCartBar() {
  const { cart } = useCart();
  const navigate = useNavigate();

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (cart.length === 0) return null;

  return (
    <div className="fixed bottom-5 left-1/2 z-50 flex w-[90%] max-w-xl -translate-x-1/2 items-center justify-between rounded-2xl bg-gradient-to-r from-orange-500 to-rose-500 px-6 py-4 text-white shadow-xl backdrop-blur">

      <div className="flex items-center gap-3">
        <ShoppingCart size={22} />
        <span className="font-medium">
          {totalItems} item{totalItems > 1 ? "s" : ""}
        </span>
      </div>

      <button
        onClick={() => navigate("/cart")}
        className="rounded-full bg-white/15 px-4 py-2 text-sm font-semibold shadow-sm transition hover:bg-white/25"
      >
        {`View Cart → ₹${totalPrice.toFixed(2)}`}
      </button>

    </div>
  );
}
