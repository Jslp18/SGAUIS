import { createContext, useContext, useState, useEffect } from 'react'
import {
    verCursosEstudiante, verContenidoCurso, verTareasCurso, verForosCurso, subirComentarioForo, verComentariosForo, } from '../api/student'
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

    // Manejo de la petición de guardado de comentario del foro
    const [commentForumData, setCommentForumData] = useState([])

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
            if (Array.isArray(error.response)) {
                return setErrors(error.response)
            }
            setErrors([error.response.data])
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

            getContentCourse,
            setContentCourse,
            setSearchContent,

            getHomeworksCourse,
            setHomeworkCourse,
            setSearchHomework,

            getForumsCourse,
            setForumCourse,
            setSearchForum,
            commentForumUpload,
            getCommentsForum,

            studentCourses,
            commentForumData,

            search,
            searchCommentForum,
            contentCourse,
            searchContent,

            homeworkCourse,
            searchHomework,

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