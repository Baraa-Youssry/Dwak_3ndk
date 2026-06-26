import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-white text-lg font-bold mb-3">Dwak 3ndk</h3>
            <p className="text-sm">
              Your Medicine Is Available. Find medicines near you across Cairo's
              pharmacies.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/bundles"
                  className="hover:text-white transition-colors"
                >
                  Bundles
                </Link>
              </li>
              <li>
                <Link
                  to="/search"
                  className="hover:text-white transition-colors"
                >
                  Search Medicines
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-3">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li>Cairo, Egypt</li>
              <li>info@dwak3ndk.com</li>
              <li>+20 100 000 0000</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Dwak 3ndk. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
