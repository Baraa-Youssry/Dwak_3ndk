import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'

export default function Navbar() {
  const { user, logout } = useAuth()
  const { totalItems } = useCart()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold text-primary-600">
              Dwak 3ndk
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <Link
              to="/"
              className="text-gray-600 hover:text-primary-600 transition-colors"
            >
              Home
            </Link>
            <Link
              to="/bundles"
              className="text-gray-600 hover:text-primary-600 transition-colors"
            >
              Bundles
            </Link>
            <Link
              to="/search"
              className="text-gray-600 hover:text-primary-600 transition-colors"
            >
              Search
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <Link
              to="/cart"
              className="relative text-gray-600 hover:text-primary-600 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z"
                />
              </svg>
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-accent-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>

            {user ? (
              <div className="flex items-center gap-3">
                {user.role === 'pharmacy' && (
                  <Link
                    to="/pharmacy"
                    className="text-sm text-gray-600 hover:text-primary-600 transition-colors"
                  >
                    Dashboard
                  </Link>
                )}
                {user.role === 'user' && (
                  <Link
                    to="/orders"
                    className="text-sm text-gray-600 hover:text-primary-600 transition-colors"
                  >
                    Orders
                  </Link>
                )}
                <span className="text-sm text-gray-700">{user.name}</span>
                <button
                  onClick={handleLogout}
                  className="text-sm text-red-500 hover:text-red-700 transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
