import { BrowserRouter, Routes, Route } from 'react-router-dom'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import { AuthProvider } from './context/Auth.context'

function App () {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/SGAUIS' element={<h1>Home page</h1>} />
          <Route path='/' element={<LoginPage />} />
          <Route path='/SGAUIS/crearUsuarios' element={<RegisterPage />} />
          <Route path='/SGAUIS/cursos' element={<h1>Courses page</h1>} />
          <Route path='/SGAUIS/cursos/:id' element={<h1>Update course</h1>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
