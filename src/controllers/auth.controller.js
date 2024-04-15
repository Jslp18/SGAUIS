import Users from '../models/users.model'
import { createAccessToken } from '../libs/jwt'

export const iniciarSesion = async (req, res) => {
  try {
    const { codigo, password, rol } = req.body // Destructurando el req.body solo para obtener el codigo y password necesarios
    const userFound = await Users.findOne({ codigo }).populate('rol') // Consulta de un usuario por código, que a su vez obtiene el id del rol que tiene asociado
    if (!userFound) return res.status(404).json({ message: 'Lo siento, pero el código de usuario ingresado no corresponde a ninguna cuenta existente. Por favor, verifica el código de usuario e intenta de nuevo.' })
    const matchPassword = await Users.comparePassword(password, userFound.password) // Llamado a la función comparePassword en modelo "Users" que compara las contraseñas: La ingresada y la guardada en base de datos
    if (!matchPassword) return res.status(400).json({ message: 'Contraseña inválida. Por favor, verifica e intenta de nuevo.' })
    const token = await createAccessToken(userFound._id) // Creación del token si las contraseñas coincidieron
    if (rol !== userFound.rol.nombre) return res.status(404).json({ message: 'Lo siento, pero el rol seleccionado no corresponde a tu cuenta. Por favor, selecciona el rol correcto e intenta de nuevo.' })
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
    res.status(500).json({ message: error.message })
  }
}

export const cerrarSesion = (req, res) => {
  console.log('cerrandoSesion')
  res.cookie('token', '', { expires: new Date(0) })
  return res.sendStatus(200)
}
