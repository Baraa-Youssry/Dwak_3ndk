import { createContext, useContext, useReducer, useEffect } from 'react'

const CartContext = createContext(null)

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.items.find(
        (item) => item.medicineId === action.payload.medicineId && item.pharmacyId === action.payload.pharmacyId
      )
      if (existing) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.medicineId === action.payload.medicineId && item.pharmacyId === action.payload.pharmacyId
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        }
      }
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }],
      }
    }
    case 'ADD_BUNDLE_ITEMS':
      return {
        ...state,
        items: [
          ...state.items,
          ...action.payload.map((item) => ({ ...item, quantity: 1 })),
        ],
      }
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(
          (item) => !(item.medicineId === action.payload.medicineId && item.pharmacyId === action.payload.pharmacyId)
        ),
      }
    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items.map((item) =>
          item.medicineId === action.payload.medicineId && item.pharmacyId === action.payload.pharmacyId
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      }
    case 'CLEAR_CART':
      return { ...state, items: [] }
    default:
      return state
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] }, () => {
    try {
      const stored = localStorage.getItem('dwak_cart')
      return stored ? JSON.parse(stored) : { items: [] }
    } catch {
      return { items: [] }
    }
  })

  useEffect(() => {
    localStorage.setItem('dwak_cart', JSON.stringify(state))
  }, [state])

  const addItem = (item) => dispatch({ type: 'ADD_ITEM', payload: item })
  const addBundleItems = (items) => dispatch({ type: 'ADD_BUNDLE_ITEMS', payload: items })
  const removeItem = (medicineId, pharmacyId) =>
    dispatch({ type: 'REMOVE_ITEM', payload: { medicineId, pharmacyId } })
  const updateQuantity = (medicineId, pharmacyId, quantity) =>
    dispatch({ type: 'UPDATE_QUANTITY', payload: { medicineId, pharmacyId, quantity } })
  const clearCart = () => dispatch({ type: 'CLEAR_CART' })

  const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        addItem,
        addBundleItems,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
