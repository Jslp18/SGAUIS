import { Schema, model } from 'mongoose'

const forumCommentSchema = new Schema({
  comentario: {
    type: String,
    require: true,
    unique: true
  },
  temaForo: {
    ref: 'TopicsForums',
    require: true,
    type: Schema.Types.ObjectId
},
  usuarios: {
    ref: 'Users',
    require: true,
    type: Schema.Types.ObjectId
},
}, {
  timestamps: true,
  versionKey: false
})

export default model('ForumComment', forumCommentSchema)