import Users from '../models/users.model'
import Roles from '../models/roles.model.js'
import { createAccessToken } from '../libs/jwt.js'

export const createUser = async (req, res) => {
  const { codigo, nombre, correo, password, rol } = req.body // Obteniendo todos las credenciales de usuario de req.body

  const newUser = new Users({ codigo, nombre, correo, password: await Users.encryptPassword(password), rol }) // Creando el usuario y encriptando su comtraseña por medio de la función encryptContraseña declarada en el modelo "Users"
  try {
    const foundCodigo = await Users.findOne({ codigo: req.body.codigo }) // Consulta para verificar que el código no exista
    if (foundCodigo) {
      res.status(409).json({ message: 'El código ya está en uso. Por favor, elige otro.' }) // Si existe message que indica que el código está en uso
    } else {
      if (rol) {
        const foundRol = await Roles.findOne({ nombre: rol }) // Consulta para encontra el rol que fue pasado como req.body.rol
        if (foundRol && foundRol.nombre !== 'Escuela') { // Si el rol existe y además es diferente al rol de escuela, se podrán crear usuarios de tipo estudiante y de tipo docente
          newUser.rol = foundRol._id // Si el rol existe se asigna el id al campo rol de la colección o modelo "Users"
        } else {
          return res.status(400).json({ message: 'El rol especificado no corresponde a uno de estos roles: [Estudiante, Profesor]. Por favor, verifica e intenta de nuevo.' }) // De lo contrario message que indica que no existe el rol
        }
      } else {
        const role = await Roles.findOne({ nombre: 'Estudiante' }) // Si no se define un req.body.rol entonces se asigna automáticamente el rol de estudiante
        newUser.rol = role._id
      }

      const savedUser = await newUser.save() // Guardando el usuario en base de datos
      const token = await createAccessToken(savedUser._id)
      res.cookie('token', token)
      res.json({ id: savedUser._id, codigo: savedUser.codigo, nombre: savedUser.nombre, correo: savedUser.correo, rol: savedUser.rol })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
