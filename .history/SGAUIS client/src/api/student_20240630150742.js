import axios from './axios.js'

export const verCursosEstudiante = (config) => axios.get('/estudiante/cursos', config)
export const verContenidoCurso = (currentId) => axios.get(`/estudiante/cursos/contenido/${currentId}`)
// Tareas
export const entregarTarea = (homeworkId, formData, config) => axios.post(`/estudiante/cursos/tareas/entregarTarea/${homeworkId}`, formData, config)
export const verTareasCurso = (currentId) => axios.get(`/estudiante/cursos/tareas/${currentId}`)
export const verTareaEntregada = (homeworkId) => axios.get(`/estudiante/cursos/tarea/${homeworkId}`)
// Foros
// export const subirForo = (currentId, formData) => axios.post(`/profesor/cursos/foros/subirForo/${currentId}`, formData)
export const verForosCurso = (currentId) => axios.get(`/estudiante/cursos/foros/${currentId}`)
export const subirComentarioForo = (idForo, formData, config) => axios.post(`/estudiante/cursos/foros/${idForo}`, formData, config)
export const verComentariosForo = (idForo) => axios.get(`/estudiante/cursos/foro/${idForo}`)