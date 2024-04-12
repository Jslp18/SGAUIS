import Users from '../models/users.model'
import jwt from 'jsonwebtoken'
import { appConfig } from '../config.js'

export const iniciarSesion = async (req, res) => {
  const { codigo, password } = req.body // Destructurando el req.body solo para obtener el codigo y password necesarios
  const userFound = await Users.findOne({ codigo }).populate('rol') // Consulta de un usuario por código, que a su vez obtiene el id del rol que tiene asociado
  if (!userFound) return res.status(404).json({ mensaje: 'Usuario no encontrado. Por favor, verifica e intenta de nuevo.' })
  const matchPassword = await Users.comparePassword(password, userFound.password) // Llamado a la función comparePassword en modelo "Users" que compara las contraseñas: La ingresada y la guardada en base de datos
  if (!matchPassword) return res.status(400).json({ message: 'Contraseña inválida. Por favor, verifica e intenta de nuevo.' })
  const token = jwt.sign({ id: userFound._id }, appConfig.secret, { expiresIn: 86400 }) // Token que expira en un día. La palabra secret se encuentra en el archivo .env como variable de entorno
  res.status(200).json({ token }) // Devolviendo el usuario recién creado
}
