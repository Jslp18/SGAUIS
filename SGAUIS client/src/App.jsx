import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/Auth.context'
import LoginPage from './pages/LoginPage'
import SchoolPage from './pages/SchoolPage'
import StudentPage from './pages/StudentPage'
import ProfesorPage from './pages/ProfesorPage'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './pages/Home'
import { CoursesProvider } from './context/CoursesContext'

function App () {
  return (
    <AuthProvider>
      <CoursesProvider>
        <Content />
      </CoursesProvider>
    </AuthProvider>
  )
}

function Content () {
  const { user } = useAuth()
  return (
    <BrowserRouter>
      {user && <Nav />}
      <Routes>
        <Route index element={<LoginPage />} />
        <Route path='/' element={<LoginPage />} />

        <Route element={<ProtectedRoute />}>
          <Route path='/SGAUIS' element={<Home />} />
        </Route>

        <Route
          path='/Escuela' element={
            <ProtectedRoute rol={user?.rol === '661a033c50163523e2fe9446'}>
              <SchoolPage />
            </ProtectedRoute>
          }
        />

        <Route
          path='/Profesor' element={
            <ProtectedRoute rol={user?.rol === '661a033c50163523e2fe9447'}>
              <ProfesorPage />
            </ProtectedRoute>
          }
        />

        <Route
          path='/Estudiante' element={
            <ProtectedRoute rol={user?.rol === '661a033c50163523e2fe9448'}>
              <StudentPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

function Nav () {
  const { logout } = useAuth()
  return (
    <header className='text-gray-900 bg-stone-200 body-font shadow w-full'>
      <div className='flex flex-wrap p-5 flex-row'>
        <div className='w-1/5 flex flex-row items-center space-x-8'>
          <svg xmlns='http://www.w3.org/2000/svg' fill='#918F8F' viewBox='0 0 24 24' strokeWidth='1.5' stroke='currentColor' className='w-10 h-10 text-[#231F20] ml-4'><path strokeLinecap='round' strokeLinejoin='round' d='M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25' /></svg><h1 className='font-semibold text-4xl tracking-widest text-[#231F20]'>SGA UIS</h1>
        </div>
        <nav className='w-2/5 flex flex-row items-center text-base text-stone-900 space-x-8'>
          <Link to='/Estudiante' className='px-4 py-2 mt-2 text-md font-semibold bg-transparent rounded-lg md:mt-0 md:ml-4 hover:text-white focus:text-white hover:bg-stone-400 focus:bg-stone-500 focus:outline-none focus:shadow-outline'>Estudiante</Link>
          <Link to='/Profesor' className='px-4 py-2 mt-2 text-md font-semibold bg-transparent rounded-lg md:mt-0 md:ml-4 hover:text-white focus:text-white hover:bg-stone-400 focus:bg-stone-500 focus:outline-none focus:shadow-outline'>Profesor</Link>
          <Link to='/Escuela' className='px-4 py-2 mt-2 text-md font-semibold bg-transparent rounded-lg md:mt-0 md:ml-4 hover:text-white focus:text-white hover:bg-stone-400 focus:bg-stone-500 focus:outline-none focus:shadow-outline'>Escuela</Link>
        </nav>
        <div className='w-2/5 flex flex-row items-center justify-end'>
          <Link to='/' onClick={() => { logout() }} className='flex justify-center py-2 px-3 border border-transparent rounded-xl shadow-lg text-sm font-medium text-white bg-neutral-700 hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-500'>
            Cerrar Sesión<span className='ml-5' /><svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth='2' stroke='currentColor' className='w-6 h-6'><path strokeLinecap='round' strokeLinejoin='round' d='M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15' /></svg>
          </Link>
        </div>
      </div>
    </header>
  )
}

export default App
