import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { getInventoryForPharmacy } from '../utils/search'

export default function PharmacyDashboard() {
  const { user } = useAuth()
  const pharmacyId = user?.pharmacyId || 1
  const [inventory, setInventory] = useState([])
  const [orders, setOrders] = useState([])

  useEffect(() => {
    setInventory(getInventoryForPharmacy(pharmacyId))
    const allOrders = JSON.parse(localStorage.getItem('dwak_orders') || '[]')
    setOrders(allOrders)
  }, [pharmacyId])

  const toggleAvailability = (invId) => {
    setInventory((prev) =>
      prev.map((item) =>
        item.id === invId ? { ...item, available: !item.available } : item
      )
    )
  }

  const pharmacyOrders = orders.filter((order) =>
    order.items.some((item) => item.pharmacyId === pharmacyId)
  )

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">
        Pharmacy Dashboard
      </h1>
      <p className="text-gray-500 mb-8">
        Manage your inventory and view incoming orders
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white rounded-xl border border-gray-100 p-6">
          <p className="text-sm text-gray-500">Total Products</p>
          <p className="text-3xl font-bold text-primary-600 mt-1">
            {inventory.length}
          </p>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-6">
          <p className="text-sm text-gray-500">In Stock</p>
          <p className="text-3xl font-bold text-accent-600 mt-1">
            {inventory.filter((i) => i.available).length}
          </p>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-6">
          <p className="text-sm text-gray-500">Pending Orders</p>
          <p className="text-3xl font-bold text-yellow-600 mt-1">
            {pharmacyOrders.filter((o) => o.status === 'pending').length}
          </p>
        </div>
      </div>

      <h2 className="text-xl font-bold text-gray-900 mb-4">
        Inventory Management
      </h2>
      {inventory.length > 0 ? (
        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Medicine
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Price (EGP)
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Stock
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {inventory.map((item) => (
                  <tr key={item.id}>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0">
                          <img
                            src={item.medicine.image}
                            alt={item.medicine.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">
                            {item.medicine.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {item.medicine.category}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-900">{item.price}</td>
                    <td className="px-6 py-4 text-gray-900">{item.quantity}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-block text-xs font-medium px-2 py-0.5 rounded-full ${
                          item.available
                            ? 'bg-green-50 text-green-700'
                            : 'bg-red-50 text-red-700'
                        }`}
                      >
                        {item.available ? 'Available' : 'Out of Stock'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => toggleAvailability(item.id)}
                        className={`text-sm font-medium px-3 py-1 rounded-lg transition-colors ${
                          item.available
                            ? 'text-red-600 hover:bg-red-50'
                            : 'text-green-600 hover:bg-green-50'
                        }`}
                      >
                        {item.available ? 'Disable' : 'Enable'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-100 p-8 text-center text-gray-500">
          No inventory items yet.
        </div>
      )}

      <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
        Recent Orders
      </h2>
      {pharmacyOrders.length > 0 ? (
        <div className="space-y-3">
          {pharmacyOrders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-xl border border-gray-100 p-4"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-gray-900">
                    Order #{order.id}
                  </p>
                  <p className="text-sm text-gray-500">
                    {new Date(order.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-primary-600">
                    EGP {order.totalPrice}
                  </p>
                  <span className="text-xs font-medium bg-yellow-50 text-yellow-700 px-2 py-0.5 rounded-full">
                    {order.status}
                  </span>
                </div>
              </div>
              <div className="mt-2 border-t border-gray-100 pt-2">
                {order.items
                  .filter((item) => item.pharmacyId === pharmacyId)
                  .map((item, i) => (
                    <p key={i} className="text-sm text-gray-600">
                      {item.medicineName} x{item.quantity}
                    </p>
                  ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-100 p-8 text-center text-gray-500">
          No orders yet.
        </div>
      )}
    </div>
  )
}
