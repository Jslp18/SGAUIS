import Users from '../models/users.model'
import Roles from '../models/roles.model.js'
import jwt from 'jsonwebtoken'
import { appConfig } from '../config.js'

export const createUser = async (req, res) => {
  const { codigo, nombre, correo, password, rol } = req.body // Obteniendo todos las credenciales de usuario de req.body
  const newUser = new Users({ codigo, nombre, correo, password: await Users.encryptPassword(password), rol }) // Creando el usuario y encriptando su comtraseña por medio de la función encryptContraseña declarada en el modelo "Users"
  const foundCodigo = await Users.findOne({ codigo: req.body.codigo }) // Consulta para verificar que el código no exista

  if (foundCodigo) {
    res.status(409).json({ mensaje: 'El código ya está en uso. Por favor, elige otro.' }) // Si existe mensaje que indica que el código está en uso
  } else {
    if (rol) {
      const foundRol = await Roles.findOne({ nombre: rol }) // Consulta para encontra el rol que fue pasado como req.body.rol
      console.log(foundRol)
      if (foundRol && foundRol.nombre !== 'Escuela') { // Si el rol existe y además es diferente al rol de escuela, se podrán crear usuarios de tipo estudiante y de tipo docente
        newUser.rol = foundRol._id // Si el rol existe se asigna el id al campo rol de la colección o modelo "Users"
      } else {
        return res.status(400).json({ mensaje: 'El rol especificado no corresponde a uno de estos roles: [Estudiante, Profesor]. Por favor, verifica e intenta de nuevo.' }) // De lo contrario mensaje que indica que no existe el rol
      }
    } else {
      const role = await Roles.findOne({ nombre: 'Estudiante' }) // Si no se define un req.body.rol entonces se asigna automáticamente el rol de estudiante
      newUser.rol = role._id
    }

    const savedUser = await newUser.save() // Guardando el usuario en base de datos
    const token = jwt.sign({ id: savedUser._id }, appConfig.secret, { expiresIn: 86400 }) // Token que expira en un día. La palabra secret se encuentra en el archivo .env como variable de entorno
    res.status(200).json({ token }) // Devolviendo el usuario recién creado
  }
}
