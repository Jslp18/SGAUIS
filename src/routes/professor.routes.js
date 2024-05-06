import { Router } from 'express'
import * as professorController from '../controllers/professor.controller.js'
import { verifyJwt, storage } from '../middlewares/importer.js'

const router = Router()

router.get('/', [verifyJwt.verifyToken, verifyJwt.isProfessor], professorController.getProfessorCourses)
router.get('/estudiantes/:courseId', [verifyJwt.verifyToken, verifyJwt.isProfessor], professorController.getStudentsCourses)
router.post('/subirContenido/:courseId', [verifyJwt.verifyToken, verifyJwt.isProfessor], storage.upload.single('pdf'), professorController.uploadContent)

export default router