import { api } from "@/lib/axios"
import type { LoginPayload, SignupPayload, AuthResponse } from "../types/auth.types"
import {
  clearStoredUser,
  setStoredUser,
} from "../auth.storage"
import type { User } from "../types/auth.types"

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

export const fetchCurrentUser = async (): Promise<User | null> => {
  try {
    const res = await api.get<AuthResponse>("/auth/me")
    const user = res.data.data.user
    setStoredUser(user)
    return user
  } catch (error) {
    clearStoredUser()
    return null
  }
}
