import axios from './axios.js'

export const verCursosProfesor = (config) => axios.get('/profesor/cursos', config)
export const verEstudiantesCurso = (currentId) => axios.get(`/profesor/cursos/estudiantes/${currentId}`)
