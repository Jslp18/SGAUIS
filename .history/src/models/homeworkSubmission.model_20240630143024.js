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
    usuarioEntrega: {
        ref: 'Users',
        require: true,
        type: Schema.Types.ObjectId
    },
    estadoEntrega: {
        type: ,
        default: false
    },
}, { 
    timestamps: true,
    versionKey: false
})

export default model('HomeworkSubmission', homeworkSubmissionSchema)