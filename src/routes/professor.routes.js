import { Router } from 'express'
import * as professorController from '../controllers/professor.controller.js'
import { verifyJwt, storage } from '../middlewares/importer.js'
import { contentSchema } from '../schemas/content.schema.js'
import { homeworkSchema } from '../schemas/homework.schema'
import { validate } from '../middlewares/validate.js'
import { validateJson } from '../middlewares/validateJson.js'

const router = Router()

router.get('/', [verifyJwt.verifyToken, verifyJwt.isProfessor], professorController.getProfessorCourses)
router.get('/estudiantes/:courseId', [verifyJwt.verifyToken, verifyJwt.isProfessor], professorController.getStudentsCourses)

// Contenido
router.post('/subirContenido/:courseId', [verifyJwt.verifyToken, verifyJwt.isProfessor], storage.upload.single('pdf'), validate(contentSchema), professorController.createContent)
router.get('/contenido/:courseId', [verifyJwt.verifyToken, verifyJwt.isProfessor], professorController.getContentCourses)

// Tareas
router.post('/subirTarea/:courseId', [verifyJwt.verifyToken, verifyJwt.isProfessor], storage.upload.single('pdf'), validateJson(homeworkSchema), professorController.createHomework)
router.get('/tareas/:courseId', [verifyJwt.verifyToken, verifyJwt.isProfessor], professorController.getHomeworksCourse)
router.get('/tarea/:homeworkId', [verifyJwt.verifyToken, verifyJwt.isProfessor], professorController.getHomeworkCourse)
router.post('/actualizarTarea/:homeworkId', [verifyJwt.verifyToken, verifyJwt.isProfessor], storage.upload.single('pdf'), validateJson(homeworkSchema), professorController.editHomework)
router.delete('/tareas/:homeworkId', [verifyJwt.verifyToken, verifyJwt.isProfessor], professorController.deleteHomework)

export default router