import { Schema, model } from 'mongoose'
import { appConfig } from '../config'

const pdfSchema = new Schema({
    nombre: {
        type: String,
        require: true
    },
    pdfURL: {
        type: String,
        require: true
    }
}, { 
    timestamps: true,
    versionKey: false
})

pdfSchema.methods.setPdfURL = function setPdfURL (filename) {
    const { host, port } = appConfig
    this.pdfURL = `${host}:${port}/public/${filename}`
}

export default model('PdfFile', pdfSchema)