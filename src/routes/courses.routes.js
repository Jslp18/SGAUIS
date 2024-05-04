import { Router } from 'express'
import * as coursesController from '../controllers/courses.controller'
import { verifyJwt, validateCoursename, validateCode, validateUndoCode } from '../middlewares/importer.js'
import { validateSchema } from '../middlewares/validator.middleware.js'
import { coursesSchema } from '../schemas/courses.schema.js'
import { inscribeUsersSchema } from '../schemas/inscribeUsers.schema.js'

const router = Router()

router.get('/', verifyJwt.verifyToken, coursesController.getCourses)
router.get('/:nombres', [verifyJwt.verifyToken, verifyJwt.isSchool], coursesController.getCourseById)
router.post('/', [verifyJwt.verifyToken, verifyJwt.isSchool, validateSchema(coursesSchema), validateCoursename.checkDuplicateName], coursesController.createCourse)
router.put('/:courseId', [verifyJwt.verifyToken, verifyJwt.isSchool], coursesController.updateCourseById)
router.delete('/:courseId', [verifyJwt.verifyToken, verifyJwt.isSchool], coursesController.deleteCourseById)

router.post('/inscribirUsuarios/:courseId', [verifyJwt.verifyToken, verifyJwt.isSchool, validateSchema(inscribeUsersSchema), validateCode.checkDuplicateCode], coursesController.inscribeUserCourses)
router.post('/desinscribirUsuarios/:courseId', [verifyJwt.verifyToken, verifyJwt.isSchool, validateSchema(inscribeUsersSchema), validateUndoCode.checkUndoDuplicateCode], coursesController.undoInscribeUserCourses)


export default router
