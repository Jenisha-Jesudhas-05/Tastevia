import type { CartProductItem } from "../types/order.types";

interface OrderSummaryCardProps {
  items: CartProductItem[];
  totalAmount: number;
  title?: string;
}

export default function OrderSummaryCard({
  items,
  totalAmount,
  title = "Order summary",
}: OrderSummaryCardProps) {
  return (
    <aside className="surface-card p-6">
      <h2 className="text-xl font-semibold text-foreground">{title}</h2>

      <div className="mt-6 space-y-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-4 rounded-2xl border border-border/60 bg-secondary/70 p-3"
          >
            <img
              src={item.image}
              alt={item.name}
              className="h-16 w-16 rounded-xl object-cover"
            />

            <div className="min-w-0 flex-1">
              <p className="truncate font-medium text-foreground">{item.name}</p>
              <p className="text-sm text-foreground/70">Qty {item.quantity}</p>
            </div>

            <p className="text-sm font-semibold text-foreground">
              ₹{(item.price * item.quantity).toFixed(2)}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-6 border-t border-dashed border-border/70 pt-4">
        <div className="flex items-center justify-between text-sm text-foreground/70">
          <span>Subtotal</span>
          <span>₹{totalAmount.toFixed(2)}</span>
        </div>

        <div className="mt-3 flex items-center justify-between text-lg font-semibold text-foreground">
          <span>Total</span>
          <span>₹{totalAmount.toFixed(2)}</span>
        </div>
      </div>
    </aside>
  );
}
