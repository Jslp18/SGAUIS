import { Schema, model } from 'mongoose'

const forumSchema = new Schema({
  titulo: {
    type: String,
    require: true
  },
  descripcion: {
    type: String,
    require: true
  },
  curso: {
    ref: 'Courses',
    require: true,
    type: Schema.Types.ObjectId
}
}, {
  timestamps: true,
  versionKey: false
})

export default model('Forum', forumSchema)