export interface User {
  id: number
  name: string
  email: string
}

export interface SignupPayload {
  name: string
  email: string
  password: string
}

export interface LoginPayload {
  email: string
  password: string
}

export interface AuthResponse {
  user: User
  accessToken: string
}

export interface AuthContextType {
  user: User | null
  loginUser: (user: User) => void
  logoutUser: () => void
}