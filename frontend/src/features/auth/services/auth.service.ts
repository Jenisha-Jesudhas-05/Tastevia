import { api } from "@/lib/axios"
import type { LoginPayload, SignupPayload, AuthResponse } from "../types/auth.types"
import {
  clearStoredUser,
  setStoredUser,
} from "../auth.storage"

export const signup = async (data: SignupPayload): Promise<AuthResponse> => {

  const res = await api.post<AuthResponse>("/auth/signup", data)

  setStoredUser(res.data.data.user)

  return res.data
}

export const login = async (data: LoginPayload): Promise<AuthResponse> => {

  const res = await api.post<AuthResponse>("/auth/login", data)

  setStoredUser(res.data.data.user)

  return res.data
}

export const logout = async () => {

  await api.post("/auth/logout")

  clearStoredUser()
}
