import { Schema, model } from 'mongoose'

const contentSchema = new Schema({
    nombre: {
        type: String,
        require: true
    },
    descripcion: {
        type: String,
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

export default model('Content', contentSchema)