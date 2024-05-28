import { Schema, model } from 'mongoose'

const questionsAnswersSchema = new Schema({
    pregunta: {
        ref: 'Questions',
        require: true,
        type: Schema.Types.ObjectId
    },
    respuesta: {
        ref: 'Answers',
        require: true,
        type: Schema.Types.ObjectId
    }
}, {
    timestamps: true,
    versionKey: false
})

export default model('QuestionsAnswers', questionsAnswersSchema)