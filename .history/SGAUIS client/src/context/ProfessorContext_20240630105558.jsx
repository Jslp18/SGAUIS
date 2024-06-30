import { createContext, useContext, useState, useEffect } from 'react'
import {
  verCursosProfesor, verEstudiantesCurso, subirContenido, verContenidoCurso, subirTarea, verTareasCurso,
  verTareaParaEditar, eliminarTarea, actualizarTarea, subirCuestionario, verCuestionariosCurso, verCuestionarioParaEditar,
  actualizarCuestionario, eliminarCuestionario, subirForo, verForosCurso, verForoParaEditar, actualizarForo, eliminarForo
} from '../api/professor'
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
  const [searchQuestionnaire, setSearchQuestionnaire] = useState(false)
  const [searchForum, setSearchForum] = useState(false)

  // Mostrar los cursos correspondientes al profesor
  const [professorCourses, setProfessorCourses] = useState([])

  // Mostrar los estudiantes inscritos en el curso
  const [studentsCourse, setStudentsCourse] = useState([])

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

  // Manejo de la petición de guardado de tareas
  const [questionnaireData, setQuestionnaireData] = useState([])

  // Mostrar las tareas del curso
  const [questionnaireCourse, setQuestionnaireCourse] = useState([])

  // Manejo de la petición de guardado de foros
  const [forumData, setForumData] = useState([])

  // Mostrar los foros del curso
  const [forumCourse, setForumCourse] = useState([])

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

  const getHomeworksCourse = async (currentId) => {
    try {
      const response = await verTareasCurso(currentId)
      return response.data
    } catch (error) {
      console.error(error)
    }
  }

  const getHomeworkForEdit = async (currentId) => {
    try {
      const response = await verTareaParaEditar(currentId)
      return response.data
    } catch (error) {
      console.error(error)
    }
  }

  const homeworkUpdate = async (idTarea, formData) => {
    try {
      const cookies = Cookies.get()
      const config = {
        headers: {
          Authorization: `Bearer ${cookies.token}`
        }
      }
      const response = await actualizarTarea(idTarea, formData, config)
      sethomeworkData(response.data)
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

  const deleteHomework = async (currentId) => {
    try {
      const res = await eliminarTarea(currentId)
      return res
    } catch (error) {
      console.error(error)
    }
  }

  const questionnaireUpload = async (idCurso, formData) => {
    try {
      const cookies = Cookies.get()
      const config = {
        headers: {
          Authorization: `Bearer ${cookies.token}`
        }
      }
      const response = await subirCuestionario(idCurso, formData, config)
      setQuestionnaireData(response.data)
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

  const getQuestionnairesCourse = async (currentId) => {
    try {
      const response = await verCuestionariosCurso(currentId)
      return response.data
    } catch (error) {
      console.error(error)
    }
  }

  const getQuestionnaireForEdit = async (currentId) => {
    try {
      const response = await verCuestionarioParaEditar(currentId)
      return response.data
    } catch (error) {
      console.error(error)
    }
  }

  const questionnaireUpdate = async (idCuestionario, formData) => {
    try {
      const cookies = Cookies.get()
      const config = {
        headers: {
          Authorization: `Bearer ${cookies.token}`
        }
      }
      const response = await actualizarCuestionario(idCuestionario, formData, config)
      setQuestionnaireData(response.data)
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

  const deleteQuestionnaire = async (currentId) => {
    try {
      const res = await eliminarCuestionario(currentId)
      return res
    } catch (error) {
      console.error(error)
    }
  }

  const forumUpload = async (idCurso, formData) => {
    try {
      const response = await subirForo(idCurso, formData)
      setForumData(response.data)
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

  const getForumsCourse = async (idCurso) => {
    try {
      const response = await verForosCurso(idCurso)
      return response.data
    } catch (error) {
      console.error(error)
    }
  }

  const getForumForEdit = async (currentId) => {
    try {
      const response = await verForoParaEditar(currentId)
      return response.data
    } catch (error) {
      console.error(error)
    }
  }

  const forumUpdate = async (idForo, formData) => {
    try {
      const cookies = Cookies.get()
      const config = {
        headers: {
          Authorization: `Bearer ${cookies.token}`
        }
      }
      const response = await actualizarForo(idForo, formData, config)
      setForumData(response.data)
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

  const deleteForum = async (idCurso) => {
    try {
      const res = await eliminarForo(idCurso)
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
      setSearchStudents,
      setSelectedFile,

      contentUpload,
      homeworkUpload,
      questionnaireUpload,
      forumUpload,

      getContentCourse,
      setContentCourse,
      setSearchContent,

      getHomeworksCourse,
      getHomeworkForEdit,
      setHomeworkCourse,
      setSearchHomework,
      homeworkUpdate,
      deleteHomework,

      getQuestionnairesCourse,
      getQuestionnaireForEdit,
      setQuestionnaireCourse,
      setSearchQuestionnaire,
      questionnaireUpdate,
      deleteQuestionnaire,

      getForumsCourse,
      getForumForEdit,
      setForumCourse,
      setSearchForum,
      forumUpdate,
      deleteForum,

      professorCourses,
      studentsCourse,
      search,
      searchStudents,
      selectedFile,

      contentData,
      contentCourse,
      searchContent,

      homeworkData,
      homeworkCourse,
      searchHomework,

      questionnaireData,
      questionnaireCourse,
      searchQuestionnaire,

      forumData,
      forumCourse,
      searchForum,
      f,
      showSuccessMessage
    }}
    >
      {children}
    </ProfessorContext.Provider>
  )
}
