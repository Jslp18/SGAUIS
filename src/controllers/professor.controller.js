import Courses from '../models/courses.model'
import Users from '../models/users.model'
import InscribeUsersCourses from '../models/inscribeUserCourse.model.js'
import PdfFile from '../models/PDFfile.model.js'
import Content from '../models/content.model.js'
import jwt from 'jsonwebtoken'
import { appConfig } from '../config.js'

export const getProfessorCourses = async (req, res) => {
    const { token } = req.cookies
    if (!token) return res.status(401).json({ message: 'No autorizado.' })
    jwt.verify(token, appConfig.secret, async (err, user) => {
        if (err) return res.status(401).json({ message: 'No autorizado.' })
        const userFound = await Users.findById(user.id)
        if (!userFound) return res.status(401).json({ message: 'No autorizado.' })
        const inscribeUsersCourses = await InscribeUsersCourses.find({ usuarios: userFound._id })
        const coursesIds = inscribeUsersCourses.map(inscribeUsersCourses => inscribeUsersCourses.curso)
        const courses = await Promise.all(coursesIds.map(id => Courses.findById(id)))
        res.status(200).json(courses) // Aquí se retornan los cursos
    })
}

export const getStudentsCourses = async (req, res) => {
    const { courseId } = req.params // Desde req.params se obtiene el courseId (Id del curso)   
    const inscribeUsersCourses = await InscribeUsersCourses.find({ curso: courseId })
    const usersIds = inscribeUsersCourses.map(inscribeUsersCourses => inscribeUsersCourses.usuarios)
    let usersCourse = await Promise.all(usersIds.map(id => Users.find(id)))
    usersCourse = usersCourse.flat()
    const studentsCourse = usersCourse.filter(user => user.rol.toString() === '661a033c50163523e2fe9448');
    res.status(200).json(studentsCourse) // Aquí se retornan los estudiantes matriculados al curso
}

export const uploadContent = async (req, res) => {
    if (!req.file) {
        return res.status(400).send('Error: No se recibió ningún archivo en la solicitud.');
    }
    const { originalname, filename } = req.file
    const { courseId } = req.params // Desde req.params se obtiene el courseId (Id del curso)  
    const { nombre, descripcion } = req.body // Desde el req.boy se obtiene el nombre y la descripción del tema
    const newPDF = PdfFile({ nombre: originalname }) // Para crearlo se crea un curso con estos parámetros
    newPDF.setPdfURL(filename)
    const savedPdfFile = await newPDF.save()
    const newContent = new Content({ nombre, descripcion, pdfFile: savedPdfFile._id, curso: courseId })
    const savedContent = await newContent.save()
    res.status(201).json({
        nombre: savedContent.nombre,
    })
}

export const getContentCourses = async (req, res) => {
    const { courseId } = req.params
    const content = await Content.find({curso: courseId}).populate('pdfFile')
    res.status(200).json(content)
}