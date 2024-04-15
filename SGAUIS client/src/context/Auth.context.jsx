import { createContext, useContext, useState, useEffect } from 'react'
import { registrarUsuarios, iniciarSesion } from '../api/auth'

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

  const signUp = async (user) => {
    const res = await registrarUsuarios(user)
    console.log(res.data)
    setUser(res.data)
  }

  const signIn = async (user) => {
    console.log(user)
    try {
      const res = await iniciarSesion(user)
      console.log(res)
    } catch (error) {
      console.log(error)
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

  return (
    <AuthContext.Provider value={{ signUp, signIn, user, errors }}>
      {children}
    </AuthContext.Provider>
  )
}
