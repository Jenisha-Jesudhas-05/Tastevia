import { api } from "@/lib/axios"
import type { LoginPayload, SignupPayload, AuthResponse } from "../types/auth.types"

/**
 * Signup
 */
export const signup = async (data: SignupPayload): Promise<AuthResponse> => {

  const res = await api.post<AuthResponse>("/auth/signup", data)

  localStorage.setItem("token", res.data.accessToken)
  localStorage.setItem("user", JSON.stringify(res.data.user))

  return res.data
}

/**
 * Login
 */
export const login = async (data: LoginPayload): Promise<AuthResponse> => {

  const res = await api.post<AuthResponse>("/auth/login", data)

  localStorage.setItem("token", res.data.accessToken)
  localStorage.setItem("user", JSON.stringify(res.data.user))

  return res.data
}

/**
 * Logout
 */
export const logout = async () => {

  await api.post("/auth/logout")

  localStorage.removeItem("token")
  localStorage.removeItem("user")
}