import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/Auth.context'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import SchoolPage from './pages/SchoolPage'
import ProfesorPage from './pages/ProfesorPage'
import StudentPage from './pages/StudentPage'
import CoursesPage from './pages/CoursesPage'
import CoursesFormPage from './pages/CoursesFormPage'
import ProtectedRoute from './components/ProtectedRoute'

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
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path='/Escuela' element={<SchoolPage />} />
          <Route path='/Profesor' element={<ProfesorPage />} />
          <Route path='/Estudiante' element={<StudentPage />} />
        </Route>
        <Route
          path='/SGAUIS/crearUsuarios' element={
            <ProtectedRoute rol={user?.rol !== '661a033c50163523e2fe9446'}>
              <RegisterPage />
            </ProtectedRoute>
}
        />
        <Route path='/SGAUIS/cursos' element={<CoursesPage />} />
        <Route path='/SGAUIS/crearCurso' element={<CoursesFormPage />} />
        <Route path='/SGAUIS/cursos/:id' element={<CoursesFormPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
