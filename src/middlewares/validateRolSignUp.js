import Roles from '../models/roles.model.js'
import Users from '../models/users.model.js'

export const checkDuplicateCodeOrEmail = async (req, res, next) => { // Función para verificar si el código o el correo del usuario que se está intentando crear ya existe
  const { codigo, correo } = req.body // Destructuración del req.body para la obtención del código y el correo
  const code = await Users.findOne({ codigo }) // Consulta para saber si ese código ya existe en la colección Users
  if (code) {
    return res.status(400).json({ message: 'Ya existe un usuario con este código.' }) // message de respuesta si existe el código
  }
  const email = await Users.findOne({ correo }) // Consulta para saber si ese correo ya existe en la colección Users
  if (email) {
    return res.status(400).json({ message: 'Ya existe un usuario con este correo electrónico.' }) // message de respuesta si existe el correo
  } else {
    next() // Si no están duplicados el codigo y/o el correo, entonces continúa la operación
  }
}

export const checkRolExisted = async (req, res, next) => { // Función que verifica los roles de los usuarios que se están intentando crear
  const { rol } = req.body // Destructuración para obtener el rol de req.body
  if (rol) {
    const rolSave = await Roles.findOne({ nombre: rol }) // Consulta para verificar que existe el nombre del rol que se está pasando en el body con los que están en DB
    if (!rolSave) {
      return res.status(400).json({ message: `El rol ${rol} no existe.` }) // message que indica que el rol no existe
    } else {
      next()
    } // Si el rol existe, entonces continúa la operación
  }
}
