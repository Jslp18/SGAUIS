import { Schema, model } from 'mongoose'
import bcrypt from 'bcryptjs'

const usersSchema = new Schema({
  codigo: {
    type: String,
    unique: true
  },
  nombre: String,
  correo: String,
  password: String,
  rol: {
    ref: 'Rol',
    type: Schema.Types.ObjectId
  }
}, {
  timestamps: true,
  versionKey: false
})

usersSchema.statics.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10)
  return await bcrypt.hash(password, salt)
}

usersSchema.statics.comparePassword = async (password, passwordRecibida) => {
  return await bcrypt.compare(password, passwordRecibida)
}

export default model('Users', usersSchema)
