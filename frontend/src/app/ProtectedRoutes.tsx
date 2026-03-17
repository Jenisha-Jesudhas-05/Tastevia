import { Navigate, Outlet, useLocation } from "react-router-dom"
import { getStoredToken, setPostLoginRedirect } from "@/features/auth/auth.storage"

export default function ProtectedRoutes() {
  const location = useLocation()

  const token = getStoredToken()

  if (!token) {
    setPostLoginRedirect(`${location.pathname}${location.search}`)
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  return <Outlet />
}
