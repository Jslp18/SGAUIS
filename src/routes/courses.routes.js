import { Router } from 'express'
import * as coursesController from '../controllers/courses.controller'
import { verifyJwt } from '../middlewares/importer.js'

const router = Router()

router.get('/', coursesController.getCourses)
router.get('/:courseId', coursesController.getCourseById)
router.post('/', [verifyJwt.verifyToken, verifyJwt.isSchool], coursesController.createCourse)
router.put('/:courseId', [verifyJwt.verifyToken, verifyJwt.isSchool], coursesController.updateCourseById)
router.delete('/:courseId', [verifyJwt.verifyToken, verifyJwt.isSchool], coursesController.deleteProductById)

export default router
