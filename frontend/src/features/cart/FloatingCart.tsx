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
    <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 bg-orange-500 text-white px-6 py-4 rounded-xl shadow-lg flex items-center justify-between w-[90%] max-w-xl z-50">

      <div className="flex items-center gap-3">
        <ShoppingCart size={22} />
        <span className="font-medium">
          {totalItems} item{totalItems > 1 ? "s" : ""}
        </span>
      </div>

      <button
        onClick={() => navigate("/cart")}
        className="font-semibold"
      >
        View Cart → ${totalPrice.toFixed(2)}
      </button>

    </div>
  );
}