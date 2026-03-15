import React, { useState } from "react";
import { useProducts } from "../hooks/useProducts";
import ProductCard from "../components/ProductCard";
import { Search } from "lucide-react";
import FloatingCartBar from "../../cart/FloatingCart";
import { Heart } from "lucide-react";
import { Link } from "react-router-dom";

const ProductPages: React.FC = () => {
  const { products, loading } = useProducts();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  // Get unique categories
  const categories = ["all", ...new Set(products.map((p: any) => p.category))];

  // Filter products
  const filteredProducts = products.filter((product: any) => {
    const matchSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchCategory =
      category === "all" || product.category === category;

    return matchSearch && matchCategory;
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center mt-20">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">

      {/* Heading */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <div className="space-y-1">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-orange-500">
            Tastevia Picks
          </p>
          <h1 className="text-3xl font-bold text-gray-900">
            Our Menu
          </h1>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-3 text-gray-400" size={18}/>
          <input
            type="text"
            placeholder="Search food..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-400 outline-none"
          />
        </div>
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-3 mb-8">
        {categories.map((cat: any) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition duration-200
            ${
              category === cat
                ? "bg-orange-500 text-white shadow-md"
                : "bg-gray-100 hover:bg-orange-100"
            }`}
          >
            {cat.toUpperCase()}
          </button>
        ))}

        <Link
          to="/wishlist"
          className="ml-auto inline-flex items-center gap-2 rounded-full border border-orange-200 px-4 py-2 text-sm font-semibold text-orange-600 transition hover:bg-orange-50"
        >
          <Heart size={16} /> View wishlist
        </Link>
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <p className="text-center text-gray-500 mt-10">
          No products found.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product: any) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              description={product.description}
              price={product.price}
              imageUrls={product.imageUrls}
              category={product.category}
            />
          ))}
        </div>
      )}

      {/* Floating Cart Bar */}
      <FloatingCartBar />

    </div>
  );
};

export default ProductPages;
