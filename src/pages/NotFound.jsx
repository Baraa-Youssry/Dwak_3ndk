import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
      <h1 className="text-8xl font-bold text-primary-200">404</h1>
      <p className="mt-4 text-xl font-semibold text-gray-900">
        Page Not Found
      </p>
      <p className="mt-2 text-gray-500">
        The page you're looking for doesn't exist.
      </p>
      <Link
        to="/"
        className="mt-6 inline-block bg-primary-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-primary-700 transition-colors"
      >
        Back to Home
      </Link>
    </div>
  )
}
