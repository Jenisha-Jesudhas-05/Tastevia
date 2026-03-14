const browserHost =
  typeof window !== "undefined" ? window.location.hostname : "";

const defaultApiBaseUrl =
  browserHost === "localhost" || browserHost === "127.0.0.1"
    ? "http://localhost:5000/api/v1"
    : "https://tastevia.onrender.com/api/v1";

const defaultAppUrl =
  browserHost === "localhost" || browserHost === "127.0.0.1"
    ? "http://localhost:5173"
    : "https://tastevia-dining-app.vercel.app";

export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? defaultApiBaseUrl;

export const APP_URL = import.meta.env.VITE_APP_URL ?? defaultAppUrl;
