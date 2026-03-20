import React, { useCallback, useEffect, useRef, useState } from "react";
import ProductCard from "../components/ProductCard";
import { Search, RefreshCw } from "lucide-react";
import FloatingCartBar from "../../cart/FloatingCart";
import { Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { api } from "@/lib/axios";
import logo from "@/assets/logo.svg";

const BATCH_SIZE = 8;

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrls: string[];
  category: string;
};

const ProductPages: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const productsRef = useRef<Product[]>([]);
  const hasMoreRef = useRef(true);
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [categories, setCategories] = useState<string[]>(["all"]);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const loadingRef = useRef(false);

  useEffect(() => {
    const handler = setTimeout(() => setSearch(searchInput), 300);
    return () => clearTimeout(handler);
  }, [searchInput]);

  const fetchCategories = useCallback(async () => {
    try {
      const res = await api.get("/products/meta/categories");
      const data = Array.isArray(res.data?.data) ? res.data.data : [];
      const normalized = data.map((c: any) => String(c));
      setCategories(["all", ...normalized]);
    } catch {
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const loadProducts = useCallback(
    async (reset = false) => {
      if (loadingRef.current) return;
      if (!hasMoreRef.current && !reset) return;
      loadingRef.current = true;
      setLoading(true);
      setError(null);

      const skip = reset ? 0 : productsRef.current.length;

      try {
        const res = await api.get("/products", {
          params: {
            skip,
            take: BATCH_SIZE,
            search: search || undefined,
            category: category === "all" ? undefined : category,
          },
        });
        const payload = res.data?.data || {};
        const items: Product[] = payload.items || [];
        const total: number = payload.total ?? items.length;

        setProducts((prev) => {
          const next = reset ? items : [...prev, ...items];
          productsRef.current = next;
          return next;
        });
        const more = skip + items.length < total;
        hasMoreRef.current = more;
        setHasMore(more);
      } catch (err: any) {
        setError(err?.response?.data?.message || "Failed to load products");
      } finally {
        loadingRef.current = false;
        setLoading(false);
        setInitialLoading(false);
      }
    },
    [search, category]
  );

  
  useEffect(() => {
    setProducts([]);
    productsRef.current = [];
    setHasMore(true);
    hasMoreRef.current = true;
    setInitialLoading(true);
    loadProducts(true);
  }, [search, category, loadProducts]);

  // intersection observer for infinite scroll
  useEffect(() => {
    const node = sentinelRef.current;
    if (!node || !hasMoreRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && hasMoreRef.current && !loadingRef.current) {
            loadProducts();
          }
        });
      },
      { rootMargin: "240px 0px" }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [hasMore, loadProducts]);

  const SkeletonCard = () => (
    <div className="animate-pulse overflow-hidden rounded-2xl border border-border/60 bg-card/80 p-4 shadow-sm backdrop-blur">
      <div className="h-52 w-full rounded-xl bg-gradient-to-br from-orange-100/80 via-white to-rose-100/70 dark:from-orange-500/10 dark:via-slate-900 dark:to-rose-500/10" />
      <div className="mt-4 space-y-3">
        <div className="h-4 w-3/4 rounded-full bg-foreground/5" />
        <div className="h-3 w-1/2 rounded-full bg-foreground/5" />
        <div className="h-3 w-1/3 rounded-full bg-foreground/5" />
      </div>
    </div>
  );

  const showSkeletons = initialLoading && products.length === 0;

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-amber-50 via-white to-rose-50 pb-20 pt-10 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(251,146,60,0.12),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(244,114,182,0.12),transparent_40%)]" />
      <div className="relative mx-auto max-w-6xl px-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <nav className="flex items-center gap-2 text-sm font-semibold text-foreground/60">
              <Link to="/" className="hover:text-orange-600">Home</Link>
              <span className="text-foreground/40">/</span>
              <span className="text-foreground/80">Menu</span>
            </nav>
          </div>

          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-3 text-foreground/50" size={18} />
            <input
              type="text"
              placeholder="Search dishes..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full rounded-2xl border border-border/70 bg-card/80 pl-10 pr-4 py-2.5 text-sm text-foreground shadow-lg shadow-black/5 transition focus:border-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-200 dark:bg-card/60"
            />
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setCategory(cat);
                setSearchInput("");
                setSearch("");
              }}
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
            <Heart size={16} /> Wishlist
          </Link>
        </div>

        <div className="mt-8">
          {showSkeletons ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {Array.from({ length: 8 }).map((_, index) => (
                <SkeletonCard key={index} />
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="mt-10 space-y-3 text-center text-foreground/60">
              <p>No dishes found.</p>
              <button
                onClick={() => {
                  setSearchInput("");
                  setSearch("");
                  setCategory("all");
                  loadProducts(true);
                }}
                className="inline-flex items-center gap-2 rounded-full border border-border/60 px-4 py-2 text-sm font-semibold text-foreground hover:border-orange-300 hover:text-orange-500"
              >
                <RefreshCw size={14} /> Reset filters
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {products.map((product) => (
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
              <div
                ref={sentinelRef}
                className="mt-10 flex flex-col items-center gap-3 text-sm text-foreground/60"
              >
                {hasMore ? (
                  <button
                    onClick={() => loadProducts()}
                    disabled={loading}
                    className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-white/90 px-4 py-2 text-sm font-semibold text-foreground shadow-sm transition hover:border-orange-300 hover:text-orange-500 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-slate-800/90"
                  >
                    <span className="relative flex h-7 w-7 items-center justify-center rounded-full bg-orange-500/10">
                      <img src={logo} alt="Tastevia logo" className="h-4 w-4" />
                    </span>
                    {loading ? "Loading dishes…" : "Load more"}
                  </button>
                ) : (
                  <span className="rounded-full border border-border/60 px-4 py-2 text-foreground/70">
                    End of menu
                  </span>
                )}
              </div>
            </>
          )}
          {error && <p className="mt-4 text-center text-sm text-red-500">{error}</p>}
        </div>

        <FloatingCartBar />
      </div>
    </div>
  );
};

export default ProductPages;
