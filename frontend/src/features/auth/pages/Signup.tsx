import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Sparkles, Star } from "lucide-react";
import toast from "react-hot-toast";
import logo from "@/assets/logo.png";

import { signup } from "../services/auth.service";
import { useAuth } from "../hooks/useAuth";

export default function SignupPage() {
  const navigate = useNavigate();
  const { loginUser } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!name.trim() || !email.trim() || !password.trim()) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const response = await signup({
        name: name.trim(),
        email: email.trim(),
        password,
      });

      loginUser(response.data.user);
      toast.success("Account created! Welcome to Tastevia.");
      navigate("/");
    } catch (error: any) {
      const message =
        error?.response?.data?.message || error?.message || "Signup failed";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid min-h-screen bg-background md:grid-cols-2">
      <div className="relative hidden items-center justify-center overflow-hidden bg-gradient-to-br from-orange-500/12 via-amber-400/10 to-rose-400/10 p-10 md:flex">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.2),transparent_35%),radial-gradient(circle_at_70%_0,rgba(255,255,255,0.18),transparent_30%)] blur-3xl" />
        <div className="relative z-10 space-y-6 text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-white/30 shadow-lg backdrop-blur">
            <Sparkles className="h-8 w-8 text-orange-500" />
          </div>
          <img src={logo} alt="Tastevia" className="mx-auto h-40 object-contain" />
          <p className="mx-auto max-w-md text-lg font-semibold text-foreground">
            Create an account to save favorites, speed through checkout, and track every order.
          </p>
          <div className="mx-auto flex w-fit items-center gap-2 rounded-full border border-border/70 bg-card/70 px-4 py-2 text-sm font-semibold text-foreground">
            <Star className="h-4 w-4 text-orange-500" />
            Members unlock weekend drops first
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center bg-background px-4 py-10">
        <div className="w-full max-w-md space-y-6 rounded-2xl border border-border/70 bg-card/80 p-8 shadow-[0_20px_60px_-35px_rgba(0,0,0,0.35)]">
          <div>
            <p className="pill text-orange-600 dark:text-orange-200">Join Tastevia</p>
            <h2 className="mt-3 text-3xl font-bold text-foreground">Create account</h2>
            <p className="text-sm text-foreground/70">
              Quick signup, secure payments, and personalized picks.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="space-y-1 text-sm font-semibold text-foreground">
              <span>Name</span>
              <input
                type="text"
                placeholder="Your full name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                className="w-full rounded-xl border border-border/70 bg-card/80 px-4 py-3 text-foreground outline-none transition focus:border-orange-300 focus:ring-2 focus:ring-orange-200 dark:bg-card/60"
                required
              />
            </label>

            <label className="space-y-1 text-sm font-semibold text-foreground">
              <span>Email</span>
              <input
                type="email"
                placeholder="you@example.com"
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
                  placeholder="Create a password"
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
              {loading ? "Creating account..." : "Signup"}
            </button>
          </form>

          <p className="text-sm text-foreground/70">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-orange-600 transition hover:text-orange-700 dark:text-orange-300"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
