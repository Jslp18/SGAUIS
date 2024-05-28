import { Schema, model } from 'mongoose'

const answersSchema = new Schema({
    respuesta: {
        type: String,
        require: true
    },
    esCorrecta: {
        type: Boolean,
        require: true
    }
}, {
    timestamps: true,
    versionKey: false
})

export default model('Answers', answersSchema)