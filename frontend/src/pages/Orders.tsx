import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CalendarClock, ShoppingBag, Wallet } from "lucide-react";
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
      <section className="relative overflow-hidden bg-gradient-to-b from-amber-50 via-white to-rose-50 px-4 py-12 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(251,146,60,0.12),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(244,114,182,0.12),transparent_40%)]" />
        <div className="relative mx-auto max-w-6xl px-1 sm:px-0 space-y-6">
          <div className="rounded-[2rem] border border-border/60 bg-card/90 p-8 shadow-xl backdrop-blur">
            <div className="h-5 w-40 rounded-full bg-foreground/5" />
            <div className="mt-4 h-8 w-56 rounded-full bg-foreground/5" />
            <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="animate-pulse overflow-hidden rounded-2xl border border-border/60 bg-card/80 shadow-sm backdrop-blur"
                >
                  <div className="h-32 w-full bg-gradient-to-br from-orange-100/60 via-white to-rose-100/70 dark:from-orange-500/10 dark:via-slate-900 dark:to-rose-500/10" />
                  <div className="space-y-3 p-4">
                    <div className="h-4 w-2/3 rounded-full bg-foreground/5" />
                    <div className="h-3 w-1/2 rounded-full bg-foreground/5" />
                    <div className="h-3 w-1/3 rounded-full bg-foreground/5" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-amber-50 via-white to-rose-50 px-4 py-12 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(251,146,60,0.12),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(244,114,182,0.12),transparent_40%)]" />
      <div className="relative mx-auto max-w-6xl px-1 sm:px-0">
        <div className="rounded-[2rem] border border-border/60 bg-card/90 p-8 shadow-xl backdrop-blur">
          <nav className="flex items-center gap-2 text-sm font-semibold text-foreground/60">
            <Link to="/" className="hover:text-orange-600">Home</Link>
            <span className="text-foreground/40">/</span>
            <span className="text-foreground/80">Orders</span>
          </nav>
          <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h1 className="text-4xl font-semibold text-foreground">Orders</h1>
              <p className="text-sm text-foreground/60">Track your past and current meals at a glance.</p>
            </div>
            <Link
              to="/menu"
              className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-secondary/70 px-4 py-2 text-sm font-semibold text-foreground transition hover:border-orange-300 hover:text-orange-500"
            >
              Continue browsing
            </Link>
          </div>

          {error ? <p className="mt-4 text-sm text-red-600">{error}</p> : null}

          {!orders.length ? (
            <div className="mt-10 rounded-[2rem] border border-dashed border-border/70 bg-secondary/70 p-10 text-center">
              <ShoppingBag className="mx-auto h-10 w-10 text-orange-500" />
              <h2 className="mt-4 text-xl font-semibold text-foreground">
                No orders yet
              </h2>
              <p className="mt-2 text-sm text-foreground/70">
                When you complete checkout, your order history will appear here.
              </p>
              <Link
                to="/menu"
                className="mt-6 inline-flex rounded-2xl bg-gradient-to-r from-orange-500 to-rose-500 px-5 py-3 font-semibold text-white transition hover:shadow-lg"
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
                  className="group flex flex-col gap-4 rounded-[1.5rem] border border-border/70 bg-card/85 p-5 shadow-sm transition hover:-translate-y-[2px] hover:border-orange-200 hover:shadow-lg dark:hover:bg-white/5 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="space-y-1">
                    <p className="text-lg font-semibold text-foreground">
                      Order #{order.orderNumber}
                    </p>
                    <p className="flex items-center gap-2 text-sm text-foreground/60">
                      <CalendarClock size={16} className="text-orange-500" />
                      {new Date(order.createdAt).toLocaleString()}
                    </p>
                  </div>

                  <div className="flex flex-col gap-1 text-sm text-foreground/70 sm:items-end">
                    <p className="flex items-center gap-2 font-semibold text-foreground">
                      <Wallet size={16} className="text-orange-500" />
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
