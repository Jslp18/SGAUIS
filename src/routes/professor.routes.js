import { Router } from 'express'
import * as professorController from '../controllers/professor.controller.js'
import { verifyJwt, storage } from '../middlewares/importer.js'
import { contentSchema } from '../schemas/content.schema.js'
import { homeworkSchema } from '../schemas/homework.schema'
import { questionnaireSchema } from '../schemas/questionnaire.schema.js'
import { validate } from '../middlewares/validate.js'
import { validateJson } from '../middlewares/validateJson.js'

const router = Router()

router.get('/', [verifyJwt.verifyToken, verifyJwt.isProfessor], professorController.getProfessorCourses)
router.get('/estudiantes/:courseId', [verifyJwt.verifyToken, verifyJwt.isProfessor], professorController.getStudentsCourses)

// Contenido
router.post('/subirContenido/:courseId', [verifyJwt.verifyToken, verifyJwt.isProfessor], storage.upload.single('pdf'), validate(contentSchema), professorController.createContent)
router.get('/contenido/:courseId', [verifyJwt.verifyToken, verifyJwt.isProfessor], professorController.getContentCourses)

// Tareas
router.post('/tareas/subirTarea/:courseId', [verifyJwt.verifyToken, verifyJwt.isProfessor], storage.upload.single('pdf'), validateJson(homeworkSchema), professorController.createHomework)
router.get('/tareas/:courseId', [verifyJwt.verifyToken, verifyJwt.isProfessor], professorController.getHomeworksCourse)
router.get('/tarea/:homeworkId', [verifyJwt.verifyToken, verifyJwt.isProfessor], professorController.getHomeworkCourse)
router.put('/tareas/:homeworkId', [verifyJwt.verifyToken, verifyJwt.isProfessor], storage.upload.single('pdf'), validateJson(homeworkSchema), professorController.editHomework)
router.delete('/tareas/:homeworkId', [verifyJwt.verifyToken, verifyJwt.isProfessor], professorController.deleteHomework)

// Cuestionarios
router.post('/cuestionarios/subirCuestionario/:courseId', [verifyJwt.verifyToken, verifyJwt.isProfessor], storage.upload.none(), validateJson(questionnaireSchema), professorController.createQuestionnaire)
router.get('/cuestionarios/:courseId', [verifyJwt.verifyToken, verifyJwt.isProfessor], professorController.getQuestionnairesCourse)
router.get('/cuestionario/:questionnaireId', [verifyJwt.verifyToken, verifyJwt.isProfessor], professorController.getQuestionnaireCourse)
router.put('/cuestionarios/:questionnaireId', [verifyJwt.verifyToken, verifyJwt.isProfessor], storage.upload.none(), validateJson(questionnaireSchema), professorController.editQuestionnaire)
router.delete('/cuestionarios/:questionnaireId', [verifyJwt.verifyToken, verifyJwt.isProfessor], professorController.deleteQuestionnaire)

export default router