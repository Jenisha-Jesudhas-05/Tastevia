import axios from "axios";
import { API_BASE_URL } from "./env";
import { clearStoredUser } from "@/features/auth/auth.storage";

export const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true
});

// With httpOnly cookies, no need to attach Authorization header here.

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      clearStoredUser();
    }

    return Promise.reject(error);
  }
);
