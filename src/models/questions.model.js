import { Schema, model } from 'mongoose'

const questionsSchema = new Schema({
    pregunta: {
        type: String,
        require: true
    },
    cuestionario: {
        ref: 'Questionnaire',
        require: true,
        type: Schema.Types.ObjectId
    }
}, {
    timestamps: true,
    versionKey: false
})

export default model('Questions', questionsSchema)
