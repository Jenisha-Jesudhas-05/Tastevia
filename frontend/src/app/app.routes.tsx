import { Routes, Route } from "react-router-dom"
import Home from "@/pages/Home"
import Orders from "@/pages/Orders"
import AuthLayout from "@/components/layout/AuthLayout"
import SignupPage from "@/features/auth/pages/Signup"
import LoginPage from "@/features/auth/pages/Login"
import MainLayout from "@/components/layout/MainLayout"
import ProtectedRoutes from "./ProtectedRoutes"
import ProductPages from "@/features/products/pages/ProductPages"
import ProductDetailPage from "@/features/products/pages/ProductDetailPage"
import Cart from "@/features/cart/cart"
import CheckoutPage from "@/features/orders/pages/CheckoutPage"
import PaymentPage from "@/features/orders/pages/PaymentPage"
import OrderDetailsPage from "@/features/orders/pages/OrderDetailsPage"
import WishlistPage from "@/features/wishlist/pages/WishlistPage"
import ScrollToTop from "@/components/ScrollToTop"

export default function AppRoutes() {
  return (
    <>
    <ScrollToTop />
    <Routes>

      {/* AUTH PAGES (NO NAVBAR) */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />} />

        <Route path="/signup" element={<SignupPage />} />
      </Route>

      {/* MAIN APP (WITH NAVBAR) */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<ProductPages />} />
             <Route path="/menu/:id" element={<ProductDetailPage />} />
        <Route path="/wishlist" element={<WishlistPage />} />
      </Route>

      {/* PROTECTED ROUTES */}
      <Route element={<ProtectedRoutes />}>
        <Route element={<MainLayout />}>
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/orders/:id" element={<OrderDetailsPage />} />
        </Route>
      </Route>

    </Routes>
    </>
  )
}
