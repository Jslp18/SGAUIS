import formidable from 'formidable'

export const parseForm = (req, res, next) => {
    const form = formidable({ multiples: true })
    form.parse(req, (err, fields, file) => {
        if (err) {
            next(err)
            return
        }
        // Eliminar los arrays de los campos del formulario
        for (const key in fields) {
            if (Array.isArray(fields[key])) {
                fields[key] = fields[key][0]
            }
        }
        req.body = fields // Agrega los campos del formulario a req.body
        req.file = file // Agrega el archivo subido a req.file
        next()
    })
}