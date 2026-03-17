import { useCart } from "../../features/cart/CartContext";
import { Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

export default function Cart() {
  const { cart, increaseQty, decreaseQty, removeFromCart } = useCart();

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  /* EMPTY CART */
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
          className="rounded-full bg-gradient-to-r from-orange-500 to-rose-500 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:shadow-xl"
        >
          Browse Menu
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-background pb-16 pt-10">
      <div className="mx-auto flex max-w-5xl flex-col gap-8 px-4">

        {/* PAGE TITLE */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="pill text-orange-600 dark:text-orange-200">Cart</p>
            <h1 className="mt-2 text-3xl font-bold text-foreground">Your Cart</h1>
            <p className="text-sm text-foreground/70">
              Review items, adjust quantities, and slide into checkout faster.
            </p>
          </div>
          <Link
            to="/menu"
            className="hidden rounded-full border border-border/70 px-4 py-2 text-sm font-semibold text-foreground transition hover:border-orange-300 hover:text-orange-600 sm:inline-flex"
          >
            + Add more
          </Link>
        </div>

        {/* CART ITEMS */}
        <div className="space-y-4">

          {cart.map((item) => (
            <div
              key={item.id}
              className="surface-card flex flex-col gap-4 p-4 sm:flex-row sm:items-center"
            >

              {/* IMAGE */}
              <img
                src={item.image}
                alt={item.name}
                className="h-24 w-24 rounded-xl object-cover"
              />

              {/* PRODUCT INFO */}
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-foreground">{item.name}</h3>

                <p className="text-orange-500 font-bold mt-1">
                  ₹{item.price.toFixed(2)}
                </p>

                <p className="text-sm text-foreground/60 mt-1">
                  Subtotal: ₹{(item.price * item.quantity).toFixed(2)}
                </p>
              </div>

              {/* QUANTITY CONTROLS */}
              <div className="flex items-center gap-3">

                <button
                  onClick={() => decreaseQty(item.id)}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-border/70 bg-secondary/70 text-foreground transition hover:border-orange-300 hover:text-orange-600"
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

              {/* REMOVE */}
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 transition hover:text-red-600"
              >
                <Trash2 size={20} />
              </button>

            </div>
          ))}

        </div>

        {/* TOTAL SECTION */}
        <div className="surface-card flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">

          <div>
            <p className="text-sm text-foreground/70">Total Amount</p>
            <p className="text-2xl font-bold text-foreground">
              ₹{total.toFixed(2)}
            </p>
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
