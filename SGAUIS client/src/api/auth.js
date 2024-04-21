import axios from './axios.js'

export const registrarUsuarios = (user) => axios.post('/usuarios/crearUsuario', user)
export const iniciarSesion = (user) => axios.post('/iniciarSesion', user)
export const verifyTokenRequest = () => axios.get('/verify')
