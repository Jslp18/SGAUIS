import Users from '../models/users.model'
import jwt from 'jsonwebtoken'
import { appConfig } from '../config.js'

export const registrarUsuario = async (req, res) => {
  const { codigo, nombre, correo, password, roles } = req.body // Obteniendo todos las credenciales de usuario de req.body
  const newUser = new Users({ codigo, nombre, correo, password: await Users.encryptContraseña(password), roles }) // Creando el usuario y encriptando su comtraseña por medio de la función encryptContraseña declarada en el modelo "Users"
  const savedUser = await newUser.save() // Guardando el usuario en base de datos
  const token = jwt.sign({ id: savedUser._id }, appConfig.secret, { expiresIn: 86400 }) // Token que expira en un día. La palabra secret se encuentra en el archivo .env como variable de entorno
  res.status(200).json(savedUser) // Devolviendo el usuario recién creado
}

export const iniciarSesion = async (req, res) => {

}
