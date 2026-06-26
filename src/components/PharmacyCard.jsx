export default function PharmacyCard({ pharmacy, price, quantity, available }) {
  return (
    <div
      className={`bg-white rounded-xl border p-4 flex items-center gap-4 transition-colors ${
        available
          ? 'border-gray-100 hover:border-primary-200'
          : 'border-gray-100 opacity-60'
      }`}
    >
      <div className="w-16 h-16 rounded-lg bg-primary-50 flex items-center justify-center flex-shrink-0 overflow-hidden">
        <img
          src={pharmacy.image}
          alt={pharmacy.name}
          className="w-full h-full object-cover rounded-lg"
        />
      </div>

      <div className="flex-1 min-w-0">
        <h4 className="font-semibold text-gray-900 truncate">
          {pharmacy.name}
        </h4>
        <p className="text-sm text-gray-500">{pharmacy.area}</p>
        <p className="text-xs text-gray-400">{pharmacy.hours}</p>
      </div>

      <div className="text-right flex-shrink-0">
        {available ? (
          <>
            <p className="font-bold text-primary-600">EGP {price}</p>
            <p className="text-xs text-accent-600 font-medium">
              {quantity} in stock
            </p>
          </>
        ) : (
          <p className="text-sm font-medium text-red-500">Out of stock</p>
        )}
      </div>
    </div>
  )
}
