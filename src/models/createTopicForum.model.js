import { Schema, model } from 'mongoose'

const createTopicForum = new Schema({
  foro: {
    ref: 'Forums',
    require: true,
    type: Schema.Types.ObjectId
},
temaForo: {
    ref: 'TopicsForums',
    require: true,
    type: Schema.Types.ObjectId
}
}, {
  timestamps: true,
  versionKey: false
})

export default model('CreateTopicForum', createTopicForum)