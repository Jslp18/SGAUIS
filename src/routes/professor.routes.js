import { Router } from 'express'
import * as professorController from '../controllers/professor.controller.js'
import { verifyJwt, storage } from '../middlewares/importer.js'
import { validateSchema } from '../middlewares/validator.middleware.js'
import { contentSchema } from '../schemas/content.schema.js'

const router = Router()

router.get('/', [verifyJwt.verifyToken, verifyJwt.isProfessor], professorController.getProfessorCourses)
router.get('/estudiantes/:courseId', [verifyJwt.verifyToken, verifyJwt.isProfessor], professorController.getStudentsCourses)
router.post('/subirContenido/:courseId', [verifyJwt.verifyToken, verifyJwt.isProfessor], storage.upload.single('pdf'), validateSchema(contentSchema), professorController.uploadContent)
router.get('/contenido/:courseId', [verifyJwt.verifyToken, verifyJwt.isProfessor], professorController.getContentCourses)

export default router