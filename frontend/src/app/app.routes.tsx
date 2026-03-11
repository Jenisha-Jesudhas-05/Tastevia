import { Routes, Route } from "react-router-dom"


import Home from "@/pages/Home"
import Menu from "@/pages/Menu"
import Cart from "@/pages/Cart"
import Orders from "@/pages/Orders"
import AuthLayout from "@/components/layout/AuthLayout"
import SignupPage from "@/features/auth/pages/Signup"
import LoginPage from "@/features/auth/pages/Login"
import MainLayout from "@/components/layout/MainLayout"
import ProtectedRoutes from "./ProtectedRoutes"

export default function AppRoutes() {
  return (
    <Routes>

      {/* AUTH PAGES (NO NAVBAR) */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />} />

        <Route path="/signup" element={<SignupPage />} />
      </Route>

      {/* MAIN APP (WITH NAVBAR) */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
      </Route>

      {/* PROTECTED ROUTES */}
      <Route element={<ProtectedRoutes />}>
        <Route element={<MainLayout />}>
          <Route path="/cart" element={<Cart />} />
          <Route path="/orders" element={<Orders />} />
        </Route>
      </Route>

    </Routes>
  )
}