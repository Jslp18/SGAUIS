import Roles from '../models/roles.model'

export const createRoles = async () => {
  try {
    const count = await Roles.estimatedDocumentCount()

    if (count > 0) return

    await Promise.all([
      new Roles({ nombre: 'Escuela' }).save(),
      new Roles({ nombre: 'Profesor' }).save(),
      new Roles({ nombre: 'Estudiante' }).save()
    ])
  } catch (error) {
    console.error(error)
  }
}