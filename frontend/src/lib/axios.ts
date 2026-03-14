import axios from "axios";
import { API_BASE_URL } from "./env";
import { clearStoredToken, getStoredToken } from "@/features/auth/auth.storage";

export const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true
});

api.interceptors.request.use((config) => {
  const token = getStoredToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      clearStoredToken();
    }

    return Promise.reject(error);
  }
);
