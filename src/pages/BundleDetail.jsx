import { useParams, Link } from 'react-router-dom'
import bundles from '../data/bundles'
import medicines from '../data/medicines'
import { useCart } from '../context/CartContext'
import EmptyState from '../components/EmptyState'

export default function BundleDetail() {
  const { id } = useParams()
  const bundle = bundles.find((b) => b.id === Number(id))
  const { addBundleItems } = useCart()

  if (!bundle) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <EmptyState
          title="Bundle not found"
          description="The bundle you're looking for doesn't exist."
          action={
            <Link to="/bundles" className="text-primary-600 hover:text-primary-700">
              Back to Bundles
            </Link>
          }
        />
      </div>
    )
  }

  const bundleMedicines = bundle.medicineIds
    .map((mid) => medicines.find((m) => m.id === mid))
    .filter(Boolean)

  const handleAddBundle = () => {
    const items = bundleMedicines.map((med) => ({
      medicineId: med.id,
      pharmacyId: 1,
      price: med.basePrice,
      medicineName: med.name,
      pharmacyName: 'El-Ezaby Pharmacy',
    }))
    addBundleItems(items)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link
        to="/bundles"
        className="text-sm text-primary-600 hover:text-primary-700 transition-colors"
      >
        &larr; Back to Bundles
      </Link>

      <div className="mt-6 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="h-64 bg-gray-100">
          <img
            src={bundle.image}
            alt={bundle.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{bundle.name}</h1>
              <span className="inline-block mt-1 text-sm font-medium bg-accent-50 text-accent-700 px-3 py-1 rounded-full">
                {bundle.category}
              </span>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-accent-600">
                EGP {bundle.totalPrice}
              </p>
              <p className="text-sm text-gray-500">
                {bundle.medicineIds.length} items
              </p>
            </div>
          </div>
          <p className="mt-4 text-gray-600">{bundle.description}</p>

          <button
            onClick={handleAddBundle}
            className="mt-6 bg-accent-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-accent-700 transition-colors"
          >
            Add Entire Bundle to Cart
          </button>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Bundle Contents
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {bundleMedicines.map((med) => (
            <div
              key={med.id}
              className="bg-white rounded-xl border border-gray-100 p-4 flex items-center gap-4"
            >
              <div className="w-14 h-14 rounded-lg bg-gray-100 flex-shrink-0 overflow-hidden">
                <img
                  src={med.image}
                  alt={med.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">{med.name}</h3>
                <p className="text-sm text-gray-500">{med.category}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
