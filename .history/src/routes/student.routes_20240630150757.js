import { Router } from 'express'
import * as studentController from '../controllers/student.controller.js'
import { verifyJwt, storage } from '../middlewares/importer.js'
import { commentForumSchema } from '../schemas/commentForumSchema.js'
import { homeworkSubmissionSchema } from '../schemas/homeworkSubmissionSchema.js'
// import { questionnaireSchema } from '../schemas/questionnaire.schema.js'
// import { validate } from '../middlewares/validate.js'
import { validateJson } from '../middlewares/validateJson.js'

const router = Router()

router.get('/', [verifyJwt.verifyToken, verifyJwt.isStudent], studentController.getStudentCourses)

// Contenido
router.get('/contenido/:courseId', [verifyJwt.verifyToken, verifyJwt.isStudent], studentController.getContentCourses)

// Tareas
router.post('/tareas/entregarTarea/:homeworkId', [verifyJwt.verifyToken, verifyJwt.isStudent], storage.upload.single('pdf'), validateJson(homeworkSubmissionSchema), studentController.homeworkSubmission)
router.get('/tareas/:courseId', [verifyJwt.verifyToken, verifyJwt.isStudent], studentController.getHomeworksCourse)
router.get('/tarea/:homeworkId', [verifyJwt.verifyToken, verifyJwt.isStudent], professorController.getHomeworkCourse)
// router.put('/tareas/:homeworkId', [verifyJwt.verifyToken, verifyJwt.isProfessor], storage.upload.single('pdf'), validateJson(homeworkSchema), professorController.editHomework)
// router.delete('/tareas/:homeworkId', [verifyJwt.verifyToken, verifyJwt.isProfessor], professorController.deleteHomework)

// Cuestionarios
// router.post('/cuestionarios/subirCuestionario/:courseId', [verifyJwt.verifyToken, verifyJwt.isProfessor], storage.upload.none(), validateJson(questionnaireSchema), professorController.createQuestionnaire)
// router.get('/cuestionarios/:courseId', [verifyJwt.verifyToken, verifyJwt.isProfessor], professorController.getQuestionnairesCourse)
// router.get('/cuestionario/:questionnaireId', [verifyJwt.verifyToken, verifyJwt.isProfessor], professorController.getQuestionnaireCourse)
// router.put('/cuestionarios/:questionnaireId', [verifyJwt.verifyToken, verifyJwt.isProfessor], storage.upload.none(), validateJson(questionnaireSchema), professorController.editQuestionnaire)
// router.delete('/cuestionarios/:questionnaireId', [verifyJwt.verifyToken, verifyJwt.isProfessor], professorController.deleteQuestionnaire)

// Foros
// router.post('/foros/subirForo/:courseId', [verifyJwt.verifyToken, verifyJwt.isProfessor], storage.upload.none(), validateJson(forumSchema), professorController.createForum)
router.get('/foros/:courseId', [verifyJwt.verifyToken, verifyJwt.isStudent], studentController.getForumsCourse)
router.get('/foro/:forumId', [verifyJwt.verifyToken, verifyJwt.isStudent], studentController.getCommentsForum)
router.post('/foros/:forumId', [verifyJwt.verifyToken, verifyJwt.isStudent], storage.upload.none(), validateJson(commentForumSchema), studentController.createCommentForum)
// router.delete('/foros/:forumId', [verifyJwt.verifyToken, verifyJwt.isProfessor], professorController.deleteForum)

export default router