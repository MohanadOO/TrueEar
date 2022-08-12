import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function PublicRoute() {
  const { currentUser } = useAuth()
  const location = useLocation()

  return !currentUser ? (
    <Outlet />
  ) : (
    <Navigate to='/store' state={{ from: location }} replace />
  )
}
