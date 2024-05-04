import { Router } from 'express'
import * as professorController from '../controllers/professor.controller.js'
import { verifyJwt } from '../middlewares/importer.js'

const router = Router()

router.get('/', [verifyJwt.verifyToken, verifyJwt.isProfessor], professorController.getProfessorCourses)
router.get('/estudiantes/:courseId', [verifyJwt.verifyToken, verifyJwt.isProfessor], professorController.getStudentsCourses)

export default router
