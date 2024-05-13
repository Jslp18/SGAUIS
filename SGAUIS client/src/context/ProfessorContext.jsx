import { createContext, useContext, useState, useEffect } from 'react'
import { verCursosProfesor, verEstudiantesCurso, subirContenido, verContenidoCurso, subirTarea, verTareasCurso, eliminarTarea } from '../api/professor'
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
  const [searchContent, setSearchContent] = useState(false)
  const [searchHomework, setSearchHomework] = useState(false)

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

  // Mostrar el contenido del curso
  const [contentCourse, setContentCourse] = useState([])

  // Manejo de la petición de guardado de tareas
  const [homeworkData, sethomeworkData] = useState([])

  // Mostrar las tareas del curso
  const [homeworkCourse, setHomeworkCourse] = useState([])

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

  const getContentCourse = async (currentId) => {
    try {
      const response = await verContenidoCurso(currentId)
      return response.data
    } catch (error) {
      console.error(error)
    }
  }

  const homeworkUpload = async (idCurso, formData) => {
    try {
      const cookies = Cookies.get()
      const config = {
        headers: {
          Authorization: `Bearer ${cookies.token}`
        }
      }
      const response = await subirTarea(idCurso, formData, config)
      sethomeworkData(response.data)
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

  const getHomeworkCourse = async (currentId) => {
    try {
      const response = await verTareasCurso(currentId)
      return response.data
    } catch (error) {
      console.error(error)
    }
  }

  const deleteHomework = async (currentId) => {
    try {
      const res = await eliminarTarea(currentId)
      return res
    } catch (error) {
      console.error(error)
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
      homeworkUpload,
      getContentCourse,
      setContentCourse,
      setSearchContent,
      getHomeworkCourse,
      setHomeworkCourse,
      setSearchHomework,
      deleteHomework,
      professorCourses,
      studentsCourse,
      currentCourse,
      search,
      searchStudents,
      selectedFile,
      contentData,
      homeworkData,
      errors,
      showSuccessMessage,
      contentCourse,
      searchContent,
      homeworkCourse,
      searchHomework
    }}
    >
      {children}
    </ProfessorContext.Provider>
  )
}
