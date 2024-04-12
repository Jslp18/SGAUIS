import { Schema, model } from 'mongoose'

const rolesSchema = new Schema({
  nombre: String
}, {
  versionKey: false
})

export default model('Rol', rolesSchema, 'rol')
