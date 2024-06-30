import { Schema, model } from 'mongoose'

const homeworkSubmissionSchema = new Schema({
    titulo: {
        type: String,
        require: true
    },
    calificacion: {
        type: number
    },
    pdfEntregaURL: {
        type: String,
        require: true
    },
    usuarioEntrega: {
        ref: 'Users',
        require: true,
        type: Schema.Types.ObjectId
    },
    estadoEntrega: {
        type: boolean,
        default: false
    },
    curso: {
        ref: 'Courses',
        require: true,
        type: Schema.Types.ObjectId
    },
}, { 
    timestamps: true,
    versionKey: false
})

export default model('HomeworkSubmission', homeworkSubmissionSchema)