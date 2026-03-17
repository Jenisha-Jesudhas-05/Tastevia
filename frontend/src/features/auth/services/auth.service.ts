import { api } from "@/lib/axios"
import type { LoginPayload, SignupPayload, AuthResponse } from "../types/auth.types"
import {
  clearStoredToken,
  clearStoredUser,
  setStoredToken,
  setStoredUser,
} from "../auth.storage"

/**
 * Signup
 */
export const signup = async (data: SignupPayload): Promise<AuthResponse> => {

  const res = await api.post<AuthResponse>("/auth/signup", data)

  setStoredToken(res.data.data.accessToken)
  setStoredUser(res.data.data.user)

  return res.data
}

/**
 * Login
 */
export const login = async (data: LoginPayload): Promise<AuthResponse> => {

  const res = await api.post<AuthResponse>("/auth/login", data)

  setStoredToken(res.data.data.accessToken)
  setStoredUser(res.data.data.user)

  return res.data
}

/**
 * Logout
 */
export const logout = async () => {

  await api.post("/auth/logout")

  clearStoredToken()
  clearStoredUser()
}
