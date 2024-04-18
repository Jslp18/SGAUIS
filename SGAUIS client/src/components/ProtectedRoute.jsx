import { useAuth } from '../context/Auth.context'
import { Navigate, Outlet } from 'react-router-dom'

function ProtectedRoute ({ children, rol }) {
  const { isAuthenticated, loading } = useAuth()
  if (loading) return <h1> Loading... </h1>
  if (!loading && !isAuthenticated) return <Navigate to='/SGAUIS' replace />
  if (rol === false) return <Navigate to='/' replace />

  return children || <Outlet />
}

export default ProtectedRoute
