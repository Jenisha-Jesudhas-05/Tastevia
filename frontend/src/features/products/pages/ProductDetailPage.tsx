import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  Flame,
  Leaf,
  MapPin,
  Shield,
  ShoppingCart,
  Sparkles,
  Star,
  Truck,
  UtensilsCrossed,
} from "lucide-react";
import toast from "react-hot-toast";
import { useProducts } from "../hooks/useProducts";
import { useCart } from "../../cart/CartContext";

const moodChips = [
  { icon: <Leaf className="h-4 w-4" />, label: "Farm fresh" },
  { icon: <Flame className="h-4 w-4" />, label: "Made-to-order" },
  { icon: <Sparkles className="h-4 w-4" />, label: "Chef-curated" },
];

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, loading } = useProducts();
  const { addToCart } = useCart();

  const [imageIndex, setImageIndex] = useState(0);
  const [qty, setQty] = useState(1);

  if (loading) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="skeleton-card h-[420px]" />
          <div className="space-y-4">
            <div className="skeleton-bar w-2/3" />
            <div className="skeleton-bar w-1/3" />
            <div className="skeleton-bar w-full" />
            <div className="skeleton-bar w-5/6" />
            <div className="skeleton-bar w-1/2" />
            <div className="skeleton-bar w-40" />
          </div>
        </div>
      </div>
    );
  }

  const product = products.find((p: any) => String(p.id) === String(id));
  if (!product) {
    return <p className="mt-20 text-center text-foreground/70">Product not found</p>;
  }

  const images = product.imageUrls || [];
  const relatedProducts = products
    .filter((p: any) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const currentImage =
    images[imageIndex] ||
    "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=900&q=80";

  const nextImage = () => images.length && setImageIndex((prev) => (prev + 1) % images.length);
  const prevImage = () =>
    images.length && setImageIndex((prev) => (prev - 1 + images.length) % images.length);

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: currentImage,
      quantity: qty,
    });
    toast.success(`${product.name} added to cart`);
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-amber-50 via-white to-rose-50 pb-24 pt-8 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(251,146,60,0.12),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(244,114,182,0.12),transparent_40%)]" />

      <div className="relative mx-auto max-w-6xl px-4">
        <nav className="mb-4 flex flex-wrap items-center gap-2 text-sm font-semibold text-foreground/60">
          <Link to="/" className="hover:text-orange-600">
            Home
          </Link>
          <span className="text-foreground/40">/</span>
          <Link to="/menu" className="hover:text-orange-600">
            Menu
          </Link>
          <span className="text-foreground/40">/</span>
          <span className="text-foreground/80">{product.name}</span>
        </nav>

        <div className="mb-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.32em] text-orange-600 dark:text-orange-200">
          <UtensilsCrossed className="h-4 w-4" />
          Fast Delivery • Chef's Special
        </div>

        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="relative overflow-hidden rounded-[28px] border border-border/70 bg-card/80 shadow-2xl backdrop-blur">
            <img
              src={currentImage}
              alt={product.name}
              className="h-[480px] w-full object-cover transition duration-700"
            />
            {images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-3 text-white shadow-lg backdrop-blur hover:bg-black/70"
                  aria-label="Previous image"
                >
                  <ChevronLeft />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-3 text-white shadow-lg backdrop-blur hover:bg-black/70"
                  aria-label="Next image"
                >
                  <ChevronRight />
                </button>
              </>
            )}

            <div className="absolute inset-x-6 bottom-6 flex flex-wrap items-center gap-3 rounded-2xl bg-black/55 px-4 py-3 text-sm text-white backdrop-blur">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Delivery ETA 25-35 mins
              </div>
              <span className="h-1 w-1 rounded-full bg-white/60" />
              <div className="flex items-center gap-2">
                <Star size={16} fill="currentColor" className="text-yellow-400" />
                {product.rating || 4.5} / 5 • Crowd favorite
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="pill text-orange-600 dark:text-orange-200">Chef's pick</span>
                <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-700 dark:bg-orange-500/20 dark:text-orange-200">
                  {product.category}
                </span>
              </div>
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                {product.name}
              </h1>
              <p className="text-base leading-relaxed text-foreground/70">{product.description}</p>
            </div>

            <div className="flex flex-wrap items-center gap-3 text-sm font-semibold text-foreground/80">
              {moodChips.map((chip) => (
                <span
                  key={chip.label}
                  className="inline-flex items-center gap-2 rounded-full bg-secondary/70 px-3 py-2"
                >
                  {chip.icon}
                  {chip.label}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-between rounded-2xl border border-border/70 bg-card/80 p-4 shadow-sm">
              <div>
                <p className="text-sm text-foreground/60">Tonight's price</p>
                <p className="text-4xl font-bold text-foreground">${product.price}</p>
              </div>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-border/70 bg-secondary/70 text-lg font-bold transition hover:border-orange-300 hover:text-orange-600"
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span className="text-lg font-semibold text-foreground">{qty}</span>
                <button
                  onClick={() => setQty(qty + 1)}
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-border/70 bg-secondary/70 text-lg font-bold transition hover:border-orange-300 hover:text-orange-600"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {[
                { icon: <Truck className="h-4 w-4" />, label: "Priority delivery" },
                { icon: <Shield className="h-4 w-4" />, label: "Secure checkout" },
                { icon: <Clock className="h-4 w-4" />, label: "Made fresh on order" },
              ].map((feature) => (
                <div
                  key={feature.label}
                  className="surface-muted flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold text-foreground/80"
                >
                  {feature.icon}
                  {feature.label}
                </div>
              ))}
            </div>

            <button
              onClick={handleAddToCart}
              className="group inline-flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-orange-500 to-rose-500 px-7 py-4 text-base font-semibold text-white shadow-lg transition hover:shadow-2xl"
            >
              <ShoppingCart size={18} />
              Add to cart • ${(product.price * qty).toFixed(2)}
              <span className="opacity-70 transition group-hover:opacity-100">Place order</span>
            </button>
          </div>
        </div>

        {images.length > 1 && (
          <div className="mt-6 flex gap-3 overflow-x-auto pb-2">
            {images.map((img: string, i: number) => (
              <img
                key={i}
                src={img}
                onClick={() => setImageIndex(i)}
                className={`h-20 w-28 cursor-pointer rounded-xl object-cover transition ${
                  i === imageIndex ? "ring-2 ring-orange-500" : "border border-border/70"
                }`}
              />
            ))}
          </div>
        )}

        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <div className="flex items-center justify-between">
              <div>
                <p className="pill text-orange-600 dark:text-orange-200">You may also like</p>
                <h2 className="mt-2 text-2xl font-bold text-foreground">From the same kitchen</h2>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {relatedProducts.map((item: any) => (
                <div
                  key={item.id}
                  onClick={() => navigate(`/menu/${item.id}`)}
                  className="surface-card cursor-pointer overflow-hidden rounded-2xl border border-border/60 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <img
                    src={item.imageUrls[0]}
                    alt={item.name}
                    className="h-40 w-full object-cover"
                  />
                  <div className="space-y-1 p-4">
                    <h3 className="font-semibold text-foreground">{item.name}</h3>
                    <p className="truncate text-sm text-foreground/60">{item.description}</p>
                    <p className="font-bold text-orange-500">${item.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
