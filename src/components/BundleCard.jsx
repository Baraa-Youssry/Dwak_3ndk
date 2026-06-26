import { Link } from 'react-router-dom'

export default function BundleCard({ bundle }) {
  return (
    <Link
      to={`/bundle/${bundle.id}`}
      className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow group"
    >
      <div className="h-48 bg-gray-100 overflow-hidden">
        <img
          src={bundle.image}
          alt={bundle.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 group-hover:text-accent-600 transition-colors">
          {bundle.name}
        </h3>
        <span className="inline-block mt-1 text-xs font-medium bg-accent-50 text-accent-700 px-2 py-0.5 rounded-full">
          {bundle.category}
        </span>
        <p className="mt-2 text-sm text-gray-500 line-clamp-2">
          {bundle.description}
        </p>
        <div className="mt-3 flex items-center justify-between text-sm">
          <span className="text-gray-400">
            {bundle.medicineIds.length}{' '}
            {bundle.medicineIds.length === 1 ? 'item' : 'items'}
          </span>
          <span className="font-bold text-accent-600">
            EGP {bundle.totalPrice}
          </span>
        </div>
      </div>
    </Link>
  )
}
