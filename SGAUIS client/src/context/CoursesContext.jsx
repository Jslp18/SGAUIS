import { createContext, useContext, useState, useEffect } from 'react'
import { actualizarCurso, crearCurso, eliminarCurso, obtenerCurso, verCursos } from '../api/courses'
import Cookies from 'js-cookie'

const CoursesContext = createContext()

export const useCourses = () => {
  const context = useContext(CoursesContext)

  if (!context) {
    throw new Error('useCourses debe ser usado con CoursesProvider')
  }

  return context
}

export function CoursesProvider ({ children }) {
  const [courseData, setCourseData] = useState([])
  const [courses, setCourses] = useState([])
  const [errors, setErrors] = useState([])
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)

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

  const getCoursesByName = async (nombres) => {
    try {
      const cookies = Cookies.get()
      const config = {
        headers: {
          Authorization: `Bearer ${cookies.token}`
        }
      }
      const response = await obtenerCurso(nombres, config)
      return response.data
    } catch (error) {
      console.log(error)
    }
  }

  const editCourse = async (idCurso, values) => {
    try {
      const response = await actualizarCurso(idCurso, values)
      setCourseData(response.data)
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

  const deleteCourse = async (idCurso) => {
    try {
      const res = await eliminarCurso(idCurso) 
      return res
    } catch (error) {
      console.log(error)
    }
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

  return (
    <CoursesContext.Provider value={{
      coursesCreate,
      viewCourses,
      getCoursesByName,
      deleteCourse,
      editCourse,
      courseData,
      courses,
      errors,
      showSuccessMessage
    }}
    >
      {children}
    </CoursesContext.Provider>
  )
}