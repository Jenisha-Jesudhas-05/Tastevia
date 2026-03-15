import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import "./index.css";
import App from "./App";

import { AuthProvider } from "@/features/auth/context/authContext";
import { CartProvider } from "@/features/cart/CartContext";
import { STRIPE_PUBLISHABLE_KEY } from "@/lib/env";

const stripePromise = STRIPE_PUBLISHABLE_KEY
  ? loadStripe(STRIPE_PUBLISHABLE_KEY)
  : null;

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          {stripePromise ? (
            <Elements stripe={stripePromise}>
              <App />
            </Elements>
          ) : (
            <App />
          )}

          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                borderRadius: "10px",
                background: "#333",
                color: "#fff",
              },
            }}
          />

        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
