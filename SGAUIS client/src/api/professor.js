import axios from './axios.js'

export const verCursosProfesor = (config) => axios.get('/profesor/cursos', config)
export const verEstudiantesCurso = (currentId) => axios.get(`/profesor/cursos/estudiantes/${currentId}`)
export const subirContenido = (currentId, values) => axios.post(`/profesor/cursos/subirContenido/${currentId}`, values)
export const verContenidoCurso = (currentId) => axios.get(`/profesor/cursos/contenido/${currentId}`)
// Tareas
export const subirTarea = (currentId, formData, config) => axios.post(`/profesor/cursos/tareas/subirTarea/${currentId}`, formData, config)
export const verTareasCurso = (currentId) => axios.get(`/profesor/cursos/tareas/${currentId}`)
export const verTareaParaEditar = (currentId) => axios.get(`/profesor/cursos/tarea/${currentId}`)
export const actualizarTarea = (idTarea, formData, config) => axios.put(`/profesor/cursos/tareas/${idTarea}`, formData, config)
export const eliminarTarea = (currentId) => axios.delete(`/profesor/cursos/tareas/${currentId}`)
// Cuestionarios
export const subirCuestionario = (currentId, formData, config) => axios.post(`/profesor/cursos/cuestionarios/subirCuestionario/${currentId}`, formData, config)
export const verCuestionariosCurso = (currentId) => axios.get(`/profesor/cursos/cuestionarios/${currentId}`)
export const verCuestionarioParaEditar = (currentId) => axios.get(`/profesor/cursos/cuestionario/${currentId}`)
export const actualizarCuestionario = (idCuestionario, formData, config) => axios.put(`/profesor/cursos/cuestionarios/${idCuestionario}`, formData, config)
export const eliminarCuestionario = (currentId) => axios.delete(`/profesor/cursos/cuestionarios/${currentId}`)
// Foros
export const subirForo = (currentId, formData) => axios.post(`/profesor/cursos/foros/subirForo/${currentId}`, formData)
export const verForosCurso = (currentId) => axios.get(`/profesor/cursos/foros/${currentId}`)
export const verForoParaEditar = (currentId) => axios.get(`/profesor/cursos/foro/${currentId}`)
export const actualizarForo = (idForo, formData, config) => axios.put(`/profesor/cursos/foros/${idForo}`, formData, config)
export const eliminarForo = (currentId) => axios.delete(`/profesor/cursos/foros/${currentId}`)