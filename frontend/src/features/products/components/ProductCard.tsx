import React, { useState } from "react";
import { Heart, ShoppingCart, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../cart/CartContext";
import toast from "react-hot-toast";
import { useWishlist } from "@/features/wishlist/WishlistContext";

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
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const [index, setIndex] = useState(0);

  const navigate = useNavigate();
  const { cart, addToCart, increaseQty } = useCart();

  const images = imageUrls || [];

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!images.length) return;
    setLoading(true);
    setIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!images.length) return;
    setLoading(true);
    setIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const liked = wishlist.some((item) => item.id === id);

  const handleNavigate = () => {
    if (!id) return;
    navigate(`/menu/${id}`);
  };

  const imageSrc = images.length > 0
    ? images[index]
    : "https://images.unsplash.com/photo-1546069901-ba9599a7e63c";

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
        image: imageSrc,
        quantity: 1,
      });
      toast.success(`${name} added to cart`);
    }
  };

  return (
    <div
      onClick={handleNavigate}
      className="surface-card group cursor-pointer overflow-hidden transition duration-300 hover:-translate-y-1 hover:shadow-2xl"
    >
      {/* Image Section */}
      <div className="relative h-52 w-full overflow-hidden bg-gradient-to-br from-orange-50/60 via-white to-rose-50/70 dark:from-orange-500/10 dark:via-slate-900 dark:to-rose-500/5">
        {loading && (
          <div className="absolute flex h-full w-full items-center justify-center bg-muted/60">
            <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-b-4 border-orange-500" />
          </div>
        )}

        <img
          src={imageSrc}
          alt={name}
          className={`h-52 w-full object-cover transition-transform duration-500 group-hover:scale-110 ${
            loading ? "hidden" : "block"
          }`}
          onLoad={() => setLoading(false)}
        />

        {/* Category Badge */}
        <span className="absolute left-3 top-3 rounded-full bg-orange-500/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-white shadow">
          {category}
        </span>

        {/* Like Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
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
          }}
          className="absolute right-3 top-3 rounded-full bg-card/90 p-2 text-foreground shadow-md transition hover:scale-105"
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
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-lg font-semibold text-foreground">{name}</h3>
          <span className="rounded-full bg-orange-500/10 px-2 py-1 text-xs font-semibold text-orange-600 dark:bg-orange-500/15 dark:text-orange-200">
            {category}
          </span>
        </div>

        <div className="flex items-center gap-1 text-yellow-500">
          <Star size={16} fill="currentColor" />
          <span className="text-sm text-foreground/80">{rating}</span>
        </div>

        <p className="line-clamp-2 text-sm text-foreground/70">{description}</p>

        <div className="flex items-center justify-between">
          <p className="text-lg font-bold text-foreground">₹{price.toFixed(2)}</p>

          <button
            onClick={handleAddToCart}
            className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-orange-500 to-rose-500 px-3 py-1.5 text-sm font-semibold text-white shadow-sm transition hover:shadow-md"
          >
            <ShoppingCart size={16} />
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
