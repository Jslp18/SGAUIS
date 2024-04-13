import { Router } from 'express'
import * as authController from '../controllers/auth.controller'

const router = Router()

router.post('/iniciarSesion', authController.iniciarSesion)

router.post('/cerrarSesion', authController.cerrarSesion)

export default router
