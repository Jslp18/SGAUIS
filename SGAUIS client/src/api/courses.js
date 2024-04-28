import axios from './axios.js'

export const crearCurso = (data) => axios.post('/cursos', data)
export const verCursos = (config) => axios.get('/cursos', config)
export const obtenerCurso = (nombres, config) => axios.get(`/cursos/${nombres}`, config)
export const eliminarCurso = (idCurso) => axios.delete(`/cursos/${idCurso}`)
export const actualizarCurso = (idCurso, data) => axios.put(`/cursos/${idCurso}`, data)

export const inscribirUsuarios = (idCurso, data) => axios.post(`/cursos/inscribirUsuarios/${idCurso}`, data)
export const desinscribirUsuarios = (idCurso, data) => axios.post(`/cursos/desinscribirUsuarios/${idCurso}`, data)
