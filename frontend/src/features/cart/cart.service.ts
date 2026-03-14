import axios from "axios";

const API = "http://localhost:5000/api/v1";

// Add item to cart
export const addToCartAPI = async (
  userId: number,
  productId: number,
  quantity: number
) => {
  const res = await axios.post(`${API}/cart/add`, {
    userId,
    productId,
    quantity,
  });
  return res.data;
};

// Get user's cart
export const getCartAPI = async (userId: number) => {
  const res = await axios.get(`${API}/cart/${userId}`);
  return res.data;
};

// Update quantity of a cart item
export const updateCartItemAPI = async (
  userId: number,
  productId: number,
  quantity: number
) => {
  const res = await axios.patch(`${API}/cart/update`, {
    userId,
    productId,
    quantity,
  });
  return res.data;
};

// Remove item from cart
export const removeCartItemAPI = async (userId: number, productId: number) => {
  const res = await axios.delete(`${API}/cart/remove`, {
    data: { userId, productId },
  });
  return res.data;
};