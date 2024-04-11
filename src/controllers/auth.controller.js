import Users from '../models/users.model'
import jwt from 'jsonwebtoken'
import { appConfig } from '../config.js'

export const registrarUsuario = async (req, res) => {
  const { codigo, nombre, correo, password, roles } = req.body
  const newUser = new Users({ codigo, nombre, correo, password: await Users.encryptContraseña(password), roles })
  const savedUser = await newUser.save()
  const token = jwt.sign({id: savedUser._id}, appConfig.secret, {expiresIn:86400}) // Token que expira en un día
  res.status(200).json({token})
}

export const iniciarSesion = async (req, res) => {

}
