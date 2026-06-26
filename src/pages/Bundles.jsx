import { Link } from 'react-router-dom'
import BundleCard from '../components/BundleCard'
import bundles from '../data/bundles'
import EmptyState from '../components/EmptyState'

export default function Bundles() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Medicine Bundles</h1>
        <p className="mt-1 text-gray-500">
          Pre-packaged bundles for chronic disease management. Save time and
          get everything you need in one order.
        </p>
      </div>

      {bundles.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {bundles.map((bundle) => (
            <BundleCard key={bundle.id} bundle={bundle} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No bundles available"
          description="Check back later for new medicine bundles."
          action={
            <Link to="/" className="text-primary-600 hover:text-primary-700">
              Back to Home
            </Link>
          }
        />
      )}
    </div>
  )
}
