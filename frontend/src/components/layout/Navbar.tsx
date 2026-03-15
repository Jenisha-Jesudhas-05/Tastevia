import { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
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
  const location = useLocation();
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

  useEffect(() => {
    // Close menus when route changes
    setMobileMenuOpen(false);
    setAccountOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/menu", label: "Menu" },
    { to: "/orders", label: "Orders" },
    { to: "/wishlist", label: "Wishlist" },
  ];

  const linkClasses = ({ isActive }: { isActive: boolean }) =>
    `relative inline-flex items-center gap-2 text-sm font-semibold transition-colors ${
      isActive
        ? "text-orange-600 after:absolute after:-bottom-2 after:left-0 after:h-0.5 after:w-full after:rounded-full after:bg-orange-500"
        : "text-foreground/70 hover:text-orange-500"
    }`;

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/70 bg-background/80 backdrop-blur supports-[backdrop-filter]:backdrop-blur-lg shadow-sm transition-colors">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6">
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="Tastevia Logo" className="h-11 w-auto" />
          <div className="hidden leading-tight sm:block">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-orange-500">
              Tastevia
            </p>
            <p className="text-sm font-semibold text-foreground/90">Dine better</p>
          </div>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <NavLink key={link.to} to={link.to} className={linkClasses}>
              {link.label}
              {link.to === "/wishlist" && wishlist.length > 0 ? (
                <span className="ml-1 rounded-full bg-orange-100 px-2 text-[10px] font-semibold text-orange-600 dark:bg-orange-500/15 dark:text-orange-200">
                  {wishlist.length}
                </span>
              ) : null}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/cart"
            className="relative hidden items-center gap-2 rounded-full border border-border/70 bg-secondary/70 px-3 py-1.5 text-sm font-semibold text-foreground transition hover:border-orange-300 hover:text-orange-500 md:inline-flex"
          >
            <ShoppingCart className="h-4 w-4" />
            Cart
            {totalItems > 0 && (
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-orange-500 px-1 text-[11px] font-bold text-white">
                {totalItems}
              </span>
            )}
          </Link>

          <div className="hidden md:block">
            <ThemeToggle />
          </div>

          {!user ? (
            <div className="hidden items-center gap-3 md:flex">
              <Link
                to="/login"
                className="text-sm font-semibold text-foreground/80 transition hover:text-orange-500"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="rounded-full bg-gradient-to-r from-orange-500 to-rose-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:shadow-md"
              >
                Sign up
              </Link>
            </div>
          ) : (
            <div className="relative hidden items-center gap-2 md:flex">
              <button
                onClick={() => setAccountOpen((o) => !o)}
                className="flex items-center gap-2 rounded-full border border-border/70 bg-secondary/70 px-3 py-1.5 text-sm font-semibold text-foreground transition hover:border-orange-300 hover:text-orange-500"
              >
                <User className="h-4 w-4 text-orange-500" />
                <span className="max-w-[140px] truncate">
                  {user.name || user.email}
                </span>
                <ChevronDown size={14} />
              </button>

              {accountOpen && (
                <div className="absolute right-0 top-11 w-56 rounded-2xl border border-border/70 bg-card/90 shadow-xl backdrop-blur">
                  <Link
                    to="/orders"
                    className="block px-4 py-3 text-sm text-foreground/80 transition hover:bg-orange-50/70 hover:text-orange-600 dark:hover:bg-white/5"
                    onClick={() => setAccountOpen(false)}
                  >
                    Orders
                  </Link>
                  <Link
                    to="/wishlist"
                    className="block px-4 py-3 text-sm text-foreground/80 transition hover:bg-orange-50/70 hover:text-orange-600 dark:hover:bg-white/5"
                    onClick={() => setAccountOpen(false)}
                  >
                    Wishlist
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setAccountOpen(false);
                    }}
                    className="flex w-full items-center gap-2 px-4 py-3 text-sm text-red-600 transition hover:bg-red-50 dark:hover:bg-red-500/10"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}

          <button
            className="inline-flex items-center justify-center rounded-full border border-border/70 p-2 text-foreground md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="border-t border-border/70 bg-background shadow-md md:hidden">
          <div className="flex flex-col gap-4 px-6 py-4 text-foreground/90">
            {navLinks.map((link) => (
              <NavLink key={link.to} to={link.to} className={linkClasses}>
                {link.label}
                {link.to === "/wishlist" && wishlist.length > 0 ? (
                  <span className="ml-1 rounded-full bg-orange-500/15 px-2 text-[11px] font-semibold text-orange-600 dark:text-orange-200">
                    {wishlist.length}
                  </span>
                ) : null}
              </NavLink>
            ))}

            <Link
              to="/cart"
              className="inline-flex items-center gap-2 rounded-xl border border-border/70 bg-secondary/70 px-3 py-2 font-semibold text-foreground transition hover:border-orange-300 hover:text-orange-500"
            >
              <ShoppingCart className="h-4 w-4" />
              Cart
              {totalItems > 0 && (
                <span className="rounded-full bg-orange-500 px-2 text-xs font-bold text-white">
                  {totalItems}
                </span>
              )}
            </Link>

            {!user ? (
              <>
                <Link
                  to="/login"
                  className="text-sm font-semibold text-foreground/80 transition hover:text-orange-500"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-orange-500 to-rose-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:shadow-md"
                >
                  Sign up
                </Link>
              </>
            ) : (
              <>
                <span className="flex items-center gap-2 text-sm text-foreground/80">
                  <User className="h-4 w-4 text-orange-500" />
                  {user.name || user.email}
                </span>
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-2 text-sm font-semibold text-red-600 transition hover:text-red-700"
                >
                  <LogOut className="h-5 w-5" />
                  Logout
                </button>
              </>
            )}

            <div className="border-t border-border/60 pt-3">
              <ThemeToggle />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
