import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import CartItem from '../components/CartItem'
import EmptyState from '../components/EmptyState'
import medicines from '../data/medicines'
import pharmacies from '../data/pharmacies'
import { useState } from 'react'

export default function Cart() {
  const { items, totalPrice, totalItems, clearCart } = useCart()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [orderPlaced, setOrderPlaced] = useState(false)

  const handlePlaceOrder = () => {
    if (!user) {
      navigate('/login')
      return
    }

    const orders = JSON.parse(localStorage.getItem('dwak_orders') || '[]')
    orders.push({
      id: orders.length + 1,
      items: [...items],
      totalPrice,
      status: 'pending',
      date: new Date().toISOString(),
      userId: user.id,
    })
    localStorage.setItem('dwak_orders', JSON.stringify(orders))
    clearCart()
    setOrderPlaced(true)
  }

  if (orderPlaced) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <EmptyState
          title="Order Placed!"
          description="Your order has been placed successfully. You can track it from your orders page."
          action={
            <Link
              to="/orders"
              className="bg-primary-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors"
            >
              View My Orders
            </Link>
          }
        />
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Shopping Cart</h1>

      {items.length > 0 ? (
        <>
          <div className="space-y-3 mb-6">
            {items.map((item) => {
              const medicine = medicines.find((m) => m.id === item.medicineId)
              const pharmacy = pharmacies.find((p) => p.id === item.pharmacyId)
              return (
                <CartItem
                  key={`${item.medicineId}-${item.pharmacyId}`}
                  item={item}
                  medicine={medicine || {}}
                  pharmacy={pharmacy || {}}
                />
              )
            })}
          </div>

          <div className="bg-white rounded-xl border border-gray-100 p-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-500">
                {totalItems} {totalItems === 1 ? 'item' : 'items'}
              </span>
              <span className="text-lg font-bold text-gray-900">
                Total: EGP {totalPrice}
              </span>
            </div>
            <button
              onClick={handlePlaceOrder}
              className="w-full bg-primary-600 text-white py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors mt-4"
            >
              Place Order
            </button>
          </div>
        </>
      ) : (
        <EmptyState
          title="Your cart is empty"
          description="Search for medicines and add them to your cart."
          action={
            <Link
              to="/search"
              className="bg-primary-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors"
            >
              Browse Medicines
            </Link>
          }
        />
      )}
    </div>
  )
}
