import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, LogOut, User, Menu, X } from "lucide-react";
import logo from "../../assets/logo.png";
import { logout } from "@/features/auth/services/auth.service";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useCart } from "../../features/cart/CartContext";
import { useState } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const { user, logoutUser } = useAuth();
  const { totalItems } = useCart(); // ⭐ Cart count from context
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Handle logout
  const handleLogout = async () => {
    try {
      await logout();
      logoutUser();
      navigate("/login", { replace: true });
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <nav className="w-full sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-2 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img
            src={logo}
            alt="Tastevia Logo"
            className="h-20 md:h-20 w-auto object-contain"
          />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-10 text-gray-700 font-medium text-base">
          <Link to="/" className="hover:text-orange-600 transition-colors">
            Home
          </Link>

          <Link to="/menu" className="hover:text-orange-600 transition-colors">
            Menu
          </Link>

          <Link
            to="/orders"
            className="hover:text-orange-600 transition-colors"
          >
            Orders
          </Link>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-6">

          {/* Cart */}
          <Link to="/cart" className="relative flex items-center">
            <ShoppingCart className="w-6 h-6 text-gray-700 hover:text-orange-600 transition-colors" />

            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-orange-600 text-white text-xs px-1.5 rounded-full">
                {totalItems}
              </span>
            )}
          </Link>

          {/* Auth Section */}
          {!user ? (
            <div className="hidden md:flex items-center gap-4">
              <Link
                to="/login"
                className="text-gray-700 hover:text-orange-600 transition-colors"
              >
                Login
              </Link>

              <Link
                to="/signup"
                className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors"
              >
                Signup
              </Link>
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-4">

              <span className="flex items-center gap-1 text-gray-700">
                <User className="w-5 h-5 text-orange-500" />
                {user.name || user.email}
              </span>

              <button
                onClick={handleLogout}
                className="flex items-center gap-1 text-gray-700 hover:text-red-500 transition-colors"
              >
                <LogOut className="w-5 h-5" />
                Logout
              </button>

            </div>
          )}

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-gray-700"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>

        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white shadow-md">
          <div className="flex flex-col gap-4 px-6 py-4 text-gray-700 font-medium">

            <Link to="/" onClick={() => setMobileMenuOpen(false)}>
              Home
            </Link>

            <Link to="/menu" onClick={() => setMobileMenuOpen(false)}>
              Menu
            </Link>

            <Link to="/orders" onClick={() => setMobileMenuOpen(false)}>
              Orders
            </Link>

            {!user ? (
              <>
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-gray-700 hover:text-orange-600"
                >
                  Login
                </Link>

                <Link
                  to="/signup"
                  onClick={() => setMobileMenuOpen(false)}
                  className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700"
                >
                  Signup
                </Link>
              </>
            ) : (
              <>
                <span className="flex items-center gap-2 text-sm text-gray-700">
                  <User className="w-4 h-4 text-orange-500" />
                  {user.name || user.email}
                </span>

                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-2 text-gray-700 hover:text-red-500"
                >
                  <LogOut className="w-5 h-5" />
                  Logout
                </button>
              </>
            )}

          </div>
        </div>
      )}
    </nav>
  );
}
