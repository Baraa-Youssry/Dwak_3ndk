import { useCart } from '../context/CartContext'

export default function CartItem({ item, medicine, pharmacy }) {
  const { updateQuantity, removeItem } = useCart()

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-4 flex items-center gap-4">
      <div className="w-16 h-16 rounded-lg bg-gray-100 flex-shrink-0 overflow-hidden">
        <img
          src={medicine.image}
          alt={medicine.name}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-gray-900 truncate">{medicine.name}</h4>
        <p className="text-sm text-gray-500">{pharmacy.name}</p>
        <p className="text-sm font-semibold text-primary-600">
          EGP {item.price}
        </p>
      </div>

      <div className="flex items-center gap-2 flex-shrink-0">
        <button
          onClick={() =>
            updateQuantity(
              item.medicineId,
              item.pharmacyId,
              Math.max(1, item.quantity - 1)
            )
          }
          className="w-8 h-8 rounded-lg border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors"
        >
          -
        </button>
        <span className="w-8 text-center font-medium">{item.quantity}</span>
        <button
          onClick={() =>
            updateQuantity(
              item.medicineId,
              item.pharmacyId,
              item.quantity + 1
            )
          }
          className="w-8 h-8 rounded-lg border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors"
        >
          +
        </button>
      </div>

      <button
        onClick={() => removeItem(item.medicineId, item.pharmacyId)}
        className="text-red-400 hover:text-red-600 transition-colors flex-shrink-0"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
      </button>
    </div>
  )
}
