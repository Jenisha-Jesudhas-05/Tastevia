import React, { useState } from "react";
import { Heart, ShoppingCart, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../cart/CartContext";
import toast from "react-hot-toast";

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
  const [liked, setLiked] = useState(false);
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
      className="bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden group cursor-pointer"
    >
      {/* Image Section */}
      <div className="relative w-full h-52 overflow-hidden">
        {loading && (
          <div className="flex items-center justify-center absolute w-full h-full bg-gray-100">
            <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-b-4 border-orange-500"></div>
          </div>
        )}

        <img
          src={imageSrc}
          alt={name}
          className={`w-full h-52 object-cover transition-transform duration-300 group-hover:scale-110 ${loading ? "hidden" : "block"}`}
          onLoad={() => setLoading(false)}
        />

        {/* Category Badge */}
        <span className="absolute top-3 left-3 bg-orange-500 text-white text-xs px-2 py-1 rounded-md capitalize">
          {category}
        </span>

        {/* Like Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setLiked(!liked);
          }}
          className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md"
        >
          <Heart size={18} className={liked ? "text-red-500 fill-red-500" : "text-gray-500"} />
        </button>

        {/* Image Controls */}
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white p-1 rounded-full shadow"
            >
              <ChevronLeft size={18} />
            </button>

            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white p-1 rounded-full shadow"
            >
              <ChevronRight size={18} />
            </button>
          </>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-lg">{name}</h3>

        <div className="flex items-center gap-1 text-yellow-500 mt-1">
          <Star size={16} fill="currentColor" />
          <span className="text-sm text-gray-700">{rating}</span>
        </div>

        <p className="text-gray-600 text-sm mt-2 line-clamp-2">{description}</p>

        <div className="flex items-center justify-between mt-4">
          <p className="font-bold text-lg text-gray-900">${price.toFixed(2)}</p>

          <button
            onClick={handleAddToCart}
            className="flex items-center gap-1 bg-orange-500 text-white px-3 py-1.5 rounded-lg hover:bg-orange-600 transition"
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
