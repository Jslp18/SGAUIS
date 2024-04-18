import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/Auth.context'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import SchoolPage from './pages/SchoolPage'
import StudentPage from './pages/StudentPage'
import ProfesorPage from './pages/ProfesorPage'
import CoursesPage from './pages/CoursesPage'
import CoursesFormPage from './pages/CoursesFormPage'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './pages/Home'

function App () {
  return (
    <AuthProvider>
      <Content />
    </AuthProvider>
  )
}

function Content () {
  const { user } = useAuth()
  return (
    <BrowserRouter>
      {user && <Nav />}
      <Routes>
        <Route path='/SGAUIS' element={<LoginPage />} />

        <Route element={<ProtectedRoute />}>
          <Route path='/' element={<Home />} />
        </Route>

        <Route
          path='/Escuela' element={
            <ProtectedRoute rol={user?.rol === '661a033c50163523e2fe9446'}>
              <SchoolPage />
            </ProtectedRoute>
          }
        />
        <Route
          path='/Escuela/crearUsuarios' element={
            <ProtectedRoute rol={user?.rol === '661a033c50163523e2fe9446'}>
              <RegisterPage />
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

        <Route path='/cursos' element={<CoursesPage />} />
        <Route path='/crearCurso' element={<CoursesFormPage />} />
        <Route path='/cursos/:id' element={<CoursesFormPage />} />
      </Routes>
    </BrowserRouter>
  )
}

function Nav () {
  return (
    <header className='text-gray-900 bg-blue-200 body-font shadow w-full'>
      <div className='container mx-auto flex flex-wrap p-6 flex-col md:flex-row items-center'>
        <nav className='flex lg:w-2/5 flex-wrap items-center text-base md:ml-auto'>
          <Link to='/Estudiante' className='mr-10 cursor-pointer border-b border-transparent hover:border-blue-900'>Estudiante</Link>
          <Link to='/Profesor' className='mr-10 cursor-pointer border-b border-transparent hover:border-blue-900'>Profesor</Link>
          <Link to='/Escuela' className='mr-10 cursor-pointer border-b border-transparent hover:border-blue-900'>Escuela</Link>
        </nav>
        <div className='lg:w-2/5 flex flex-row items center lg:justify-end ml-5 lg:ml-0'>
          <Link to='' className='flex justify-center py-2 px-3 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#506077] hover:bg-[#2E3744] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'>
            Cerrar Sesión<span className='ml-5' /><svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth='2' stroke='currentColor' className='w-6 h-6'><path strokeLinecap='round' strokeLinejoin='round' d='M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15' /></svg>
          </Link>
        </div>
      </div>
    </header>
  )
}

export default App
