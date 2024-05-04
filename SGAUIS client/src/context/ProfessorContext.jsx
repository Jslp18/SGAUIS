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

  // Mostrar los cursos correspondientes al profesor
  const [professorCourses, setProfessorCourses] = useState([])

  // Mostrar los estudiantes inscritos en el curso
  const [studentsCourse, setStudentsCourse] = useState([])

  // Mostrar el curso actual elegido
  const [currentCourse, setCurrentCourse] = useState(null)

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
    } catch (error) {
      console.error(error)
    }
  }

  const getStudentsCourse = async (currentId) => {
    try {
      const response = await verEstudiantesCurso(currentId)
      setStudentsCourse(response.data)
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
      professorCourses,
      studentsCourse,
      currentCourse
    }}
    >
      {children}
    </ProfessorContext.Provider>
  )
}
