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
      <div className="mx-auto max-w-4xl px-4 py-20 text-center">
        <p className="pill inline-block text-orange-600 dark:text-orange-200">Wishlist</p>
        <h1 className="mt-3 text-3xl font-bold text-foreground">Nothing saved yet</h1>
        <p className="mt-2 text-base text-foreground/70">
          Tap the heart on any dish to keep it here for later.
        </p>
        <Link
          to="/menu"
          className="mt-6 inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-orange-500 to-rose-500 px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:shadow-xl"
        >
          Browse the menu
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <nav className="flex items-center gap-2 text-sm font-semibold text-foreground/60">
            <Link to="/" className="hover:text-orange-600">Home</Link>
            <span className="text-foreground/40">/</span>
            <span className="text-foreground/80">Wishlist</span>
          </nav>
          
        </div>
        <Link
          to="/menu"
          className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-secondary/70 px-4 py-2 text-sm font-semibold text-foreground transition hover:border-orange-300 hover:text-orange-500"
        >
          Continue browsing
        </Link>
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {wishlist.map((item) => (
          <div
            key={item.id}
            className="group overflow-hidden rounded-2xl border border-border/60 bg-card/90 shadow-sm backdrop-blur transition hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="relative h-44 w-full overflow-hidden bg-gradient-to-br from-orange-50/60 via-white to-rose-50/70 dark:from-orange-500/10 dark:via-slate-900 dark:to-rose-500/5">
              <img
                src={item.image}
                alt={item.name}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/35 opacity-0 transition group-hover:opacity-100" />
              <span className="absolute left-3 top-3 rounded-full bg-orange-500/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-white shadow">
                Saved dish
              </span>
              <button
                onClick={() => removeFromWishlist(item.id)}
                className="absolute right-3 top-3 rounded-full bg-card/90 p-2 text-foreground shadow-md transition hover:scale-105"
                aria-label="Remove from wishlist"
              >
                <Trash2 size={16} />
              </button>
            </div>

            <div className="space-y-2 p-4">
              <h2 className="text-lg font-semibold text-foreground">{item.name}</h2>
              <p className="text-sm text-foreground/60">Ready when you are</p>
              <div className="flex items-center justify-between pt-1">
                <p className="text-lg font-bold text-foreground">${item.price.toFixed(2)}</p>
                <button
                  onClick={() => {
                    addToCart({ ...item, quantity: 1 });
                    removeFromWishlist(item.id);
                    toast.success("Moved to cart");
                  }}
                  className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-orange-500 to-rose-500 px-3.5 py-2 text-sm font-semibold text-white shadow-sm transition hover:shadow-md"
                >
                  <ShoppingCart size={16} />
                  Move to cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
