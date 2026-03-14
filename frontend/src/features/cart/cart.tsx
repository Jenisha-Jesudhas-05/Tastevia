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
      <div className="flex flex-col items-center justify-center mt-24 text-center">
        <h2 className="text-2xl font-semibold text-gray-700 mb-3">
          Your cart is empty
        </h2>

        <p className="text-gray-500 mb-6">
          Looks like you haven’t added anything yet.
        </p>

        <Link
          to="/menu"
          className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition"
        >
          Browse Menu
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10 max-w-5xl">

      {/* PAGE TITLE */}
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>

      {/* CART ITEMS */}
      <div className="space-y-5">

        {cart.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-5 bg-white shadow-md rounded-xl p-4 hover:shadow-lg transition"
          >

            {/* IMAGE */}
            <img
              src={item.image}
              alt={item.name}
              className="w-24 h-24 object-cover rounded-lg"
            />

            {/* PRODUCT INFO */}
            <div className="flex-1">
              <h3 className="font-semibold text-lg">{item.name}</h3>

              <p className="text-orange-500 font-bold mt-1">
                ${item.price}
              </p>

              <p className="text-sm text-gray-500 mt-1">
                Subtotal: ${(item.price * item.quantity).toFixed(2)}
              </p>
            </div>

            {/* QUANTITY CONTROLS */}
            <div className="flex items-center gap-3">

              <button
                onClick={() => decreaseQty(item.id)}
                className="bg-gray-200 hover:bg-gray-300 w-8 h-8 rounded flex items-center justify-center"
              >
                -
              </button>

              <span className="font-medium">{item.quantity}</span>

              <button
                onClick={() => increaseQty(item.id)}
                className="bg-gray-200 hover:bg-gray-300 w-8 h-8 rounded flex items-center justify-center"
              >
                +
              </button>

            </div>

            {/* REMOVE */}
            <button
              onClick={() => removeFromCart(item.id)}
              className="text-red-500 hover:text-red-700"
            >
              <Trash2 size={20} />
            </button>

          </div>
        ))}

      </div>

      {/* TOTAL SECTION */}
      <div className="mt-10 bg-gray-50 p-6 rounded-xl shadow-md flex justify-between items-center">

        <div>
          <p className="text-lg text-gray-600">Total Amount</p>
          <p className="text-2xl font-bold text-gray-900">
            ${total.toFixed(2)}
          </p>
        </div>

        <Link
          to="/checkout"
          className="bg-orange-500 text-white px-8 py-3 rounded-lg hover:bg-orange-600 transition"
        >
          Checkout
        </Link>

      </div>

    </div>
  );
}
