import { Router } from 'express'
import * as authController from '../controllers/auth.controller'
const router = Router()

router.post('/registrarUsuario', authController.registrarUsuario)
router.post('/iniciarSesion', authController.iniciarSesion)

export default router
