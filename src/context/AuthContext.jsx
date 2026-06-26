import { createContext, useContext, useState } from 'react'
import users from '../data/users'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem('dwak_user')
      return stored ? JSON.parse(stored) : null
    } catch {
      return null
    }
  })

  const login = (email, password) => {
    const found = users.find(
      (u) => u.email === email && u.password === password
    )
    if (found) {
      const { password: _, ...safeUser } = found
      setUser(safeUser)
      localStorage.setItem('dwak_user', JSON.stringify(safeUser))
      return { success: true }
    }
    return { success: false, message: 'Invalid email or password' }
  }

  const register = (name, email, password) => {
    const exists = users.find((u) => u.email === email)
    if (exists) {
      return { success: false, message: 'Email already registered' }
    }
    const newUser = {
      id: users.length + 1,
      name,
      email,
      password,
      role: 'user',
    }
    users.push(newUser)
    const { password: _, ...safeUser } = newUser
    setUser(safeUser)
    localStorage.setItem('dwak_user', JSON.stringify(safeUser))
    return { success: true }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('dwak_user')
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
