import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Pizza, IceCream, Coffee, ShieldCheck } from "lucide-react";
import toast from "react-hot-toast";
import logo from "@/assets/logo.png";

import { login } from "../services/auth.service";
import { useAuth } from "../hooks/useAuth";
import {
  clearPostLoginRedirect,
  getPostLoginRedirect,
} from "../auth.storage";

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { loginUser } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!email.trim() || !password.trim()) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const response = await login({
        email: email.trim(),
        password,
      });

      loginUser(response.data.user);
      toast.success("Login successful");

      const redirectTo =
        location.state?.from?.pathname ||
        getPostLoginRedirect() ||
        "/";

      clearPostLoginRedirect();
      navigate(redirectTo, { replace: true });
    } catch (error: any) {
      const message =
        error?.response?.data?.message || error?.message || "Login failed";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid min-h-screen bg-background md:grid-cols-2">
      <div className="relative hidden items-center justify-center overflow-hidden bg-gradient-to-br from-orange-500/15 via-rose-400/10 to-amber-300/10 p-10 md:flex">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.2),transparent_35%),radial-gradient(circle_at_80%_0,rgba(255,255,255,0.18),transparent_30%)] blur-3xl" />
        <div className="absolute left-16 top-20 text-orange-400 animate-bounce">
          <Pizza size={36} />
        </div>
        <div className="absolute right-16 top-28 text-rose-400 animate-bounce delay-150">
          <IceCream size={34} />
        </div>
        <div className="absolute bottom-16 right-24 text-amber-500 animate-bounce delay-300">
          <Coffee size={32} />
        </div>

        <div className="relative z-10 flex flex-col items-center text-center">
          <img src={logo} alt="Tastevia" className="h-44 object-contain" />
          <p className="mt-6 max-w-md text-lg font-semibold text-foreground">
            Fresh meals delivered to your doorstep. Fast, delicious, and reliable.
          </p>
          <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/70 px-4 py-2 text-sm font-semibold text-foreground">
            <ShieldCheck className="h-4 w-4 text-orange-500" />
            Secure checkout + saved favorites
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center bg-background px-4 py-10">
        <div className="w-full max-w-md space-y-6 rounded-2xl border border-border/70 bg-card/80 p-8 shadow-[0_20px_60px_-35px_rgba(0,0,0,0.35)]">
          <div>
            <p className="pill text-orange-600 dark:text-orange-200">Welcome back</p>
            <h2 className="mt-3 text-3xl font-bold text-foreground">Login</h2>
            <p className="text-sm text-foreground/70">
              Login to continue ordering your favorite meals.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="space-y-1 text-sm font-semibold text-foreground">
              <span>Email</span>
              <input
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="w-full rounded-xl border border-border/70 bg-card/80 px-4 py-3 text-foreground outline-none transition focus:border-orange-300 focus:ring-2 focus:ring-orange-200 dark:bg-card/60"
                required
              />
            </label>

            <label className="space-y-1 text-sm font-semibold text-foreground">
              <span>Password</span>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="w-full rounded-xl border border-border/70 bg-card/80 px-4 py-3 text-foreground outline-none transition focus:border-orange-300 focus:ring-2 focus:ring-orange-200 dark:bg-card/60"
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-3 text-foreground/60 transition hover:text-orange-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </label>

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-rose-500 px-4 py-3 text-sm font-semibold text-white shadow-lg transition hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="text-sm text-foreground/70">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="font-semibold text-orange-600 transition hover:text-orange-700 dark:text-orange-300"
            >
              Signup
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
