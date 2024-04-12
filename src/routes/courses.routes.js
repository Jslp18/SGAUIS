import { Router } from 'express'
import { verifyToken } from '../middlewares/importer.js'
import * as coursesController from '../controllers/courses.controller'
const router = Router()

router.get('/', coursesController.getCourses)
router.get('/:courseId', coursesController.getCourseById)
router.post('/', verifyToken, coursesController.createCourse)
router.put('/:courseId', verifyToken, coursesController.updateCourseById)
router.delete('/:courseId', verifyToken, coursesController.deleteProductById)

export default router
