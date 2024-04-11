import Roles from '../models/roles.model'

export const createRoles = async () => {
  try {
    const count = await Roles.estimatedDocumentCount()

    if (count > 0) return

    const values = await Promise.all([
      new Roles({ nombre: 'Escuela Ingeniería de Sistemas' }).save(),
      new Roles({ nombre: 'Profesor' }).save(),
      new Roles({ nombre: 'Estudiante' }).save()
    ])

    console.log(values)
  } catch (error) {
    console.error(error)
  }
}
