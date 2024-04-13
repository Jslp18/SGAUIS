import jwt from 'jsonwebtoken'
import { appConfig } from '../config.js'
import Users from '../models/users.model.js'
import Roles from '../models/roles.model.js'

export const verifyToken = async (req, res, next) => {
  try {
    const { token } = await req.cookies // Se obtiene el token de acceso que viene en el header 'token-acceso'
    console.log(token)
    if (!token) return res.status(403).json({ mensaje: 'No se proporcionó un token de acceso. Por favor, verifica e intenta de nuevo.' })
    const userToken = jwt.verify(token, appConfig.secret) // Se verifica que el token que es proporcionado, efectivamente es el token que se le había otorgado al usuario
    req.userId = userToken.id
    const user = await Users.findById(req.userId, { password: 0 }) // Por medio del token se obtiene el Id y es no deseable retornar la contraseña del usuario
    if (!user) return res.status(404).json({ mensaje: 'Usuario no encontrado.' }) // Por último, mensaje que indica que el usuario no se encontró si los token no coincidieron
    next()
  } catch (error) {
    return res.status(401).json({ mensaje: 'No autorizado.' }) // Se atrapa el error en caso tal de que el token proporcionado no sea correcto
  }
}

export const isSchool = async (req, res, next) => { // Función para verificar que el tipo de rol del usuario en este caso rol "Escuela"
  const user = await Users.findById(req.userId) // req.userId es el Id que el token proporcionaba
  console.log(user)
  const rol = await Roles.findOne({ _id: user.rol }) // Encontramos el rol que corresponde al id de rol del usuario
  console.log(rol)
  if (rol.nombre === 'Escuela') {
    next() // Si el nombre de este rol es escuela continúa la operación
  } else {
    return res.status(403).json({ mensaje: 'No tienes los permisos suficientes para realizar esta acción.' }) // De lo contrario se necesitan permisos de "Escuela" para realizar esta operación
  }
}

export const isProfessor = async (req, res, next) => { // Función para verificar que el tipo de rol del usuario en este caso rol "Profesor"
  const user = await Users.findById(req.userId) // req.userId es el Id que el token proporcionaba
  const rol = await Roles.findOne({ _id: user.rol }) // Encontramos el rol que corresponde al id de rol del usuario
  if (rol.nombre === 'Profesor') {
    next() // Si el nombre de este rol es escuela continúa la operación
  } else {
    return res.status(403).json({ mensaje: 'No tienes los permisos suficientes para realizar esta acción.' }) // De lo contrario se necesitan permisos de "Profesor" para realizar esta operación
  }
}

export const isEstudent = async (req, res, next) => { // Función para verificar que el tipo de rol del usuario en este caso rol "Estudiante"
  const user = await Users.findById(req.userId) // req.userId es el Id que el token proporcionaba
  const rol = await Roles.findOne({ _id: user.rol }) // Encontramos el rol que corresponde al id de rol del usuario
  if (rol.nombre === 'Estudiante') {
    next() // Si el nombre de este rol es escuela continúa la operación
  } else {
    return res.status(403).json({ mensaje: 'No tienes los permisos suficientes para realizar esta acción.' }) // De lo contrario se necesitan permisos de "Estudiante" para realizar esta operación
  }
}
