import InscribeUserCourses from '../models/inscribeUserCourse.model'
import Users from '../models/users.model'
import Courses from '../models/courses.model'

export const checkDuplicateCode = async (req, res, next) => { // Función para verificar si el código del usuario que se está intentando inscribir ya existe en un curso
  const { codigo } = req.body // Destructuración del req.body para la obtención del código
  const { courseId } = req.params // Obtención del curso al que se está intentando inscribir el usuario
  // Busca el curso por su ID
  const courseFound = await Courses.findById(courseId)

  // Busca al usuario por su código
  const userFound = await Users.findOne({ codigo }).populate('rol')
  if (!userFound) return res.status(404).json({ message: 'Lo siento, pero el código de usuario ingresado no corresponde a ninguna cuenta existente. Por favor, verifica el código de usuario e intenta de nuevo.' })

  // Busca si el usuario está inscrito en algún curso
  const inscribedUserCourse = await InscribeUserCourses.find({ usuarios: userFound._id }) // Consulta para saber si ese usuario ya existe en la colección InscribeUserCourse
  const checkRol = await InscribeUserCourses.find({ curso: courseFound._id }).populate('usuarios')
  let isDuplicate = false
  let isProfesor = false

  // Verifica si el usuario está inscrito en el curso actual
  inscribedUserCourse.forEach(inscribedCourse => {
    if (inscribedCourse && inscribedCourse.curso.toString() === courseFound._id.toString()) {
      isDuplicate = true
    }
  })

  if (isDuplicate) {
    return res.status(400).json({ message: `Lo siento, pero el código ${codigo} ingresado ya corresponde a un usuario inscrito a ${courseFound.nombre}.` })
  } else {
    // Verifica si ya hay un profesor inscrito en el curso actual
    checkRol.forEach(checkRol => {
      if (checkRol && userFound.rol._id.toString() === '661a033c50163523e2fe9447' && checkRol.usuarios.rol.toString() === userFound.rol._id.toString()) {
        isProfesor = true
      }
    })
    if (isProfesor) {
      return res.status(400).json({ message: `Lo siento, ya hay un profesor inscrito en este curso. Por favor, verifica el código de usuario e intenta de nuevo.` })
    } else {
      next()
    }
  }
}
