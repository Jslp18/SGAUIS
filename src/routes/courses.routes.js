import { Router } from 'express'
import * as coursesController from '../controllers/courses.controller'
import { verifyJwt } from '../middlewares/importer.js'
import { validateSchema } from '../middlewares/validator.middleware.js'
import { coursesSchema } from '../schemas/courses.schema.js'

const router = Router()

router.get('/', verifyJwt.verifyToken, coursesController.getCourses)
router.get('/:courseId', verifyJwt.verifyToken, coursesController.getCourseById)
router.post('/', [verifyJwt.verifyToken, verifyJwt.isSchool, validateSchema(coursesSchema)], coursesController.createCourse)
router.put('/:courseId', [verifyJwt.verifyToken, verifyJwt.isSchool], coursesController.updateCourseById)
router.delete('/:courseId', [verifyJwt.verifyToken, verifyJwt.isSchool], coursesController.deleteProductById)

export default router
