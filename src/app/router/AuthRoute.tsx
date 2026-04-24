import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStore } from '../../features/auth/store/authStore'

export const AuthRoute = () => {
  const { user, isInitialized } = useAuthStore()

  if (!isInitialized) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  if (user) {
    return <Navigate to="/" replace />
  }

  return <Outlet />
}
