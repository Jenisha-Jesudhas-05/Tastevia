import { Suspense, lazy } from "react"
import { Routes, Route } from "react-router-dom"
import ScrollToTop from "@/components/ScrollToTop"
import ProtectedRoutes from "./ProtectedRoutes"
import logo from "@/assets/logo.svg"

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
        <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-gradient-to-b from-amber-50 via-white to-rose-50 text-foreground dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
          <div className="relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-3xl bg-gradient-to-br from-orange-500 to-rose-500 shadow-lg ring-1 ring-white/20 animate-[spin_2.5s_linear_infinite]">
            <img src={logo} alt="Tastevia logo" className="h-8 w-8 drop-shadow-sm" />
            <div className="absolute inset-0 bg-white/10 animate-pulse" />
            <div className="absolute inset-0 rounded-3xl bg-white/10 blur-[6px]" />
          </div>
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-orange-500">Tastevia</p>
            <p className="text-sm font-semibold text-foreground/70">Fresh &amp; Fast</p>
          </div>
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
      </Route>

      {/* PROTECTED ROUTES */}
      <Route element={<ProtectedRoutes />}>
        <Route element={<MainLayout />}>
          <Route path="/wishlist" element={<WishlistPage />} />
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
