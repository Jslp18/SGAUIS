import { createContext, useContext, useState, useEffect } from 'react'
import { verCursosProfesor, verEstudiantesCurso, subirContenido } from '../api/professor'
import Cookies from 'js-cookie'

const ProfessorContext = createContext()

export const useProfessor = () => {
  const context = useContext(ProfessorContext)

  if (!context) {
    throw new Error('useProfessor debe ser usado con ProfessorProvider')
  }

  return context
}

export function ProfessorProvider({ children }) {

  const [search, setSearch] = useState(false)
  const [searchStudents, setSearchStudents] = useState(false)

  // Mostrar los cursos correspondientes al profesor
  const [professorCourses, setProfessorCourses] = useState([])

  // Mostrar los estudiantes inscritos en el curso
  const [studentsCourse, setStudentsCourse] = useState([])

  // Mostrar el curso actual elegido
  const [currentCourse, setCurrentCourse] = useState(null)

  // Manejo de la subida de archivo
  const [selectedFile, setSelectedFile] = useState(null)

  // Manejo de la petición de guardado de contenido
  const [contentData, setContentData] = useState([])
  const [errors, setErrors] = useState([])
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)

  const viewProfessorCourses = async () => {
    try {
      const cookies = Cookies.get()
      const config = {
        headers: {
          Authorization: `Bearer ${cookies.token}`
        }
      }
      const response = await verCursosProfesor(config)
      setProfessorCourses(response.data)
      setSearch(true)
    } catch (error) {
      console.error(error)
    }
  }

  const getStudentsCourse = async (currentId) => {
    try {
      const response = await verEstudiantesCurso(currentId)
      return response.data
    } catch (error) {
      console.error(error)
    }
  }

  const contentUpload = async (idCurso, values) => {
    try {
      const cookies = Cookies.get()
      const config = {
        headers: {
          Authorization: `Bearer ${cookies.token}`
        }
      }
      const response = await subirContenido(idCurso, values, config)
      setContentData(response.data)
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
      }, 3000)
      return () => clearTimeout(timer2)
    }
  }, [showSuccessMessage])

  return (
    <ProfessorContext.Provider value={{
      viewProfessorCourses,
      getStudentsCourse,
      setStudentsCourse,
      setCurrentCourse,
      setSearchStudents,
      setSelectedFile,
      contentUpload,
      professorCourses,
      studentsCourse,
      currentCourse,
      search,
      searchStudents,
      selectedFile,
      contentData,
      errors,
      showSuccessMessage
    }}
    >
      {children}
    </ProfessorContext.Provider>
  )
}
