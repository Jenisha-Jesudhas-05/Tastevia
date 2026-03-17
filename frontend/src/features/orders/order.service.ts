import { api } from "@/lib/axios";
import axios from "axios";
import type {
  CreateOrderPayload,
  Order,
  StripeIntentResponse,
} from "./types/order.types";

const getApiErrorMessage = (error: unknown, fallbackMessage: string) => {
  if (axios.isAxiosError(error)) {
    return typeof error.response?.data?.error === "string"
      ? error.response.data.error
      : error.message;
  }

  return fallbackMessage;
};

// Sample fetch equivalent:
// await fetch(`${import.meta.env.VITE_API_BASE_URL}/orders`, {
//   method: "POST",
//   headers: { "Content-Type": "application/json" },
//   body: JSON.stringify(payload),
// });
export const createOrderAPI = async (payload: CreateOrderPayload) => {
  try {
    const response = await api.post<Order>("/orders", payload);
    return response.data;
  } catch (error) {
    throw new Error(getApiErrorMessage(error, "Failed to place order"));
  }
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

export const createStripePaymentIntentAPI = async (amount: number) => {
  try {
    const response = await api.post<StripeIntentResponse>(
      "/orders/stripe/create-intent",
      { amount, currency: "USD" }
    );
    return response.data;
  } catch (error) {
    throw new Error(
      getApiErrorMessage(error, "Failed to start Stripe payment")
    );
  }
};
