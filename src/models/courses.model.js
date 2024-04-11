import { Schema, model } from 'mongoose'

const coursesSchema = new Schema({
  nombre: String,
  descripcion: String,
  imagenUrl: String,
  foros: {
    ref: 'Foros',
    type: Schema.Types.ObjectId
  }
}, {
  timestamps: true,
  versionKey: false
})

export default model('Courses', coursesSchema)
