import axios from './axios.js'

export const verCursosProfesor = (config) => axios.get('/profesor/cursos', config)
export const verEstudiantesCurso = (currentId) => axios.get(`/profesor/cursos/estudiantes/${currentId}`)
export const subirContenido = (currentId, values) => axios.post(`/profesor/cursos/subirContenido/${currentId}`, values)
export const verContenidoCurso = (currentId) => axios.get(`/profesor/cursos/contenido/${currentId}`)
export const subirTarea = (currentId, formData, config) => axios.post(`/profesor/cursos/subirTarea/${currentId}`, formData, config)
export const verTareasCurso = (currentId) => axios.get(`/profesor/cursos/tareas/${currentId}`)
export const verTareaParaEditar = (currentId) => axios.get(`/profesor/cursos/tarea/${currentId}`)
export const actualizarTarea = (idTarea, formData, config) => axios.post(`/profesor/cursos/actualizarTarea/${idTarea}`, formData, config)
export const eliminarTarea = (currentId) => axios.delete(`/profesor/cursos/tareas/${currentId}`)
