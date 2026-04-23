import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'

export const ProtectedRoute = () => {
  const { user, isInitialized } = useAuthStore()

  if (!isInitialized) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  if (!user) {
    return <Navigate to={'/auth'} replace />
  }

  return <Outlet />
}
