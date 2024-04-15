import { createContext, useContext, useState, useEffect } from 'react'
import { registrarUsuarios, iniciarSesion, verifyTokenRequest } from '../api/auth'
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

  const signUp = async (user) => {
    const res = await registrarUsuarios(user)
    setUser(res.data)
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

  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([])
      }, 6500)
      return () => clearTimeout(timer)
    }
  }, [errors])

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
    <AuthContext.Provider value={{ signUp, signIn, loading, user, isAuthenticated, errors }}>
      {children}
    </AuthContext.Provider>
  )
}
