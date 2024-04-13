import { Schema, model } from 'mongoose'

const coursesSchema = new Schema({
  nombre: {
    type: String,
    require: true
  },
  descripcion: {
    type: String,
    require: true
  },
  imagenUrl: {
    type: String,
    require: true
  },
  foros: {
    ref: 'Foros',
    type: Schema.Types.ObjectId
  }
}, {
  timestamps: true,
  versionKey: false
})

export default model('Courses', coursesSchema)
