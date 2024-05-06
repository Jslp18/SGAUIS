import Courses from '../models/courses.model'
import Users from '../models/users.model'
import InscribeUsersCourses from '../models/inscribeUserCourse.model.js'
import jwt from 'jsonwebtoken'
import { appConfig } from '../config.js'

export const getProfessorCourses = async (req, res) => {
    const { token } = req.cookies
    if (!token) return res.status(401).json({ message: 'No autorizado.' })
    jwt.verify(token, appConfig.secret, async (err, user) => {
        if (err) return res.status(401).json({ message: 'No autorizado.' })
        const userFound = await Users.findById(user.id)
        if (!userFound) return res.status(401).json({ message: 'No autorizado.' })
        const inscribeUsersCourses = await InscribeUsersCourses.find({ users: userFound._id })
        const coursesIds = inscribeUsersCourses.map(inscribeUsersCourses => inscribeUsersCourses.courses)
        const courses = await Promise.all(coursesIds.map(id => Courses.findById(id)))
        res.status(200).json(courses) // Aquí se retornan los cursos
    })
}

export const getStudentsCourses = async (req, res) => {
    const { courseId } = req.params // Desde req.params se obtiene el courseId (Id del curso)   
    const inscribeUsersCourses = await InscribeUsersCourses.find({ courses: courseId })
    const usersIds = inscribeUsersCourses.map(inscribeUsersCourses => inscribeUsersCourses.users)
    let usersCourse = await Promise.all(usersIds.map(id => Users.find(id)))
    usersCourse = usersCourse.flat();
    const studentsCourse = usersCourse.filter(user => user.rol.toString() === '661a033c50163523e2fe9448');
    res.status(200).json(studentsCourse) // Aquí se retornan los estudiantes matriculados al curso
}

export const uploadContent = async (req, res) => {
    const { courseId } = req.params // Desde req.params se obtiene el courseId (Id del curso)  
    console.log(req.file)
}
