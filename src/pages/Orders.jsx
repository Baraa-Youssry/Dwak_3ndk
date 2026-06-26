import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import EmptyState from '../components/EmptyState'

export default function Orders() {
  const { user } = useAuth()
  const orders = JSON.parse(localStorage.getItem('dwak_orders') || '[]')
  const userOrders = orders.filter((o) => o.userId === user?.id)

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">My Orders</h1>

      {userOrders.length > 0 ? (
        <div className="space-y-4">
          {userOrders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-xl border border-gray-100 p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="font-semibold text-gray-900">
                    Order #{order.id}
                  </p>
                  <p className="text-sm text-gray-500">
                    {new Date(order.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-primary-600">
                    EGP {order.totalPrice}
                  </p>
                  <span className="inline-block mt-1 text-xs font-medium bg-yellow-50 text-yellow-700 px-2 py-0.5 rounded-full">
                    {order.status}
                  </span>
                </div>
              </div>
              <div className="border-t border-gray-100 pt-3">
                {order.items.map((item, i) => (
                  <div
                    key={i}
                    className="flex justify-between text-sm text-gray-600 py-1"
                  >
                    <span>{item.medicineName}</span>
                    <span>x{item.quantity}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <EmptyState
          title="No orders yet"
          description="Your order history will appear here once you place an order."
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
