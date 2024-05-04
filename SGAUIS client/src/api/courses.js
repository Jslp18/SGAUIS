import axios from './axios.js'

export const crearCurso = (data) => axios.post('/escuela/cursos', data)
export const verCursos = (config) => axios.get('/escuela/cursos', config)
export const obtenerCurso = (nombres, config) => axios.get(`/escuela/cursos/${nombres}`, config)
export const eliminarCurso = (idCurso) => axios.delete(`/escuela/cursos/${idCurso}`)
export const actualizarCurso = (idCurso, data) => axios.put(`/escuela/cursos/${idCurso}`, data)

export const inscribirUsuarios = (idCurso, data) => axios.post(`/escuela/cursos/inscribirUsuarios/${idCurso}`, data)
export const desinscribirUsuarios = (idCurso, data) => axios.post(`/escuela/cursos/desinscribirUsuarios/${idCurso}`, data)
