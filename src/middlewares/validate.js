import fs from 'fs'

export const validate = (schema) => async (req, res, next) => {
    try {
      console.log(req.body)
      await schema.parse(req.body)
      next()
    } catch (error) {
      fs.unlinkSync(req.file.path)
      return res.status(400).json(error.errors.map((error) => error.message))
    }
  }