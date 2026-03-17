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

  const SkeletonCard = () => (
    <div className="skeleton-card">
      <div className="h-40 w-full rounded-xl bg-muted" />
      <div className="mt-4 space-y-2">
        <div className="skeleton-bar w-3/4" />
        <div className="skeleton-bar w-1/2" />
        <div className="skeleton-bar w-1/3" />
      </div>
    </div>
  );

  return (
    <div className="bg-background/90 pb-16 pt-10">
      <div className="mx-auto max-w-6xl px-4">

      {/* Heading */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-1">
            <p className="pill text-orange-600 dark:text-orange-200">Tastevia Picks</p>
            <h1 className="text-3xl font-bold text-foreground">Our Menu</h1>
            <p className="text-sm text-foreground/70">
              Search, filter, and save your favorites. Everything responds to light and dark mode.
            </p>
          </div>

          {/* Search */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-3 text-foreground/50" size={18}/>
            <input
              type="text"
              placeholder="Search food..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-border/70 bg-card/80 pl-10 pr-4 py-2.5 text-sm text-foreground shadow-inner transition focus:border-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-200 dark:bg-card/50"
            />
          </div>
        </div>

      {/* Category Filters */}
        <div className="mt-6 flex flex-wrap items-center gap-3">
          {categories.map((cat: any) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition duration-200 ${
                category === cat
                  ? "bg-gradient-to-r from-orange-500 to-rose-500 text-white shadow-lg shadow-orange-500/20"
                  : "border border-border/70 bg-secondary/70 text-foreground hover:border-orange-300 hover:text-orange-600 dark:bg-white/5"
              }`}
            >
              {cat.toUpperCase()}
            </button>
          ))}

          <Link
            to="/wishlist"
            className="ml-auto inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50/60 px-4 py-2 text-sm font-semibold text-orange-600 transition hover:bg-orange-100 dark:border-orange-500/30 dark:bg-orange-500/10 dark:text-orange-200"
          >
            <Heart size={16} /> View wishlist
          </Link>
        </div>

      {/* Products Grid */}
        <div className="mt-8">
          {loading ? (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <SkeletonCard key={index} />
              ))}
            </div>
          ) : filteredProducts.length === 0 ? (
            <p className="mt-10 text-center text-foreground/60">No products found.</p>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
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
        </div>

      {/* Floating Cart Bar */}
        <FloatingCartBar />

      </div>
    </div>
  );
};

export default ProductPages;
