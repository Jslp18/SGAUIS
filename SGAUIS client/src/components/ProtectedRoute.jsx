import { useAuth } from '../context/AuthContext'
import { Navigate, Outlet } from 'react-router-dom'
import SGAUIS8 from '../resources/SGA UIS 8.png'

function NoPermissionPage() {
  return (
    <div className='text-gray-900 bg-slate-100 body-font shadow w-full overflow-y-auto'>
      <div className='flex flex-col items-center justify-center w-full h-[calc(100vh-9vh)]'>
      <img className='place-self-center opacity-85 w-[30%]' src={SGAUIS8} alt='SGA UIS: Sistema de Gestión de Aprendizaje Universidad Industrial de Santander.' />
        <div className='m-10 w-[50%]'>
          <h1 className='font-bold text-5xl coinstracking-widest text-[#231F20] text-opacity-85 text-center'>Lo sentimos, no tienes permisos para acceder a esta página</h1>
        </div>
      </div>
    </div>
  )
}

function ProtectedRoute({ children, rol, redirectTo = '/' }) {
  const { isAuthenticated, loading } = useAuth()
  if (loading) return <h1> Loading... </h1>
  if (!loading && !isAuthenticated) return <Navigate to='/SGAUIS' replace />
  if (rol === false) return <NoPermissionPage />
  return children || <Outlet />
}

export default ProtectedRoute
