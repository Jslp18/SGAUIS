import { Schema, model } from 'mongoose'
import { date, number } from 'zod'

const homeworkSchema = new Schema({
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
    fechaEntrega: {
        type: Date,
        require: true
    },
    pdfFile: {
        ref: 'PdfFile',
        require: true,
        type: Schema.Types.ObjectId
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

export default model('Homework', homeworkSchema)