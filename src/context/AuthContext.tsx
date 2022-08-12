import { useLazyQuery } from '@apollo/client'
import { USER_INFO } from '../Graphql/LoginQueries'
import { useContext, createContext, useEffect } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'

const AuthContext = createContext<any>(null)

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }: any) {
  const [currentUser, setCurrentUser] = useLocalStorage<any>('user', null)
  const [getUserInfo, { data }] = useLazyQuery(USER_INFO)

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

  async function resetPassword(email: string) {
    try {
      const res = await fetch(
        'http://localhost:1330/api/auth/forgot-password',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        }
      )
      return console.log(res)
    } catch (error) {
      return console.error(error)
    }
  }

  function updateProfile(email: string) {
    return ''
  }

  useEffect(() => {
    if (!data || !currentUser) {
      getUserInfo({ variables: { id: currentUser?.id } })
        .then((userInfo) => {
          if (userInfo.data?.usersPermissionsUser) {
            const { id, attributes } = userInfo.data.usersPermissionsUser.data
            const { avatar, confirmed, email, username } = attributes
            setCurrentUser({ id, avatar, confirmed, email, username })
          }
        })
        .catch((error) => {
          console.error(error)
          setCurrentUser(null)
        })
    }
  }, [data, currentUser])

  const value = {
    currentUser,
    setCurrentUser,
    signUp,
    login,
    logOut,
    resetPassword,
    updateProfile,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
