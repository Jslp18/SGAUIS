import { createContext, useContext, useState, useEffect } from 'react'
import { registrarUsuarios, iniciarSesion, verifyTokenRequest, crearCurso, verCursos } from '../api/auth'
import Cookies from 'js-cookie'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth debe ser usado con AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [errors, setErrors] = useState([])
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const [registerData, setRegisterData] = useState([])
  const [courseData, setCourseData] = useState([])
  const [courses, setCourses] = useState([])

  const signUp = async (data) => {
    try {
      const response = await registrarUsuarios(data)
      setRegisterData(response.data)
      if (response.status === 200) {
        setShowSuccessMessage(true)
      } else { setShowSuccessMessage(false) }
      return response.data
    } catch (error) {
      if (Array.isArray(error.response.data)) {
        return setErrors(error.response.data)
      }
      setErrors([error.response.data.message])
    }
  }
  /* ---------------------------------------cursos--------------------------------------- */
  const coursesCreate = async (data) => {
    try {
      const cookies = Cookies.get()
      const config = {
        headers: {
          Authorization: `Bearer ${cookies.token}`
        }
      }
      const response = await crearCurso(data, config)
      setCourseData(response.data)
      if (response.status === 201) {
        setShowSuccessMessage(true)
      } else { setShowSuccessMessage(false) }
      return response.data
    } catch (error) {
      if (Array.isArray(error.response.data)) {
        return setErrors(error.response.data)
      }
      setErrors([error.response.data.message])
    }
  }

  const viewCourses = async () => {
    try {
      const cookies = Cookies.get()
      const config = {
        headers: {
          Authorization: `Bearer ${cookies.token}`
        }
      }
      const response = await verCursos(config)
      setCourses(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  const signIn = async (user) => {
    try {
      const res = await iniciarSesion(user)
      setUser(res.data)
      setIsAuthenticated(true)
    } catch (error) {
      if (Array.isArray(error.response.data)) {
        return setErrors(error.response.data)
      }
      setErrors([error.response.data.message])
    }
  }

  const logout = () => {
    Cookies.remove('token')
    setIsAuthenticated(false)
    setUser(null)
  }

  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([])
      }, 7000)
      return () => clearTimeout(timer)
    }
  }, [errors])

  useEffect(() => {
    if (showSuccessMessage) {
      const timer2 = setTimeout(() => {
        setShowSuccessMessage(false)
      }, 4000)
      return () => clearTimeout(timer2)
    }
  }, [showSuccessMessage])

  useEffect(() => {
    async function checkLogin () {
      const cookies = Cookies.get()
      if (!cookies.token) {
        setLoading(false)
        setIsAuthenticated(false)
        setUser(null)
        return
      }

      try {
        const res = await verifyTokenRequest(cookies.token)
        if (!res.data) {
          setIsAuthenticated(false)
          setLoading(true)
          return
        }
        setIsAuthenticated(true)
        setUser(res.data)
        setLoading(false)
      } catch (error) {
        setIsAuthenticated(false)
        setUser(null)
        setLoading(false)
      }
    }
    checkLogin()
  }, [])

  return (
    <AuthContext.Provider value={{
      signUp,
      signIn,
      logout,
      coursesCreate,
      viewCourses,
      loading,
      user,
      isAuthenticated,
      errors,
      showSuccessMessage,
      registerData,
      courseData,
      courses
    }}
    >
      {children}
    </AuthContext.Provider>
  )
}
