import { Link, useLocation } from 'react-router-dom'
import { useAuthStore } from '../features/auth/store/authStore'
import { logout } from '../features/auth/services/useAuthService'
import { useProfiles } from '../features/profiles/hooks/useProfiles'

export const Navbar = () => {
  const location = useLocation()
  const { user } = useAuthStore()

  const { data: profiles } = useProfiles()
  const currentProfile = profiles?.find((p) => p.id === user?.id)
  console.log(currentProfile)

  const initials = currentProfile?.full_name
    ? currentProfile.full_name.substring(0, 2).toUpperCase()
    : currentProfile?.email.substring(0, 2).toUpperCase()

  if (!user || location.pathname === '/auth') return null

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between flex-wrap gap-x-8 gap-y-2">
        <div className="flex items-center gap-x-6 gap-y-4 flex-wrap">
          <div className="font-bold text-xl text-blue-600 mr-4 italic">trackflow</div>

          <div className="flex gap-2">
            <Link
              to="/"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${location.pathname === '/' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'}`}
            >
              Projects
            </Link>

            <Link
              to="/history"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${location.pathname === '/history' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'}`}
            >
              Task history
            </Link>

            <Link
              to="/clients"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${location.pathname === '/clients' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'}`}
            >
              Clients
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-x-4 gap-y-2 flex-wrap">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full overflow-hidden bg-blue-100 flex items-center justify-center border border-gray-200 shadow-sm">
              {currentProfile?.avatar_url ? (
                <img
                  src={currentProfile.avatar_url}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-blue-600 font-bold text-xs">{initials}</span>
              )}
            </div>
            <span className="text-sm text-gray-500">{currentProfile?.full_name}</span>
          </div>
          <button
            onClick={() => logout()}
            className="cursor-pointer text-sm text-red-600 hover:bg-red-50 px-3 py-2 rounded-md transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  )
}
