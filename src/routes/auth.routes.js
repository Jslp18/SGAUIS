import { Router } from 'express'
import * as authController from '../controllers/auth.controller'
import { validateSchema } from '../middlewares/validator.middleware.js'
import { loginSchema } from '../schemas/auth.schema.js'

const router = Router()

router.post('/iniciarSesion', validateSchema(loginSchema), authController.iniciarSesion)

router.post('/cerrarSesion', authController.cerrarSesion)

export default router
