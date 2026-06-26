import { useParams } from 'react-router-dom'
import { getMedicineById, getPharmaciesForMedicine } from '../utils/search'
import { useCart } from '../context/CartContext'
import PharmacyCard from '../components/PharmacyCard'
import EmptyState from '../components/EmptyState'
import { Link } from 'react-router-dom'

export default function MedicineDetail() {
  const { id } = useParams()
  const medicine = getMedicineById(Number(id))
  const { addItem } = useCart()

  if (!medicine) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <EmptyState
          title="Medicine not found"
          description="The medicine you're looking for doesn't exist."
          action={
            <Link to="/" className="text-primary-600 hover:text-primary-700">
              Back to Home
            </Link>
          }
        />
      </div>
    )
  }

  const pharmacyListings = getPharmaciesForMedicine(medicine.id)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link
        to="/search"
        className="text-sm text-primary-600 hover:text-primary-700 transition-colors"
      >
        &larr; Back to Search
      </Link>

      <div className="mt-6 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="md:flex">
          <div className="md:w-80 flex-shrink-0 bg-gray-100">
            <img
              src={medicine.image}
              alt={medicine.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-6 flex-1">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {medicine.name}
                </h1>
                <span className="inline-block mt-1 text-sm font-medium bg-primary-50 text-primary-700 px-3 py-1 rounded-full">
                  {medicine.category}
                </span>
              </div>
              <span className="text-2xl font-bold text-primary-600">
                EGP {medicine.basePrice}
              </span>
            </div>
            <p className="mt-4 text-gray-600">{medicine.description}</p>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Available at {pharmacyListings.filter((p) => p.available).length}{' '}
          pharmacies
        </h2>
        {pharmacyListings.length > 0 ? (
          <div className="space-y-3">
            {pharmacyListings.map((listing) => (
              <div key={listing.pharmacyId} className="flex items-center gap-3">
                <div className="flex-1">
                  <PharmacyCard
                    pharmacy={listing.pharmacy}
                    price={listing.price}
                    quantity={listing.quantity}
                    available={listing.available}
                  />
                </div>
                {listing.available && (
                  <button
                    onClick={() =>
                      addItem({
                        medicineId: medicine.id,
                        pharmacyId: listing.pharmacyId,
                        price: listing.price,
                        medicineName: medicine.name,
                        pharmacyName: listing.pharmacy.name,
                      })
                    }
                    className="bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors whitespace-nowrap"
                  >
                    Add to Cart
                  </button>
                )}
              </div>
            ))}
          </div>
        ) : (
          <EmptyState
            title="No pharmacies found"
            description="This medicine is not currently available at any pharmacy."
          />
        )}
      </div>
    </div>
  )
}
