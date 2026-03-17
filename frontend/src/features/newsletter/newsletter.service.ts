import { api } from "@/lib/axios";

export const subscribeNewsletter = async (email: string) => {
  const response = await api.post<{ success: boolean; message: string }>(
    "/newsletter/subscribe",
    { email }
  );

  return response.data;
};
