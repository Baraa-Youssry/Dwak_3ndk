import { Link } from 'react-router-dom'
import SearchBar from '../components/SearchBar'
import BundleCard from '../components/BundleCard'
import MedicineCard from '../components/MedicineCard'
import bundles from '../data/bundles'
import { searchMedicines, getPharmaciesForMedicine } from '../utils/search'

export default function Home() {
  const featuredBundles = bundles.slice(0, 4)
  const popularMedicines = searchMedicines('').slice(0, 4)

  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Your Medicine Is{' '}
              <span className="text-accent-300">Available</span>
            </h1>
            <p className="mt-4 text-lg text-primary-100">
              Search for medicines across Cairo's pharmacies. Find availability,
              compare prices, and order with ease.
            </p>
            <div className="mt-8">
              <SearchBar large />
            </div>
            <div className="mt-4 flex flex-wrap gap-2 text-sm">
              <span className="text-primary-200">Popular:</span>
              {['Panadol', 'Insulin', 'Augmentin', 'Ventolin'].map((name) => (
                <Link
                  key={name}
                  to={`/search?q=${encodeURIComponent(name)}`}
                  className="bg-white/10 hover:bg-white/20 px-3 py-1 rounded-full transition-colors"
                >
                  {name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Chronic Disease Bundles
            </h2>
            <p className="mt-1 text-gray-500">
              Pre-packaged medicine bundles for common conditions
            </p>
          </div>
          <Link
            to="/bundles"
            className="text-primary-600 hover:text-primary-700 font-medium text-sm transition-colors"
          >
            View All &rarr;
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredBundles.map((bundle) => (
            <BundleCard key={bundle.id} bundle={bundle} />
          ))}
        </div>
      </section>

      <section className="bg-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Popular Medicines
              </h2>
              <p className="mt-1 text-gray-500">
                Most searched medicines on our platform
              </p>
            </div>
            <Link
              to="/search"
              className="text-primary-600 hover:text-primary-700 font-medium text-sm transition-colors"
            >
              Browse All &rarr;
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularMedicines.map((medicine) => {
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
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6">
            <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-primary-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Easy Search</h3>
            <p className="text-sm text-gray-500">
              Find any medicine across Cairo's pharmacies instantly
            </p>
          </div>

          <div className="text-center p-6">
            <div className="w-12 h-12 bg-accent-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-accent-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Best Prices</h3>
            <p className="text-sm text-gray-500">
              Compare prices and choose the best deal near you
            </p>
          </div>

          <div className="text-center p-6">
            <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-primary-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Quick Bundles</h3>
            <p className="text-sm text-gray-500">
              Pre-made bundles for chronic disease management
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
