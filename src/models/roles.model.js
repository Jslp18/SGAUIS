import { Schema, model } from 'mongoose'

const rolesSchema = new Schema({
  nombre: {
    type: String,
    require: true,
    trim: true,
    unique: true
  }
}, {
  versionKey: false
})

export default model('Rol', rolesSchema, 'rol')
