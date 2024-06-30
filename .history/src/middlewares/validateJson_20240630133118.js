import fs from 'fs'

export const validateJson = (schema) => async (req, res, next) => {
  try {
    const jsonData = JSON.parse(req.body.data)
    await schema.parse(jsonData)
    next()
  } catch (error) {

    if (req.file) {
      fs.unlinkSync(req.file.path)
    }
    return res.status(400).json(error.errors.map((error) => error.message))
  }
}
