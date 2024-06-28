import { Schema, model } from 'mongoose'

const topicForumSchema = new Schema({
  tema: {
    type: String,
    require: true,
    unique: true
  }
}, {
  timestamps: true,
  versionKey: false
})

export default model('TopicForum', topicForumSchema)