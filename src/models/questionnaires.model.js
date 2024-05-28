import { Schema, model } from 'mongoose'

const questionnaireSchema = new Schema({
    nombre: {
        type: String,
        require: true
    },
    descripcion: {
        type: String,
        require: true
    },
    calificacionMaxima: {
        type: Number,
        require: true
    },
    fecha: {
        type: Date,
        require: true
    },
    tiempoInicial: {
        type: String,
        require: true
    },
    tiempoFinal: {
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

export default model('Questionnaire', questionnaireSchema)