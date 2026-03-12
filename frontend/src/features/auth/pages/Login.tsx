import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Pizza, IceCream, Coffee } from "lucide-react";
import toast from "react-hot-toast";
import logo from "@/assets/logo.png";

import { login } from "../services/auth.service";
import { useAuth } from "../hooks/useAuth";

export default function LoginPage() {
  const navigate = useNavigate();
  const { loginUser } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const res = await login({
        email: email.trim(),
        password,
      });

      // ✅ Update global AuthContext
      loginUser(res.user);

      toast.success("Login successful 🎉");

      navigate("/", { replace: true }); // Redirect home after login
    } catch (error: any) {
      const message =
        error?.response?.data?.message || error?.message || "Login failed";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen grid md:grid-cols-2 overflow-hidden">
      {/* LEFT SIDE */}
      <div className="hidden md:flex flex-col items-center justify-center bg-gradient-to-br from-orange-100 via-orange-50 to-white relative">
        {/* Decorative Circles */}
        <div className="absolute w-72 h-72 bg-orange-300 rounded-full blur-3xl opacity-40 animate-pulse"></div>
        <div className="absolute w-96 h-96 bg-yellow-200 rounded-full blur-3xl opacity-30 animate-pulse top-20 left-20"></div>

        {/* Floating Icons */}
        <div className="absolute top-20 left-10 text-orange-400 animate-bounce">
          <Pizza size={40} />
        </div>
        <div className="absolute bottom-24 right-16 text-orange-300 animate-bounce delay-200">
          <IceCream size={36} />
        </div>
        <div className="absolute top-40 right-20 text-orange-500 animate-bounce delay-300">
          <Coffee size={34} />
        </div>

        {/* Logo */}
        <img src={logo} alt="Tastevia" className="h-60 object-contain z-10" />

        <p className="text-gray-600 mt-6 text-center max-w-sm text-lg z-10">
          Fresh meals delivered to your doorstep. Fast, delicious, and reliable.
        </p>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center justify-center bg-gray-50">
        <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl p-8">
          <h2 className="text-3xl font-bold text-gray-800">Welcome Back 👋</h2>
          <p className="text-gray-500 mt-2 mb-6">
            Login to continue ordering your favorite meals
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="text-sm text-gray-600">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border rounded-lg px-4 py-2 mt-1 focus:ring-2 focus:ring-orange-500 focus:border-orange-400"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="text-sm text-gray-600">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border rounded-lg px-4 py-2 mt-1 focus:ring-2 focus:ring-orange-500 focus:border-orange-400"
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-orange-600 text-white py-2.5 rounded-lg hover:bg-orange-700 transition shadow-md disabled:opacity-60"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="text-sm text-gray-500 mt-6 text-center">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-orange-600 font-medium hover:underline"
            >
              Signup
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}