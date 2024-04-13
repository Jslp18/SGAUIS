import { Router } from 'express'
import * as userController from '../controllers/user.controller'
import { verifyJwt, validateRolSignUp } from '../middlewares/importer.js'
import { validateSchema } from '../middlewares/validator.middleware.js'
import { registerSchema } from '../schemas/user.schema.js'

const router = Router()

router.post('/crearUsuario', [verifyJwt.verifyToken, verifyJwt.isSchool, validateRolSignUp.checkRolExisted, validateRolSignUp.checkDuplicateCodeOrEmail], validateSchema(registerSchema), userController.createUser)

export default router
