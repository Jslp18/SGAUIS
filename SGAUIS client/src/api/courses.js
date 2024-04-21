import axios from './axios.js'

export const crearCurso = (data) => axios.post('/cursos', data)
export const verCursos = (config) => axios.get('/cursos', config)
export const obtenerCurso = (nombres, config) => axios.get(`/cursos/${nombres}`, config)
