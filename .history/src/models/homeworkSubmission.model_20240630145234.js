import { Schema, model } from 'mongoose'

const homeworkSubmissionSchema = new Schema({
    titulo: {
        type: String,
        require: true
    },
    pdfEntregaURL: {
        type: String,
        require: true
    },
c
    estadoEntrega: {
        type: Boolean,
        default: false
    },
}, { 
    timestamps: true,
    versionKey: false
})

export default model('HomeworkSubmission', homeworkSubmissionSchema)