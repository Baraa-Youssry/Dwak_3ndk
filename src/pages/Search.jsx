import { useSearchParams } from 'react-router-dom'
import SearchBar from '../components/SearchBar'
import MedicineCard from '../components/MedicineCard'
import EmptyState from '../components/EmptyState'
import { searchMedicines, getPharmaciesForMedicine } from '../utils/search'
import { Link } from 'react-router-dom'

export default function Search() {
  const [searchParams] = useSearchParams()
  const query = searchParams.get('q') || ''
  const results = searchMedicines(query)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <SearchBar initialQuery={query} />
      </div>

      <div className="mb-6">
        <p className="text-gray-500">
          {query ? (
            <>
              Showing <span className="font-semibold text-gray-900">{results.length}</span>{' '}
              results for "<span className="font-semibold text-gray-900">{query}</span>"
            </>
          ) : (
            'Search for medicines by name, category, or description'
          )}
        </p>
      </div>

      {results.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {results.map((medicine) => {
            const pharmacies = getPharmaciesForMedicine(medicine.id)
            return (
              <MedicineCard
                key={medicine.id}
                medicine={medicine}
                pharmacies={pharmacies}
              />
            )
          })}
        </div>
      ) : query ? (
        <EmptyState
          title="No medicines found"
          description={`We couldn't find any medicines matching "${query}". Try a different search term.`}
          action={
            <Link to="/" className="text-primary-600 hover:text-primary-700">
              Back to Home
            </Link>
          }
        />
      ) : null}
    </div>
  )
}
