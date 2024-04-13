import Users from '../models/users.model'
import { createAccessToken } from '../libs/jwt'

export const iniciarSesion = async (req, res) => {
  const { codigo, password } = req.body // Destructurando el req.body solo para obtener el codigo y password necesarios
  try {
    const userFound = await Users.findOne({ codigo }).populate('rol') // Consulta de un usuario por código, que a su vez obtiene el id del rol que tiene asociado
    if (!userFound) return res.status(404).json({ mensaje: 'Usuario no encontrado. Por favor, verifica e intenta de nuevo.' })
    const matchPassword = await Users.comparePassword(password, userFound.password) // Llamado a la función comparePassword en modelo "Users" que compara las contraseñas: La ingresada y la guardada en base de datos
    if (!matchPassword) return res.status(400).json({ message: 'Contraseña inválida. Por favor, verifica e intenta de nuevo.' })
    const token = await createAccessToken(userFound._id) // Creación del token si las contraseñas coincidieron
    res.cookie('token', token)
    res.json({
      id: userFound._id,
      codigo: userFound.codigo,
      nombre: userFound.nombre,
      correo: userFound.correo,
      rol: userFound.rol,
      token // Respuesta con el token quitar después
    })
  } catch (error) {
    res.status(500).json({ mensaje: error.message })
  }
}

export const cerrarSesion = (req, res) => {
  console.log('cerrandoSesion')
  res.cookie('token', '', { expires: new Date(0) })
  return res.sendStatus(200)
}
