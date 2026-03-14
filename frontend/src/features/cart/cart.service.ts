import { api } from "@/lib/axios";

// Add item to cart
export const addToCartAPI = async (
  userId: number,
  productId: number,
  quantity: number
) => {
  const res = await api.post(`/cart/add`, {
    userId,
    productId,
    quantity,
  });
  return res.data;
};

// Get user's cart
export const getCartAPI = async (userId: number) => {
  const res = await api.get(`/cart/${userId}`);
  return res.data;
};

// Update quantity of a cart item
export const updateCartItemAPI = async (
  userId: number,
  productId: number,
  quantity: number
) => {
  const res = await api.patch(`/cart/update`, {
    userId,
    productId,
    quantity,
  });
  return res.data;
};

// Remove item from cart
export const removeCartItemAPI = async (userId: number, productId: number) => {
  const res = await api.delete(`/cart/remove`, {
    data: { userId, productId },
  });
  return res.data;
};
