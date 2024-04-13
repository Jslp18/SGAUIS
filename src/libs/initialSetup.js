import mongoose from 'mongoose'
import Roles from '../models/roles.model'
import Users from '../models/users.model'

const ObjectId = mongoose.Types.ObjectId

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

export const createUsers = async () => {
  try {
    const count = await Users.estimatedDocumentCount()
    if (count > 0) return
    await Promise.all([
      new Users({ codigo: '0000000', nombre: 'UIS', correo: 'uis@correo.uis.edu.co', password: await Users.encryptPassword('123456789'), rol: new ObjectId('661a033c50163523e2fe9446') }).save()
    ])
  } catch (error) {
    console.error(error)
  }
}
