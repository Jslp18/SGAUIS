import { createContext, useContext, useState, useEffect } from 'react'
import {
    verCursosEstudiante, verContenidoCurso, verTareasCurso, entregarTarea, verForosCurso, subirComentarioForo, verComentariosForo,
} from '../api/student'
import Cookies from 'js-cookie'

const StudentContext = createContext()

export const useStudent = () => {
    const context = useContext(StudentContext)

    if (!context) {
        throw new Error('useStudent debe ser usado con StudentProvider')
    }
    return context
}

export function StudentProvider({ children }) {

    const [search, setSearch] = useState(false)
    const [searchContent, setSearchContent] = useState(false)
    const [searchHomework, setSearchHomework] = useState(false)
    const [searchForum, setSearchForum] = useState(false)
    const [searchCommentForum, setSearchCommentForum] = useState(false)
    const [searchHomeworkSubmission, setSearchHomeworkSubmission] = useState(false)

    // Lógica de errores y mensaje de respuesta
    const [errors, setErrors] = useState([])
    const [showSuccessMessage, setShowSuccessMessage] = useState(false)

    // Mostrar el contenido del curso
    const [contentCourse, setContentCourse] = useState([])

    // Mostrar las tareas del curso
    const [homeworkCourse, setHomeworkCourse] = useState([])

    // Mostrar los cursos correspondientes al estudiante
    const [studentCourses, setStudentsCourses] = useState([])

    // Mostrar los foros del curso
    const [forumCourse, setForumCourse] = useState([])

    // Arreglo para guardar los comentarios del foro
    const [commentForumData, setCommentForumData] = useState([])

    // Variable para guardar la calificación de la tarea
    const [homeworkSubmissionData, setHomeworkSubmissionData] = useState([])

    // Manejo de la subida de archivo de entrega de tarea
    const [selectedFile, setSelectedFile] = useState(null)


    const viewStudentsCourses = async () => {
        try {
            const cookies = Cookies.get()
            const config = {
                headers: {
                    Authorization: `Bearer ${cookies.token}`
                }
            }
            const response = await verCursosEstudiante(config)
            setStudentsCourses(response.data)
            setSearch(true)
        } catch (error) {
            console.error(error)
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

    const getHomeworksCourse = async (currentId) => {
        try {
            const response = await verTareasCurso(currentId)
            return response.data
        } catch (error) {
            console.error(error)
        }
    }

    const homeworkSubmission = async (idTarea, formData) => {
        try {
            const cookies = Cookies.get()
            const config = {
                headers: {
                    Authorization: `Bearer ${cookies.token}`
                }
            }
            const response = await entregarTarea(idTarea, formData, config)
            setHomeworkSubmissionData(response.data)
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

    const commentForumUpload = async (idForo, formData) => {
        try {
            const cookies = Cookies.get()
            const config = {
                headers: {
                    Authorization: `Bearer ${cookies.token}`
                }
            }
            const response = await subirComentarioForo(idForo, formData, config)
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

    const getCommentsForum = async (idForum) => {
        try {
            const cookies = Cookies.get()
            const config = {
                headers: {
                    Authorization: `Bearer ${cookies.token}`
                }
            }
            const response = await verComentariosForo(idForum, config)
            setCommentForumData(response.data)
            setSearchCommentForum(true)
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
        <StudentContext.Provider value={{
            viewStudentsCourses,
            setSelectedFile,

            getContentCourse,
            setContentCourse,
            setSearchContent,

            getHomeworksCourse,
            setHomeworkCourse,
            setSearchHomework,
            setSearchHomeworkSubmission,
            setHomeworkSubmissionData,
            homeworkSubmission,

            getForumsCourse,
            setForumCourse,
            setSearchForum,
            commentForumUpload,
            getCommentsForum,
            setCommentForumData,
            setSearchCommentForum,

            studentCourses,
            commentForumData,

            search,
            searchCommentForum,
            contentCourse,
            searchContent,
            selectedFile,

            homeworkCourse,
            searchHomework,
            searchHomeworkSubmission,
            homeworkSubmissionData,

            forumCourse,
            searchForum,
            errors,
            showSuccessMessage
        }}
        >
            {children}
        </StudentContext.Provider>
    )
}