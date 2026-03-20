import { Link } from "react-router-dom";
import { LogOut, User, ShoppingBag, Heart, ShieldCheck } from "lucide-react";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { logout } from "@/features/auth/services/auth.service";
import { useState } from "react";

export default function AccountPage() {
  const { user, logoutUser } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    try {
      setLoading(true);
      await logout();
      logoutUser();
    } catch (error) {
      console.error("Logout failed", error);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-center justify-center gap-4 px-4 text-center">
        <p className="text-lg font-semibold text-foreground">You’re not signed in.</p>
        <div className="flex gap-3">
          <Link
            to="/login"
            className="rounded-full bg-gradient-to-r from-orange-500 to-rose-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:shadow-md"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="rounded-full border border-orange-200 px-4 py-2 text-sm font-semibold text-orange-600 transition hover:bg-orange-50"
          >
            Sign up
          </Link>
        </div>
      </div>
    );
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-amber-50 via-white to-rose-50 px-4 py-10 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(251,146,60,0.12),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(244,114,182,0.12),transparent_40%)]" />
      <div className="relative mx-auto grid max-w-5xl gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[2rem] border border-border/70 bg-card/90 p-8 shadow-xl backdrop-blur">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-500/15 text-orange-600">
              <User className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.22em] text-foreground/60">Account</p>
              <h1 className="text-3xl font-semibold text-foreground">{user.name || user.email}</h1>
              <p className="text-sm text-foreground/60">{user.email}</p>
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <Link
              to="/orders"
              className="flex items-center gap-3 rounded-2xl border border-border/70 bg-secondary/80 px-4 py-4 text-left transition hover:-translate-y-[1px] hover:border-orange-300 hover:shadow-md dark:hover:bg-white/5"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/15 text-orange-600">
                <ShoppingBag size={18} />
              </div>
              <div>
                <p className="font-semibold text-foreground">Orders</p>
                <p className="text-sm text-foreground/60">View your order history and details.</p>
              </div>
            </Link>

            <Link
              to="/wishlist"
              className="flex items-center gap-3 rounded-2xl border border-border/70 bg-secondary/80 px-4 py-4 text-left transition hover:-translate-y-[1px] hover:border-orange-300 hover:shadow-md dark:hover:bg-white/5"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-500/15 text-rose-600">
                <Heart size={18} />
              </div>
              <div>
                <p className="font-semibold text-foreground">Wishlist</p>
                <p className="text-sm text-foreground/60">Shortlist items you love.</p>
              </div>
            </Link>
          </div>

          <div className="mt-8 rounded-2xl border border-emerald-200/70 bg-emerald-50/70 px-4 py-4 text-sm text-emerald-900 dark:border-emerald-500/40 dark:bg-emerald-500/10 dark:text-emerald-100">
            <div className="flex items-center gap-2 font-semibold">
              <ShieldCheck size={16} />
              Secure sign-in
            </div>
            <p className="mt-1 text-foreground/70">
              Your session is protected with httpOnly cookies. Want to switch accounts? Just log out below and sign back in.
            </p>
          </div>

          <button
            onClick={handleLogout}
            disabled={loading}
            className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-orange-500 to-rose-500 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:shadow-md disabled:opacity-60"
          >
            <LogOut className="h-4 w-4" />
            {loading ? "Logging out..." : "Logout"}
          </button>
        </div>

        <div className="rounded-[2rem] border border-border/60 bg-card/90 p-6 shadow-lg backdrop-blur">
          <h2 className="text-xl font-semibold text-foreground">Profile</h2>
          <div className="mt-4 space-y-3 text-sm text-foreground/70">
            <div className="flex justify-between rounded-xl border border-border/60 bg-secondary/80 px-4 py-3">
              <span className="font-semibold text-foreground/80">Name</span>
              <span className="text-foreground">{user.name || "—"}</span>
            </div>
            <div className="flex justify-between rounded-xl border border-border/60 bg-secondary/80 px-4 py-3">
              <span className="font-semibold text-foreground/80">Email</span>
              <span className="text-foreground">{user.email}</span>
            </div>
            <div className="rounded-xl border border-border/60 bg-secondary/80 px-4 py-3 text-foreground/70">
              Want to update details? Reach out via{" "}
              <Link to="/support" className="font-semibold text-orange-600 underline">
                Support
              </Link>{" "}
              and we’ll help.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
