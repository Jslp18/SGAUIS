import jwt from 'jsonwebtoken'
import { appConfig } from '../config.js'
import Users from '../models/users.model.js'

export const verifyToken = async (req, res, next) => {
  try {
    const token = await req.headers['token-acceso'] // Se obtiene el token de acceso que viene en el header 'token-acceso'
    if (!token) return res.status(403).json({ mensaje: 'No se proporcionó un token de acceso. Por favor, verifica e intenta de nuevo.' })
    const userToken = jwt.verify(token, appConfig.secret) // Se verifica que el token que es proporcionado, efectivamente es el token que se le había otorgado al usuario
    const user = await Users.findById(userToken.id, { password: 0 }) // Por medio del token se obtiene el Id y es no deseable retornar la contraseña del usuario
    if (!user) return res.status(404).json({ mensaje: 'Usuario no encontrado.' }) // Por último, mensaje que indica que el usuario no se encontró si los token no coincidieron
    next()
  } catch (error) {
    return res.status(401).json({ mensaje: 'No autorizado.' }) // Se atrapa el error en caso tal de que el token proporcionado no sea correcto
  }
}
