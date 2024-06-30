import { Schema, model } from 'mongoose'

const forumCommentSchema = new Schema({
  comentario: {
    type: String,
    require: true
  },
  foro: {
    ref: 'Forum',
    require: true,
    type: Schema.Types.ObjectId
  },
  usuario: {
    ref: 'Users',
    require: true,
    type: Schema.Types.ObjectId
},
}, {
  timestamps: true,
  versionKey: false
})

export default model('ForumComment', forumCommentSchema)