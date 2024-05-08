import Users from '../models/users.model'
import Courses from '../models/courses.model'

export const checkUndoDuplicateCode = async (req, res, next) => { // Función para verificar si el código del usuario que se está intentando inscribir ya existe en un curso
    const { codigo } = req.body // Destructuración del req.body para la obtención del código
    const { courseId } = req.params // Obtención del curso al que se está intentando inscribir el usuario

    // Busca al usuario por su código
    const userFound = await Users.findOne({ codigo }).populate('rol')
    if (!userFound) return res.status(404).json({ message: 'Lo siento, pero el código de usuario ingresado no corresponde a ninguna cuenta existente. Por favor, verifica el código de usuario e intenta de nuevo.' })
    else {
        next()
    }
}