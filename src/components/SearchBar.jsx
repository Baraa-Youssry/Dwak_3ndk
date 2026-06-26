import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function SearchBar({ initialQuery = '', large = false }) {
  const [query, setQuery] = useState(initialQuery)
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for medicines..."
          className={`w-full border border-gray-300 rounded-xl bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent placeholder-gray-400 text-gray-900 ${
            large
              ? 'px-6 py-4 text-lg pr-14'
              : 'px-4 py-2.5 text-sm pr-12'
          }`}
        />
        <button
          type="submit"
          className={`absolute right-2 top-1/2 -translate-y-1/2 bg-primary-600 text-white rounded-lg flex items-center justify-center hover:bg-primary-700 transition-colors ${
            large ? 'p-2.5' : 'p-2'
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={large ? 'h-6 w-6' : 'h-5 w-5'}
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
        </button>
      </div>
    </form>
  )
}
