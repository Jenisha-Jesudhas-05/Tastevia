import { api } from "@/lib/axios";

export const fetchProducts = async () => {
  try {
    const res = await api.get("/products");
    return Array.isArray(res.data) ? res.data : res.data.data || [];
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};
