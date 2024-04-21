import Courses from '../models/courses.model'

export const checkDuplicateName = async (req, res, next) => { // Función para verificar si el nombre del curso que se está intentando crear ya existe
  const { nombre } = req.body // Destructuración del req.body para la obtención del nombre
  const name = await Courses.findOne({ nombre }) // Consulta para saber si ese nombre ya existe en la colección Courses
  if (name) {
    return res.status(400).json({ message: 'Ya existe un curso con este nombre.' }) // message de respuesta si existe el nombre
  } else {
    next() // Si no está duplicados el nombre, entonces continúa la operación
  }
}
