import { Link } from 'react-router-dom'

export default function MedicineCard({ medicine, pharmacies = [] }) {
  const availableCount = pharmacies.filter((p) => p.available).length

  return (
    <Link
      to={`/medicine/${medicine.id}`}
      className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow group"
    >
      <div className="aspect-square bg-gray-100 overflow-hidden">
        <img
          src={medicine.image}
          alt={medicine.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
          {medicine.name}
        </h3>
        <span className="inline-block mt-1 text-xs font-medium bg-primary-50 text-primary-700 px-2 py-0.5 rounded-full">
          {medicine.category}
        </span>
        <div className="mt-3 flex items-center justify-between text-sm">
          <span className="text-gray-500">
            {availableCount} {availableCount === 1 ? 'pharmacy' : 'pharmacies'}
          </span>
          <span className="font-semibold text-primary-600">
            EGP {medicine.basePrice}
          </span>
        </div>
      </div>
    </Link>
  )
}
