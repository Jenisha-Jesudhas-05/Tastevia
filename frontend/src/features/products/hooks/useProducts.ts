import { useState, useEffect } from "react";
import { api } from "@/lib/axios";

export const useProducts = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    let isMounted = true;

    const getProducts = async () => {
      try {
        const res = await api.get("/products", { signal: controller.signal });
        if (!isMounted) return;
        const payload = res.data?.data ?? res.data ?? [];
        const items = Array.isArray(payload)
          ? payload
          : Array.isArray(payload.items)
            ? payload.items
            : [];
        setProducts(items);
      } catch (err) {
        if (!isMounted || controller.signal.aborted) return;
        console.error(err);
        setProducts([]);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    getProducts();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return { products, loading };
};
