import { Navigate, Outlet, useLocation } from "react-router-dom"
import { setPostLoginRedirect } from "@/features/auth/auth.storage"
import { useAuth } from "@/features/auth/hooks/useAuth"

export default function ProtectedRoutes() {
  const location = useLocation()
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    setPostLoginRedirect(`${location.pathname}${location.search}`)
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  return <Outlet />
}
