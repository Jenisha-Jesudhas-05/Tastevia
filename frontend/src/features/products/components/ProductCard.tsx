import React, { memo, useState } from "react";
import { Heart, ShoppingCart, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../cart/CartContext";
import toast from "react-hot-toast";
import { useWishlist } from "@/features/wishlist/WishlistContext";
import { useAuth } from "@/features/auth/hooks/useAuth";

const FALLBACK_IMG =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0%25' x2='100%25' y1='0%25' y2='100%25'%3E%3Cstop offset='0%25' stop-color='%23ffe9d6'/%3E%3Cstop offset='100%25' stop-color='%23ffe5ef'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect fill='url(%23g)' width='800' height='600' rx='24'/%3E%3Cpath fill='%23f97316' d='M360 260c0-30 25-55 56-55 31 0 56 25 56 55s-25 55-56 55c-31 0-56-25-56-55Z'/%3E%3C/svg%3E";

interface ProductCardProps {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrls: string[];
  rating?: number;
  category: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  description,
  price,
  imageUrls,
  rating = 4.5,
  category,
}) => {
  const [loading, setLoading] = useState(true);
  const [src, setSrc] = useState(() => (imageUrls && imageUrls[0]) || FALLBACK_IMG);
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const { isAuthenticated } = useAuth();
  const [index, setIndex] = useState(0);

  const navigate = useNavigate();
  const { cart, addToCart, increaseQty } = useCart();

  const images = imageUrls && imageUrls.length ? imageUrls : [FALLBACK_IMG];

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!images.length) return;
    setLoading(true);
    setIndex((prev) => {
      const next = (prev + 1) % images.length;
      setSrc(images[next] || FALLBACK_IMG);
      return next;
    });
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!images.length) return;
    setLoading(true);
    setIndex((prev) => {
      const next = (prev - 1 + images.length) % images.length;
      setSrc(images[next] || FALLBACK_IMG);
      return next;
    });
  };

  const liked = wishlist.some((item) => item.id === id);

  const handleNavigate = () => {
    if (!id) return;
    navigate(`/menu/${id}`);
  };

  const imageSrc = images[index] || FALLBACK_IMG;

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (!isAuthenticated) {
      toast.error("Please log in to save items");
      navigate("/login");
      return;
    }

    if (liked) {
      removeFromWishlist(id);
      toast("Removed from wishlist");
    } else {
      addToWishlist({
        id,
        name,
        price,
        image: imageSrc,
        quantity: 1,
      });
      toast.success("Saved to wishlist");
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    const exists = cart.find((item) => item.id === id);

    if (exists) {
      increaseQty(id); // If already in cart, increase quantity
      toast.success(`Increased quantity of ${name}`);
    } else {
      addToCart({
        id,
        name,
        price,
        image: src,
        quantity: 1,
      });
      toast.success(`${name} added to cart`);
    }
  };

  return (
    <div
      onClick={handleNavigate}
      className="group relative cursor-pointer overflow-hidden rounded-2xl border border-border/60 bg-card/90 shadow-sm backdrop-blur transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
    >
      {/* Image Section */}
      <div className="relative h-56 w-full overflow-hidden bg-gradient-to-br from-orange-50/60 via-white to-rose-50/70 dark:from-orange-500/10 dark:via-slate-900 dark:to-rose-500/5">
        {loading && (
          <div className="absolute flex h-full w-full items-center justify-center bg-muted/60">
            <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-b-4 border-orange-500" />
          </div>
        )}

        <img
          src={src}
          alt={name}
          loading={index === 0 ? "eager" : "lazy"}
          fetchPriority={index === 0 ? "high" : "low"}
          decoding="async"
          width={640}
          height={416}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 320px"
          className={`h-52 w-full object-cover transition-transform duration-500 group-hover:scale-110 ${
            loading ? "hidden" : "block"
          }`}
          onLoad={() => setLoading(false)}
          onError={() => {
            if (src !== FALLBACK_IMG) {
              setSrc(FALLBACK_IMG);
              setLoading(false);
            }
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-black/0 to-black/40 opacity-0 transition group-hover:opacity-100" />

        {/* Category Badge */}
        <span className="absolute left-3 top-3 rounded-full bg-orange-500/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-white shadow">
          {category}
        </span>

        {/* Like Button */}
        <button
          onClick={handleToggleWishlist}
          className="absolute right-3 bottom-3 rounded-full bg-card/90 p-2 text-foreground shadow-md transition hover:scale-105"
        >
          <Heart
            size={18}
            className={liked ? "text-red-500 fill-red-500" : "text-foreground/70"}
          />
        </button>

        {/* Image Controls */}
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-card/90 p-1 text-foreground shadow"
            >
              <ChevronLeft size={18} />
            </button>

            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-card/90 p-1 text-foreground shadow"
            >
              <ChevronRight size={18} />
            </button>
          </>
        )}
      </div>

      {/* Content */}
      <div className="space-y-3 p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 rounded-full bg-secondary/70 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-orange-700 dark:text-orange-200">
              Chef's pick
            </div>
            <h3 className="text-lg font-semibold leading-tight text-foreground">{name}</h3>
          </div>
        </div>

        <div className="flex items-center gap-3 text-sm text-foreground/80">
          <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2 py-1 text-xs font-semibold text-amber-700 dark:bg-amber-500/15 dark:text-amber-200">
            <Star size={14} fill="currentColor" className="text-amber-500" />
            {rating}
          </span>
          <span className="text-foreground/60">{"\u2022"}</span>
          <span className="text-foreground/70">Freshly prepped daily</span>
        </div>

        <p className="line-clamp-2 text-sm text-foreground/70">{description}</p>

        <div className="flex items-center justify-between pt-1">
          <div className="flex items-baseline gap-1">
            <p className="text-lg font-bold text-foreground">${price.toFixed(2)}</p>
            <span className="text-xs text-foreground/60">per plate</span>
          </div>

          <button
            onClick={handleAddToCart}
            className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-orange-500 to-rose-500 px-3.5 py-2 text-sm font-semibold text-white shadow-sm transition hover:shadow-md"
          >
            <ShoppingCart size={16} />
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default memo(ProductCard);
