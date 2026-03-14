import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { LoaderCircle, ShoppingBag } from "lucide-react";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { getOrderHistoryAPI } from "@/features/orders/order.service";
import type { Order } from "@/features/orders/types/order.types";

const Orders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const loadOrders = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await getOrderHistoryAPI(user.id);
        setOrders(response);
      } catch (requestError) {
        console.error(requestError);
        setError("Unable to load your order history right now.");
      } finally {
        setLoading(false);
      }
    };

    void loadOrders();
  }, [user]);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <LoaderCircle className="h-10 w-10 animate-spin text-orange-500" />
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-[linear-gradient(180deg,#fffaf5_0%,#ffffff_55%,#fff7ed_100%)] px-4 py-10">
      <div className="mx-auto max-w-5xl">
        <div className="rounded-[2rem] border border-orange-100 bg-white p-8 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-orange-500">
            Orders
          </p>
          <h1 className="mt-3 text-4xl font-semibold text-gray-900">
            Your order history
          </h1>

          {error ? <p className="mt-4 text-sm text-red-600">{error}</p> : null}

          {!orders.length ? (
            <div className="mt-10 rounded-[2rem] border border-dashed border-orange-200 bg-orange-50/70 p-10 text-center">
              <ShoppingBag className="mx-auto h-10 w-10 text-orange-500" />
              <h2 className="mt-4 text-xl font-semibold text-gray-900">
                No orders yet
              </h2>
              <p className="mt-2 text-sm text-gray-500">
                When you complete checkout, your order history will appear here.
              </p>
              <Link
                to="/menu"
                className="mt-6 inline-flex rounded-2xl bg-orange-500 px-5 py-3 font-semibold text-white transition hover:bg-orange-600"
              >
                Browse menu
              </Link>
            </div>
          ) : (
            <div className="mt-8 space-y-4">
              {orders.map((order) => (
                <Link
                  key={order.id}
                  to={`/orders/${order.id}`}
                  className="flex flex-col gap-4 rounded-[1.75rem] border border-gray-100 p-5 transition hover:border-orange-200 hover:bg-orange-50/40 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <p className="text-lg font-semibold text-gray-900">
                      Order #{order.id}
                    </p>
                    <p className="mt-1 text-sm text-gray-500">
                      {new Date(order.createdAt).toLocaleString()}
                    </p>
                  </div>

                  <div className="flex flex-col gap-1 text-sm text-gray-500 sm:items-end">
                    <p className="font-semibold text-gray-900">
                      ${order.totalAmount.toFixed(2)}
                    </p>
                    <p className="capitalize">Status: {order.status}</p>
                    <p className="capitalize">Payment: {order.paymentStatus}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Orders;
