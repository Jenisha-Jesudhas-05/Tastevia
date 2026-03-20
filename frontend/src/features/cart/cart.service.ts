import { api } from "@/lib/axios";
export const addToCartAPI = async (
  productId: number,
  quantity: number
) => {
  const res = await api.post(`/cart/add`, {
    productId,
    quantity,
  });
  return res.data;
};

export const getCartAPI = async () => {
  const res = await api.get(`/cart`);
  return res.data;
};

export const updateCartItemAPI = async (
  productId: number,
  quantity: number
) => {
  const res = await api.patch(`/cart/update`, {
    productId,
    quantity,
  });
  return res.data;
};

export const removeCartItemAPI = async (productId: number) => {
  const res = await api.delete(`/cart/remove`, {
    data: { productId },
  });
  return res.data;
};
