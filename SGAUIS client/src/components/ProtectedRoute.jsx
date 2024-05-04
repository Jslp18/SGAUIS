import { useAuth } from '../context/AuthContext'
import { Navigate, Outlet } from 'react-router-dom'

function ProtectedRoute({ children, rol, redirectTo = '/' }) {
  const { isAuthenticated, loading } = useAuth()
  if (loading) return <h1> Loading... </h1>
  if (!loading && !isAuthenticated) return <Navigate to='/SGAUIS' replace />
  if (rol === false) return <Navigate to={redirectTo} />
  return children || <Outlet />
}

export default ProtectedRoute
