import React, { useState } from "react";
import { Heart, ShoppingCart, Star, ChevronLeft, ChevronRight } from "lucide-react";

interface ProductCardProps {
  name: string;
  description: string;
  price: number;
  imageUrls: string[];
  rating?: number;
  category: string; // category comes from backend
}

const ProductCard: React.FC<ProductCardProps> = ({
  name,
  description,
  price,
  imageUrls,
  rating = 4.5,
  category
}) => {
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [index, setIndex] = useState(0);

  const nextImage = () => {
    setLoading(true);
    setIndex((prev) => (prev + 1) % imageUrls.length);
  };

  const prevImage = () => {
    setLoading(true);
    setIndex((prev) => (prev - 1 + imageUrls.length) % imageUrls.length);
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden group">

      {/* Image Section */}
      <div className="relative w-full h-52 overflow-hidden">

        {/* Loader */}
        {loading && (
          <div className="flex items-center justify-center absolute w-full h-full bg-gray-100">
            <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-b-4 border-orange-500"></div>
          </div>
        )}

        {/* Image */}
        <img
          src={imageUrls[index]}
          alt={name}
          className={`w-full h-52 object-cover transition-transform duration-300 group-hover:scale-110 ${
            loading ? "hidden" : "block"
          }`}
          onLoad={() => setLoading(false)}
        />

        {/* Category Badge */}
        <span className="absolute top-3 left-3 bg-orange-500 text-white text-xs px-2 py-1 rounded-md capitalize">
          {category}
        </span>

        {/* Like Button */}
        <button
          onClick={() => setLiked(!liked)}
          className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md"
        >
          <Heart
            size={18}
            className={liked ? "text-red-500 fill-red-500" : "text-gray-500"}
          />
        </button>

        {/* Image Controls */}
        {imageUrls.length > 1 && (
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

        {/* Title */}
        <h3 className="font-semibold text-lg">{name}</h3>

        {/* Rating */}
        <div className="flex items-center gap-1 text-yellow-500 mt-1">
          <Star size={16} fill="currentColor" />
          <span className="text-sm text-gray-700">{rating}</span>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm mt-2 line-clamp-2">{description}</p>

        {/* Bottom Section */}
        <div className="flex items-center justify-between mt-4">

          <p className="font-bold text-lg text-gray-900">
            ${price.toFixed(2)}
          </p>

          <button className="flex items-center gap-1 bg-orange-500 text-white px-3 py-1.5 rounded-lg hover:bg-orange-600 transition">
            <ShoppingCart size={16} />
            Add
          </button>

        </div>
      </div>
    </div>
  );
};

export default ProductCard;