import { useAuth } from '../context/Auth.context'
import { Navigate, Outlet } from 'react-router-dom'

function ProtectedRoute () {
  const { isAuthenticated, loading } = useAuth()
  console.log(loading, isAuthenticated)

  if (loading) return <h1> Loading... </h1>
  if (!loading && !isAuthenticated) return <Navigate to='/SGAUIS' replace />

  return (
    <Outlet />
  )
}

export default ProtectedRoute
