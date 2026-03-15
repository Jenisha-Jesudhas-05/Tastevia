import { Link } from "react-router-dom";
import { useWishlist } from "../WishlistContext";
import { ShoppingCart, Trash2 } from "lucide-react";
import { useCart } from "@/features/cart/CartContext";
import toast from "react-hot-toast";

export default function WishlistPage() {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  if (!wishlist.length) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-16 text-center">
        <p className="text-lg text-slate-600">Your wishlist is empty.</p>
        <Link
          to="/menu"
          className="mt-6 inline-flex rounded-xl bg-orange-500 px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-orange-600"
        >
          Browse menu
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-slate-900">Wishlist</h1>
        <Link
          to="/menu"
          className="text-sm font-semibold text-orange-600 hover:text-orange-700"
        >
          Continue browsing
        </Link>
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {wishlist.map((item) => (
          <div
            key={item.id}
            className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm"
          >
            <img
              src={item.image}
              alt={item.name}
              className="h-40 w-full rounded-xl object-cover"
            />
            <div className="mt-3 space-y-1">
              <p className="text-sm font-semibold uppercase tracking-wide text-orange-500">
                {item.id}
              </p>
              <h2 className="text-lg font-semibold text-slate-900">
                {item.name}
              </h2>
              <p className="text-sm text-slate-500">₹{item.price.toFixed(2)}</p>
            </div>

            <div className="mt-4 flex items-center gap-3">
              <button
                onClick={() => {
                  addToCart({ ...item, quantity: 1 });
                  removeFromWishlist(item.id);
                  toast.success("Moved to cart");
                }}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-slate-900 px-3 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                <ShoppingCart size={16} />
                Add to cart
              </button>
              <button
                onClick={() => removeFromWishlist(item.id)}
                className="rounded-xl border border-slate-200 p-2 text-slate-500 hover:border-red-200 hover:bg-red-50 hover:text-red-500"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
