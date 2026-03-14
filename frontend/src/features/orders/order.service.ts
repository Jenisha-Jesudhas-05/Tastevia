import { api } from "@/lib/axios";
import type { CreateOrderPayload, Order } from "./types/order.types";

// Sample fetch equivalent:
// await fetch("http://localhost:5000/api/v1/orders", {
//   method: "POST",
//   headers: { "Content-Type": "application/json" },
//   body: JSON.stringify(payload),
// });
export const createOrderAPI = async (payload: CreateOrderPayload) => {
  const response = await api.post<Order>("/orders", payload);
  return response.data;
};

// Sample fetch equivalent:
// await fetch(`http://localhost:5000/api/v1/orders/${id}`);
export const getOrderDetailsAPI = async (id: number) => {
  const response = await api.get<Order>(`/orders/${id}`);
  return response.data;
};

export const getOrderHistoryAPI = async (userId: number) => {
  const response = await api.get<Order[]>("/orders", {
    params: { userId },
  });
  return response.data;
};
