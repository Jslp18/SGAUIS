import { Router } from 'express';
import * as coursesController from '../controllers/courses.controller';
const router = Router()



router.get('/', coursesController.getCourses)
router.get('/:courseId', coursesController.getCourseById)
router.post('/', coursesController.createCourse)
router.put('/:courseId', coursesController.updateCourseById)
router.delete('/:courseId', coursesController.deleteProductById)

export default router