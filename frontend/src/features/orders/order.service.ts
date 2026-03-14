import { api } from "@/lib/axios";
import type {
  CreateOrderPayload,
  CreatePaymentIntentPayload,
  Order,
  PaymentIntentResponse,
} from "./types/order.types";

// Sample fetch equivalent:
// await fetch(`${import.meta.env.VITE_API_BASE_URL}/orders`, {
//   method: "POST",
//   headers: { "Content-Type": "application/json" },
//   body: JSON.stringify(payload),
// });
export const createOrderAPI = async (payload: CreateOrderPayload) => {
  const response = await api.post<Order>("/orders", payload);
  return response.data;
};

// Sample fetch equivalent:
// await fetch(`${import.meta.env.VITE_API_BASE_URL}/orders/${id}`);
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

export const createPaymentIntentAPI = async (
  payload: CreatePaymentIntentPayload
) => {
  const response = await api.post<PaymentIntentResponse>(
    "/orders/payment-intent",
    payload
  );
  return response.data;
};
