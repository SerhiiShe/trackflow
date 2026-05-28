import { Navigate, Outlet } from "react-router-dom"
import { useAuthStore } from "../../features/auth/store/authStore"
import { useProfiles } from "../../features/profiles/hooks/useProfiles"

export const EmployeeRoute = () => {
  const { user } = useAuthStore()
  const { data: profiles, isLoading } = useProfiles()

  if (isLoading) return <div>Loading...</div>

  const currentProfile = profiles?.find(p => p.id === user?.id)
  const isEmployee = currentProfile?.role === 'employee'

  if (!isEmployee) {
    return <Navigate to='/projects' replace />
  }

  return <Outlet />
}
