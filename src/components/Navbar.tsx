import { Link, useLocation } from 'react-router-dom'
import { useAuthStore } from '../features/auth/store/authStore'
import { logout } from '../features/auth/services/useAuthService'

export const Navbar = () => {
  const location = useLocation()
  const { user } = useAuthStore()

  if (!user || location.pathname === '/auth') return null

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="font-bold text-xl text-blue-600 mr-4 italic">trackflow</div>

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
        </div>

        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500">{user.email}</span>
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
