import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Eye, EyeOff, Pizza, IceCream, Coffee } from "lucide-react"
import toast from "react-hot-toast"
import logo from "@/assets/logo.png"

import { signup } from "../services/auth.service"

export default function SignupPage() {

  const navigate = useNavigate()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!name || !email || !password) {
      toast.error("Please fill all fields")
      return
    }

    try {

      setLoading(true)

      await signup({
        name,
        email,
        password
      })

      toast.success("Account created successfully 🚀")

      // redirect to login
      navigate("/login")

    } catch (error: any) {

      toast.error(
        error?.response?.data?.message || "Signup failed"
      )

    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="h-screen grid md:grid-cols-2 overflow-hidden">

      {/* LEFT */}
      <div className="hidden md:flex flex-col items-center justify-center bg-gradient-to-br from-orange-100 via-orange-50 to-white relative">

        <div className="absolute w-72 h-72 bg-orange-300 rounded-full blur-3xl opacity-40 animate-pulse"></div>
        <div className="absolute w-96 h-96 bg-yellow-200 rounded-full blur-3xl opacity-30 animate-pulse top-20 left-20"></div>

        <div className="absolute top-20 left-10 text-orange-400 animate-bounce">
          <Pizza size={40} />
        </div>

        <div className="absolute bottom-24 right-16 text-orange-300 animate-bounce">
          <IceCream size={36} />
        </div>

        <div className="absolute top-40 right-20 text-orange-500 animate-bounce">
          <Coffee size={34} />
        </div>

        <img
          src={logo}
          alt="Tastevia"
          className="h-60 object-contain z-10"
        />

        <p className="text-gray-600 mt-6 text-center max-w-sm text-lg z-10">
          Join Tastevia and explore amazing meals delivered straight to your home.
        </p>

      </div>

      {/* RIGHT */}
      <div className="flex items-center justify-center bg-gray-50">

        <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl p-8">

          <h2 className="text-3xl font-bold text-gray-800">
            Create Account
          </h2>

          <p className="text-gray-500 mt-2 mb-6">
            Start your food journey today
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Name */}
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border rounded-lg px-4 py-2
              focus:ring-2 focus:ring-orange-500"
            />

            {/* Email */}
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded-lg px-4 py-2
              focus:ring-2 focus:ring-orange-500"
            />

            {/* Password */}
            <div className="relative">

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border rounded-lg px-4 py-2
                focus:ring-2 focus:ring-orange-500"
              />

              <button
                type="button"
                className="absolute right-3 top-3 text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18}/> : <Eye size={18}/>}
              </button>

            </div>

            {/* Button */}
            <button
              disabled={loading}
              className="w-full bg-orange-600 text-white py-2.5 rounded-lg
              hover:bg-orange-700
              hover:scale-[1.02]
              active:scale-95
              transition-all duration-200 shadow-md
              disabled:opacity-60"
            >
              {loading ? "Creating account..." : "Create Account"}
            </button>

          </form>

          <p className="text-sm text-gray-500 mt-6 text-center">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-orange-600 font-medium hover:underline"
            >
              Login
            </Link>
          </p>

        </div>

      </div>

    </div>
  )
}