import { useAuth } from '../context/Auth.context'
import { Navigate, Outlet } from 'react-router-dom'

function ProtectedRoute ({children, rol}) {
  const { isAuthenticated, loading } = useAuth()

  if (loading) return <h1> Loading... </h1>
  if (!loading && !isAuthenticated) return <Navigate to='/SGAUIS' replace />
  if(rol) return <Navigate to='/SGAUIS' replace />
  
  return children ? children : <Outlet/> 
}

export default ProtectedRoute
