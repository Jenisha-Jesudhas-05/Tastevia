import axios from "axios";

export const fetchProducts = async () => {
  try {
    const res = await axios.get("http://localhost:5000/api/v1/products");
    return res.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};