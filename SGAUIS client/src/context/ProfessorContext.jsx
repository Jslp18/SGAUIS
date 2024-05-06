import { createContext, useContext, useState } from 'react'
import { verCursosProfesor, verEstudiantesCurso } from '../api/professor'
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

  return (
    <ProfessorContext.Provider value={{
      viewProfessorCourses,
      getStudentsCourse,
      setStudentsCourse,
      setCurrentCourse,
      setSearchStudents,
      setSelectedFile,
      professorCourses,
      studentsCourse,
      currentCourse,
      search,
      searchStudents,
      selectedFile
    }}
    >
      {children}
    </ProfessorContext.Provider>
  )
}
