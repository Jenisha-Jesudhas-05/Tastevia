import { Suspense, lazy } from "react"
import { Routes, Route } from "react-router-dom"
import ScrollToTop from "@/components/ScrollToTop"
import ProtectedRoutes from "./ProtectedRoutes"

const Home = lazy(() => import("@/pages/Home"))
const Orders = lazy(() => import("@/pages/Orders"))
const AuthLayout = lazy(() => import("@/components/layout/AuthLayout"))
const SignupPage = lazy(() => import("@/features/auth/pages/Signup"))
const LoginPage = lazy(() => import("@/features/auth/pages/Login"))
const MainLayout = lazy(() => import("@/components/layout/MainLayout"))
const ProductPages = lazy(() => import("@/features/products/pages/ProductPages"))
const ProductDetailPage = lazy(() => import("@/features/products/pages/ProductDetailPage"))
const Cart = lazy(() => import("@/features/cart/cart"))
const CheckoutPage = lazy(() => import("@/features/orders/pages/CheckoutPage"))
const PaymentPage = lazy(() => import("@/features/orders/pages/PaymentPage"))
const OrderDetailsPage = lazy(() => import("@/features/orders/pages/OrderDetailsPage"))
const WishlistPage = lazy(() => import("@/features/wishlist/pages/WishlistPage"))

export default function AppRoutes() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-background text-foreground">
          <span className="animate-pulse rounded-lg bg-muted px-4 py-2 text-sm font-semibold">
            Loading...
          </span>
        </div>
      }
    >
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
    </Suspense>
  )
}
