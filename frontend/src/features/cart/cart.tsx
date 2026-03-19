import { useCart } from "../../features/cart/CartContext";
import { Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

export default function Cart() {
  const { cart, increaseQty, decreaseQty, removeFromCart } = useCart();

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (cart.length === 0) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 bg-background px-4 text-center">
        <h2 className="text-2xl font-semibold text-foreground">
          Your cart is empty
        </h2>

        <p className="max-w-md text-foreground/70">
          Looks like you haven't added anything yet. Explore the menu and add a few favorites.
        </p>

        <Link
          to="/menu"
          className="rounded-full bg-linear-to-r from-orange-500 to-rose-500 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:shadow-xl"
        >
          Browse Menu
        </Link>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-amber-50 via-white to-rose-50 pb-18 pt-10 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(251,146,60,0.12),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(244,114,182,0.12),transparent_40%)]" />
      <div className="relative mx-auto flex max-w-5xl flex-col gap-8 px-4">
        
        <div className="flex items-start justify-between gap-4">
          <div>
          
            <h1 className="mt-2 text-3xl font-bold text-foreground">Your Cart</h1>
            <p className="text-sm text-foreground/70">
              Review your plates, tweak portions, and head to checkout.
            </p>
          </div>
          <Link
            to="/menu"
            className="hidden rounded-full border border-border/70 px-4 py-2 text-sm font-semibold text-foreground transition hover:border-orange-300 hover:text-orange-600 sm:inline-flex"
          >
            + Add more
          </Link>
        </div>
        <div className="space-y-4">
          {cart.map((item) => (
            <div
              key={item.id}
              className="surface-card flex flex-col gap-4 rounded-2xl border border-border/60 bg-card/80 p-4 shadow-sm sm:flex-row sm:items-center"
            >
              <img
                src={item.image}
                alt={item.name}
                className="h-24 w-24 rounded-xl object-cover"
              />

              <div className="flex-1">
                <h3 className="text-lg font-semibold text-foreground">{item.name}</h3>
                <p className="mt-1 font-bold text-orange-500">${item.price.toFixed(2)}</p>
                <p className="mt-1 text-sm text-foreground/60">
                  Subtotal: ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>

           
              <div className="flex items-center gap-3">
                <button
                  onClick={() => decreaseQty(item.id)}
                  disabled={item.quantity <= 1}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-border/70 bg-secondary/70 text-foreground transition hover:border-orange-300 hover:text-orange-600 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-border/70 disabled:hover:text-foreground"
                  aria-label="Decrease quantity"
                >
                  -
                </button>

                <span className="text-base font-semibold text-foreground">{item.quantity}</span>

                <button
                  onClick={() => increaseQty(item.id)}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-border/70 bg-secondary/70 text-foreground transition hover:border-orange-300 hover:text-orange-600"
                >
                  +
                </button>
              </div>

       
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 transition hover:text-red-600"
                aria-label="Remove item"
              >
                <Trash2 size={20} />
              </button>
            </div>
          ))}
        </div>

    
        <div className="surface-card flex flex-col gap-4 rounded-2xl border border-border/60 bg-card/80 p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-foreground/70">Total Amount</p>
            <p className="text-2xl font-bold text-foreground">${total.toFixed(2)}</p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/menu"
              className="rounded-xl border border-border/70 px-4 py-2 text-sm font-semibold text-foreground transition hover:border-orange-300 hover:text-orange-600"
            >
              Continue shopping
            </Link>

            <Link
              to="/checkout"
              className="rounded-xl bg-gradient-to-r from-orange-500 to-rose-500 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:shadow-xl"
            >
              Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
