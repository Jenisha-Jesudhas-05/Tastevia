import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, LogOut } from "lucide-react";
import logo from "../../assets/logo.png";

import { logout } from "@/features/auth/services/auth.service";
import { useAuth } from "@/features/auth/hooks/useAuth";

export default function Navbar() {
  const navigate = useNavigate();
  const { user, logoutUser } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      logoutUser(); // remove user from context/localStorage
      navigate("/login", { replace: true });
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <nav className="w-full border-b bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img src={logo} alt="Tastevia Logo" className="h-16 w-auto object-contain" />
        </Link>

        {/* Navigation */}
        <div className="hidden md:flex items-center gap-10 text-gray-700 font-medium text-base">
          <Link to="/" className="hover:text-orange-600 transition">Home</Link>
          <Link to="/menu" className="hover:text-orange-600 transition">Menu</Link>
          <Link to="/orders" className="hover:text-orange-600 transition">Orders</Link>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-6">
          {/* Cart */}
          <Link to="/cart" className="relative">
            <ShoppingCart className="w-6 h-6 text-gray-700" />
            <span className="absolute -top-2 -right-2 bg-orange-600 text-white text-xs px-1.5 rounded-full">0</span>
          </Link>

          {/* Auth Section */}
          {!user ? (
            <div className="flex items-center gap-4">
              <Link
                to="/login"
                className="text-gray-700 hover:text-orange-600 transition"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition"
              >
                Signup
              </Link>
            </div>
          ) : (
            <button
              onClick={handleLogout}
              className="flex items-center gap-1 text-gray-700 hover:text-red-500 transition"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}