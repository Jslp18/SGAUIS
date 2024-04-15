import axios from 'axios'

const API = 'http://localhost:1721'

export const registrarUsuarios = user => axios.post(`${API}/usuarios/crearUsuario`, user)
export const iniciarSesion = user => axios.post(`${API}/iniciarSesion`, user)
