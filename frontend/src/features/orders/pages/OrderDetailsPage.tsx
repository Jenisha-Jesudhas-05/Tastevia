import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { CheckCircle2, Package, ReceiptText } from "lucide-react";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { getOrderDetailsAPI, getOrderHistoryAPI } from "../order.service";
import type { CartProductItem, Order } from "../types/order.types";
import OrderSummaryCard from "../components/OrderSummaryCard";
import logo from "@/assets/logo.svg";

const mapOrderItems = (order: Order): CartProductItem[] =>
  order.items.map((item) => ({
    id: String(item.productId),
    name: item.product.name,
    quantity: item.quantity,
    price: item.product.price,
    image: item.product.imageUrls?.[0] ?? "",
  }));

export default function OrderDetailsPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const [order, setOrder] = useState<Order | null>(null);
  const [orderHistory, setOrderHistory] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const orderId = Number(id);

    if (!orderId || !user) {
      setError("We couldn't find that order.");
      setLoading(false);
      return;
    }

    const loadOrderData = async () => {
      setLoading(true);
      setError("");

      try {
        const [orderDetails, history] = await Promise.all([
          getOrderDetailsAPI(orderId),
          getOrderHistoryAPI(),
        ]);

        setOrder(orderDetails);
        setOrderHistory(history);
      } catch (requestError) {
        console.error(requestError);
        setError("Unable to load order details right now.");
      } finally {
        setLoading(false);
      }
    };

    void loadOrderData();
  }, [id, user]);

  const summaryItems = useMemo(() => (order ? mapOrderItems(order) : []), [order]);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-gradient-to-b from-amber-50 via-white to-rose-50 text-foreground dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
        <div className="relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-3xl bg-gradient-to-br from-orange-500 to-rose-500 shadow-lg ring-1 ring-white/20">
          <img src={logo} alt="Tastevia logo" className="h-8 w-8 drop-shadow-sm" />
          <div className="absolute inset-0 bg-white/10 animate-pulse" />
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center">
        <p className="text-lg font-medium text-red-600">{error || "Order not found"}</p>
        <Link
          to="/orders"
          className="mt-6 inline-flex rounded-2xl bg-gradient-to-r from-orange-500 to-rose-500 px-5 py-3 font-semibold text-white transition hover:shadow-lg"
        >
          View all orders
        </Link>
      </div>
    );
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-amber-50 via-white to-rose-50 px-4 py-10 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(251,146,60,0.12),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(244,114,182,0.12),transparent_40%)]" />
      <div className="relative mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6">
          <nav className="flex items-center gap-2 text-sm font-semibold text-foreground/60">
            <Link to="/" className="hover:text-orange-600">Home</Link>
            <span className="text-foreground/40">/</span>
            <Link to="/orders" className="hover:text-orange-600">Orders</Link>
            <span className="text-foreground/40">/</span>
            <span className="text-foreground/80">#{order.orderNumber}</span>
          </nav>
          <div className="rounded-[2rem] border border-emerald-100/60 bg-card/85 p-8 shadow-xl backdrop-blur">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-emerald-600">
                  <CheckCircle2 size={18} />
                  <span className="text-sm font-semibold uppercase tracking-[0.22em]">
                    Order confirmed
                  </span>
          </div>
          <h1 className="mt-4 text-4xl font-semibold text-foreground">
            Order #{order.orderNumber}
          </h1>
          <p className="mt-2 text-sm text-foreground/70">
            Placed on {new Date(order.createdAt).toLocaleString()}
          </p>
              </div>

              <div className="rounded-2xl bg-emerald-50 px-4 py-3 text-right">
                <p className="text-xs uppercase tracking-[0.2em] text-emerald-600">
                  Payment status
                </p>
                <p className="mt-1 font-semibold capitalize text-emerald-700">
                  {order.paymentStatus}
                </p>
              </div>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <div className="rounded-3xl border border-border/70 bg-secondary/70 p-5">
                <div className="flex items-center gap-2 text-orange-600">
                  <ReceiptText size={18} />
                  <h2 className="font-semibold">Shipping info</h2>
                </div>
                <div className="mt-4 space-y-1 text-sm text-foreground/70">
                  <p className="font-medium text-foreground">{order.customerName}</p>
                  <p>{order.customerEmail}</p>
                  <p>{order.phone}</p>
                  <p>{order.shippingAddress}</p>
                </div>
              </div>

              <div className="rounded-3xl border border-border/70 bg-secondary/70 p-5">
                <div className="flex items-center gap-2 text-foreground/80">
                  <Package size={18} />
                  <h2 className="font-semibold">Payment details</h2>
                </div>
                <div className="mt-4 space-y-1 text-sm text-foreground/70">
                  <p>
                    Status: <span className="font-medium capitalize text-foreground">{order.status}</span>
                  </p>
                  <p>
                    Method:{" "}
                    <span className="font-medium capitalize">
                      {(order.paymentMethod ?? "unknown").replaceAll("_", " ")}
                    </span>
                  </p>
                  <p>
                    Reference:{" "}
                    <span className="font-medium">{order.paymentReference ?? "N/A"}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="surface-card rounded-[2rem] p-8">
            <h2 className="text-2xl font-semibold text-foreground">Order history</h2>
            <div className="mt-6 space-y-3">
              {orderHistory.map((historyOrder) => (
                <Link
                  key={historyOrder.id}
                  to={`/orders/${historyOrder.id}`}
                  className={`flex items-center justify-between rounded-2xl border px-4 py-4 transition ${
                    historyOrder.id === order.id
                      ? "border-orange-300 bg-orange-50 dark:bg-orange-500/10"
                      : "border-border/70 bg-card/70 hover:border-orange-200 hover:bg-orange-50/40 dark:hover:bg-white/5"
                  }`}
                >
                <div>
                  <p className="font-semibold text-foreground">Order #{historyOrder.orderNumber}</p>
                  <p className="text-sm text-foreground/70">
                    {new Date(historyOrder.createdAt).toLocaleDateString()}
                  </p>
                </div>

                  <div className="text-right">
                    <p className="font-semibold text-foreground">
                      ${historyOrder.totalAmount.toFixed(2)}
                    </p>
                    <p className="text-sm capitalize text-foreground/70">
                      {historyOrder.paymentStatus}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <OrderSummaryCard items={summaryItems} totalAmount={order.totalAmount} />
      </div>
    </section>
  );
}
