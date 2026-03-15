import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ChevronDown,
  Heart,
  LogOut,
  Menu,
  ShoppingCart,
  User,
  X,
} from "lucide-react";
import logo from "../../assets/logo.png";
import { logout } from "@/features/auth/services/auth.service";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useCart } from "@/features/cart/CartContext";
import { useWishlist } from "@/features/wishlist/WishlistContext";
import ThemeToggle from "../theme/ThemeToggle";

export default function Navbar() {
  const navigate = useNavigate();
  const { user, logoutUser } = useAuth();
  const { totalItems } = useCart();
  const { wishlist } = useWishlist();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);

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
    <nav className="sticky top-0 z-50 w-full border-b border-slate-100 bg-white/95 backdrop-blur supports-[backdrop-filter]:backdrop-blur-lg shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="Tastevia Logo" className="h-12 w-auto" />
          <div className="hidden leading-tight sm:block">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-orange-500">
              Tastevia
            </p>
            <p className="text-sm font-semibold text-slate-900">Dine better</p>
          </div>
        </Link>

        <div className="hidden items-center gap-8 text-base font-medium text-gray-700 md:flex">
          <Link to="/" className="transition-colors hover:text-orange-600">
            Home
          </Link>
          <Link to="/menu" className="transition-colors hover:text-orange-600">
            Menu
          </Link>
          <Link
            to="/orders"
            className="transition-colors hover:text-orange-600"
          >
            Orders
          </Link>
          <Link
            to="/wishlist"
            className="inline-flex items-center gap-1 transition-colors hover:text-orange-600"
          >
            <Heart size={16} />
            Wishlist
            {wishlist.length > 0 && (
              <span className="rounded-full bg-orange-100 px-2 text-xs font-semibold text-orange-600">
                {wishlist.length}
              </span>
            )}
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <Link to="/cart" className="relative flex items-center">
            <ShoppingCart className="h-6 w-6 text-gray-700 transition-colors hover:text-orange-600" />
            {totalItems > 0 && (
              <span className="absolute -right-2 -top-2 rounded-full bg-orange-600 px-1.5 text-xs text-white">
                {totalItems}
              </span>
            )}
          </Link>

          <div className="hidden md:block">
            <ThemeToggle />
          </div>

          {!user ? (
            <div className="hidden items-center gap-4 md:flex">
              <Link
                to="/login"
                className="text-gray-700 transition-colors hover:text-orange-600"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="rounded-lg bg-orange-600 px-4 py-2 text-white transition-colors hover:bg-orange-700"
              >
                Signup
              </Link>
            </div>
          ) : (
            <div className="relative hidden items-center gap-2 md:flex">
              <button
                onClick={() => setAccountOpen((o) => !o)}
                className="flex items-center gap-2 rounded-full border border-slate-200 px-3 py-1.5 text-sm font-semibold text-slate-700 transition hover:border-orange-200 hover:text-orange-600"
              >
                <User className="h-4 w-4 text-orange-500" />
                <span className="max-w-[140px] truncate">
                  {user.name || user.email}
                </span>
                <ChevronDown size={14} />
              </button>

              {accountOpen && (
                <div className="absolute right-0 top-11 w-56 rounded-2xl border border-slate-100 bg-white shadow-xl">
                  <Link
                    to="/orders"
                    className="block px-4 py-3 text-sm text-slate-700 hover:bg-orange-50"
                    onClick={() => setAccountOpen(false)}
                  >
                    Orders
                  </Link>
                  <Link
                    to="/wishlist"
                    className="block px-4 py-3 text-sm text-slate-700 hover:bg-orange-50"
                    onClick={() => setAccountOpen(false)}
                  >
                    Wishlist
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setAccountOpen(false);
                    }}
                    className="flex w-full items-center gap-2 px-4 py-3 text-sm text-red-600 hover:bg-red-50"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}

          <button
            className="text-gray-700 md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-white shadow-md border-t border-slate-100">
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
            <Link to="/wishlist" onClick={() => setMobileMenuOpen(false)}>
              Wishlist
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
                  className="rounded-lg bg-orange-600 px-4 py-2 text-white hover:bg-orange-700"
                >
                  Signup
                </Link>
              </>
            ) : (
              <>
                <span className="flex items-center gap-2 text-sm text-gray-700">
                  <User className="h-4 w-4 text-orange-500" />
                  {user.name || user.email}
                </span>
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-2 text-gray-700 hover:text-red-500"
                >
                  <LogOut className="h-5 w-5" />
                  Logout
                </button>
              </>
            )}

            <div className="border-t border-slate-100 pt-2">
              <ThemeToggle />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
