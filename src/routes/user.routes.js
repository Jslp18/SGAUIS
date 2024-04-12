import { Router } from 'express'
import * as userController from '../controllers/user.controller'
import { verifyJwt, validateRolSignUp } from '../middlewares/importer.js'
const router = Router()

router.post('/createUser', [verifyJwt.verifyToken, verifyJwt.isSchool, validateRolSignUp.checkRolExisted, validateRolSignUp.checkDuplicateCodeOrEmail], userController.createUser)

export default router
