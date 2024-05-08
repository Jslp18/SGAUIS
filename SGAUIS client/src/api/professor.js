import axios from './axios.js'

export const verCursosProfesor = (config) => axios.get('/profesor/cursos', config)
export const verEstudiantesCurso = (currentId) => axios.get(`/profesor/cursos/estudiantes/${currentId}`)
export const subirContenido = (currentId, data) => axios.post(`/profesor/cursos/subirContenido/${currentId}`, data)
export const verContenidoCurso = (currentId) => axios.get(`/profesor/cursos/contenido/${currentId}`)
