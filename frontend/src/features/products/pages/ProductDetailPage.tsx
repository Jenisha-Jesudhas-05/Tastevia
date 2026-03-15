import { useParams } from "react-router-dom";
import { useProducts } from "../hooks/useProducts";
import { useState } from "react";
import {
  Star,
  ShoppingCart,
  ChevronLeft,
  ChevronRight,
  Shield,
  Truck,
  Clock,
} from "lucide-react";
import { useCart } from "../../cart/CartContext";
import toast from "react-hot-toast";

export default function ProductDetailPage() {
  const { id } = useParams();
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
    return (
      <p className="mt-20 text-center text-foreground/70">
        Product not found
      </p>
    );
  }

  const images = product.imageUrls || [];

  const relatedProducts = products
    .filter((p: any) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const currentImage =
    images[imageIndex] ||
    "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=900&q=80";

  const nextImage = () => {
    if (!images.length) return;
    setImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    if (!images.length) return;
    setImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

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
    <div className="bg-background/95 pb-32 pt-10">
      <div className="mx-auto max-w-6xl px-4">

        {/* MAIN SECTION */}
        <div className="grid gap-12 md:grid-cols-2">

          {/* IMAGE GALLERY */}
          <div className="space-y-4">

            <div className="relative overflow-hidden rounded-2xl border border-border/70 bg-card/70 shadow-xl">
              <img
                src={currentImage}
                alt={product.name}
                className="h-[420px] w-full object-cover transition duration-500"
              />

              {images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-card/90 p-2 text-foreground shadow"
                    aria-label="Previous image"
                  >
                    <ChevronLeft />
                  </button>

                  <button
                    onClick={nextImage}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-card/90 p-2 text-foreground shadow"
                    aria-label="Next image"
                  >
                    <ChevronRight />
                  </button>
                </>
              )}
            </div>

            {/* THUMBNAILS */}
            <div className="mt-2 flex gap-3 overflow-x-auto pb-2">
              {images.map((img: string, i: number) => (
                <img
                  key={i}
                  src={img}
                  onClick={() => setImageIndex(i)}
                  className={`h-20 w-20 cursor-pointer rounded-lg object-cover transition ${
                    i === imageIndex
                      ? "ring-2 ring-orange-500"
                      : "border border-border/70"
                  }`}
                />
              ))}
            </div>

          </div>

          {/* PRODUCT DETAILS */}
          <div className="space-y-5">

            <div className="space-y-2">
              <p className="pill text-orange-600 dark:text-orange-200">Chef special</p>
              <h1 className="text-4xl font-bold text-foreground">
                {product.name}
              </h1>
            </div>

            {/* CATEGORY & RATING */}
            <div className="flex items-center gap-3 text-sm">
              <span className="rounded-full bg-orange-100 px-3 py-1 font-semibold text-orange-700 dark:bg-orange-500/20 dark:text-orange-200">
                {product.category}
              </span>
              <div className="flex items-center gap-1 text-yellow-500">
                <Star size={18} fill="currentColor" />
                <span className="text-foreground/80">
                  {product.rating || 4.5} • Popular choice
                </span>
              </div>
            </div>

            {/* PRICE */}
            <p className="text-4xl font-bold text-foreground">
              ₹{product.price}
            </p>

            {/* DESCRIPTION */}
            <p className="text-base leading-relaxed text-foreground/70">
              {product.description}
            </p>

            {/* QUANTITY */}
            <div className="flex items-center gap-4 pt-2">

              <button
                onClick={() => setQty(Math.max(1, qty - 1))}
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-border/70 bg-secondary/70 text-lg font-bold transition hover:border-orange-300 hover:text-orange-600"
                aria-label="Decrease quantity"
              >
                -
              </button>

              <span className="text-lg font-semibold text-foreground">
                {qty}
              </span>

              <button
                onClick={() => setQty(qty + 1)}
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-border/70 bg-secondary/70 text-lg font-bold transition hover:border-orange-300 hover:text-orange-600"
                aria-label="Increase quantity"
              >
                +
              </button>

            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {[
                { icon: <Truck className="h-4 w-4" />, label: "Fast delivery" },
                { icon: <Shield className="h-4 w-4" />, label: "Secure checkout" },
                { icon: <Clock className="h-4 w-4" />, label: "Freshly prepared" },
              ].map((feature) => (
                <div
                  key={feature.label}
                  className="surface-muted flex items-center gap-2 px-3 py-2 text-sm font-semibold text-foreground/80"
                >
                  {feature.icon}
                  {feature.label}
                </div>
              ))}
            </div>

            <button
              onClick={handleAddToCart}
              className="mt-3 inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-orange-500 to-rose-500 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:shadow-xl"
            >
              <ShoppingCart size={18} />
              Add to cart • ₹{(product.price * qty).toFixed(2)}
            </button>

          </div>
        </div>

        {/* RELATED PRODUCTS */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">

            <div className="flex items-center justify-between">
              <div>
                <p className="pill text-orange-600 dark:text-orange-200">You may also like</p>
                <h2 className="mt-2 text-2xl font-bold text-foreground">
                  Related Meals
                </h2>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">

              {relatedProducts.map((item: any) => (
                <div
                  key={item.id}
                  className="surface-card transition hover:-translate-y-1 hover:shadow-lg"
                >

                  <img
                    src={item.imageUrls[0]}
                    alt={item.name}
                    className="h-40 w-full rounded-lg object-cover"
                  />

                  <h3 className="mt-2 font-semibold text-foreground">
                    {item.name}
                  </h3>

                  <p className="font-bold text-orange-500">
                    ₹{item.price}
                  </p>

                </div>
              ))}

            </div>
          </div>
        )}

        {/* STICKY ADD TO CART */}
        <div className="fixed bottom-0 left-0 right-0 border-t border-border/70 bg-background/95 p-4 shadow-lg backdrop-blur">

          <div className="mx-auto flex max-w-6xl items-center justify-between">

            <div>
              <p className="text-sm text-foreground/70">
                {qty} item(s)
              </p>

              <p className="text-lg font-bold text-foreground">
                ₹{(product.price * qty).toFixed(2)}
              </p>
            </div>

            <button
              onClick={handleAddToCart}
              className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-orange-500 to-rose-500 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:shadow-xl"
            >
              <ShoppingCart size={18} />
              Add to Cart
            </button>

          </div>

        </div>
      </div>
    </div>
  );
}
