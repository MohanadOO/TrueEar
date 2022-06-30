import { useContext, useState, createContext } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'

const AuthContext = createContext<any>(null)

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }: any) {
  const [currentUser, setCurrentUser] = useLocalStorage<any>('user', null)
  const [loading, setLoading] = useState(false)

  function signUp(username: string, email: string, password: string) {
    return { username, email, password }
  }

  function login(identifier: string, password: string) {
    return { identifier, password, provider: 'local' }
  }

  function logOut() {
    setCurrentUser(null)
    localStorage.removeItem('token')
  }


  const value = {
    currentUser,
    setCurrentUser,
    signUp,
    login,
    logOut,
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
