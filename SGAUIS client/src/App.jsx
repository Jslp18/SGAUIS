import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/Auth.context'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import CoursesPage from './pages/CoursesPage'
import CoursesFormPage from './pages/CoursesFormPage'
import ProtectedRoute from './components/ProtectedRoute'

function App () {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/SGAUIS' element={<LoginPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path='/SGAUIS/home' element={<HomePage />} />
            <Route path='/SGAUIS/crearUsuarios' element={<RegisterPage />} />
            <Route path='/SGAUIS/cursos' element={<CoursesPage />} />
            <Route path='/SGAUIS/crearCurso' element={<CoursesFormPage />} />
            <Route path='/SGAUIS/cursos/:id' element={<CoursesFormPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
