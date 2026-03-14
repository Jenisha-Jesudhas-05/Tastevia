import { useParams } from "react-router-dom";
import { useProducts } from "../hooks/useProducts";
import { useState } from "react";
import { Star, ShoppingCart, ChevronLeft, ChevronRight } from "lucide-react";
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
      <div className="flex justify-center items-center mt-20">
        <div className="animate-spin h-10 w-10 border-b-2 border-orange-500 rounded-full"></div>
      </div>
    );
  }

  const product = products.find((p: any) => String(p.id) === String(id));

  if (!product) {
    return (
      <p className="text-center text-gray-500 mt-20">
        Product not found
      </p>
    );
  }

  const images = product.imageUrls || [];

  const relatedProducts = products
    .filter((p: any) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const nextImage = () =>
    setImageIndex((prev) => (prev + 1) % images.length);

  const prevImage = () =>
    setImageIndex((prev) => (prev - 1 + images.length) % images.length);

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: images[0],
      quantity: qty,
    });

    toast.success(`${product.name} added to cart`);
  };

  return (
    <div className="container mx-auto px-4 py-10 pb-32">

      {/* MAIN SECTION */}
      <div className="grid md:grid-cols-2 gap-12">

        {/* IMAGE GALLERY */}
        <div>

          <div className="relative">
            <img
              src={images[imageIndex]}
              alt={product.name}
              className="w-full h-[420px] object-cover rounded-xl shadow-lg"
            />

            {images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-3 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow"
                >
                  <ChevronLeft />
                </button>

                <button
                  onClick={nextImage}
                  className="absolute right-3 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow"
                >
                  <ChevronRight />
                </button>
              </>
            )}
          </div>

          {/* THUMBNAILS */}
          <div className="flex gap-3 mt-4">
            {images.map((img: string, i: number) => (
              <img
                key={i}
                src={img}
                onClick={() => setImageIndex(i)}
                className={`w-20 h-20 object-cover rounded-lg cursor-pointer border ${
                  i === imageIndex
                    ? "border-orange-500"
                    : "border-gray-200"
                }`}
              />
            ))}
          </div>

        </div>

        {/* PRODUCT DETAILS */}
        <div>

          <h1 className="text-3xl font-bold">
            {product.name}
          </h1>

          {/* CATEGORY BADGE */}
          <div className="mt-2">
            <span className="bg-orange-100 text-orange-600 px-3 py-1 text-sm rounded-full">
              {product.category}
            </span>
          </div>

          {/* RATING */}
          <div className="flex items-center gap-2 mt-4 text-yellow-500">
            <Star size={18} fill="currentColor" />
            <span className="text-gray-700">
              {product.rating || 4.5}
            </span>
          </div>

          {/* PRICE */}
          <p className="text-3xl font-bold text-orange-500 mt-4">
            ${product.price}
          </p>

          {/* DESCRIPTION */}
          <p className="text-gray-600 mt-6 leading-relaxed">
            {product.description}
          </p>

          {/* QUANTITY */}
          <div className="flex items-center gap-4 mt-8">

            <button
              onClick={() => setQty(Math.max(1, qty - 1))}
              className="bg-gray-200 px-4 py-2 rounded-lg"
            >
              -
            </button>

            <span className="text-lg font-semibold">
              {qty}
            </span>

            <button
              onClick={() => setQty(qty + 1)}
              className="bg-gray-200 px-4 py-2 rounded-lg"
            >
              +
            </button>

          </div>

        </div>
      </div>

      {/* RELATED PRODUCTS */}
      {relatedProducts.length > 0 && (
        <div className="mt-20">

          <h2 className="text-2xl font-bold mb-6">
            Related Meals
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

            {relatedProducts.map((item: any) => (
              <div
                key={item.id}
                className="bg-white rounded-xl shadow hover:shadow-lg transition p-3"
              >

                <img
                  src={item.imageUrls[0]}
                  alt={item.name}
                  className="w-full h-40 object-cover rounded-lg"
                />

                <h3 className="font-semibold mt-2">
                  {item.name}
                </h3>

                <p className="text-orange-500 font-bold">
                  ${item.price}
                </p>

              </div>
            ))}

          </div>
        </div>
      )}

      {/* STICKY ADD TO CART */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg p-4">

        <div className="container mx-auto flex items-center justify-between">

          <div>
            <p className="text-sm text-gray-500">
              {qty} item(s)
            </p>

            <p className="text-lg font-bold">
              ${(product.price * qty).toFixed(2)}
            </p>
          </div>

          <button
            onClick={handleAddToCart}
            className="flex items-center gap-2 bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition"
          >
            <ShoppingCart size={18} />
            Add to Cart
          </button>

        </div>

      </div>
    </div>
  );
}