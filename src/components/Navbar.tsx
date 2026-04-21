import { Link, useLocation } from 'react-router-dom'

export const Navbar = () => {
  const location = useLocation()

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 h-16 flex items-center gap-6">
        <div className="font-bold text-xl text-blue-600 mr-4 italic">trackflow</div>

        <Link
          to="/"
          className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${location.pathname === '/' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'}`}
        >
          Clients
        </Link>
        <Link
          to="/history"
          className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${location.pathname === '/history' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'}`}
        >
          Task history
        </Link>
      </div>
    </nav>
  )
}