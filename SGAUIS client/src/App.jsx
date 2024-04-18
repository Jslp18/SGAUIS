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

function App() {
  return (
    <AuthProvider>
      <Content />
    </AuthProvider>
  )
}

function Content() {
  const { user } = useAuth()
  console.log(user)
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

function Nav() {
  return (
    <header className='text-gray-900 bg-blue-200 body-font shadow w-full'>
      <div className='container mx-auto flex flex-wrap p-6 flex-col md:flex-row items-center'>
        <nav className='flex lg:w-2/5 flex-wrap items-center text-base md:ml-auto'>
          <Link to='/' className='mr-10 cursor-pointer border-b border-transparent hover:border-blue-900'>Inicio</Link>
          <Link to='/Estudiante' className='mr-10 cursor-pointer border-b border-transparent hover:border-blue-900'>Estudiante</Link>
          <Link to='/Profesor' className='mr-10 cursor-pointer border-b border-transparent hover:border-blue-900'>Profesor</Link>
          <Link to='/Escuela' className='mr-10 cursor-pointer border-b border-transparent hover:border-blue-900'>Escuela</Link>
        </nav>
        <div className='lg:w-2/5 inline-flex lg:justify-end ml-5 lg:ml-0'>
          <Link to='' className='flex justify-center py-2 px-3 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'>
            Cerrar Sesión<span className='ml-4'></span><svg
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'>
              <path
                d='M8.51428 20H4.51428C3.40971 20 2.51428 19.1046 2.51428 18V6C2.51428 4.89543 3.40971 4 4.51428 4H8.51428V6H4.51428V18H8.51428V20Z'
                fill='currentColor'
              />
              <path
                d='M13.8418 17.385L15.262 15.9768L11.3428 12.0242L20.4857 12.0242C21.038 12.0242 21.4857 11.5765 21.4857 11.0242C21.4857 10.4719 21.038 10.0242 20.4857 10.0242L11.3236 10.0242L15.304 6.0774L13.8958 4.6572L7.5049 10.9941L13.8418 17.385Z'
                fill='currentColor'
              />
            </svg>
          </Link>
        </div>
      </div>
    </header>
  )
}

export default App
