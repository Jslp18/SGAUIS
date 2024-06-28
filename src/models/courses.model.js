import { Schema, model } from 'mongoose'

const coursesSchema = new Schema({
  nombre: {
    type: String,
    require: true,
    unique: true
  },
  descripcion: {
    type: String,
    require: true
  },
  imagenURL: {
    type: String,
    require: true
  },
  creadoPor: {
    ref: 'Users',
    type: Schema.Types.ObjectId
  }
}, {
  timestamps: true,
  versionKey: false
})

export default model('Courses', coursesSchema)
