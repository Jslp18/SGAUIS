import Courses from '../models/courses.model'
import Users from '../models/users.model'
import InscribeUsersCourses from '../models/inscribeUserCourse.model.js'
import PdfFile from '../models/PDFfile.model.js'
import Content from '../models/content.model.js'
import Homework from '../models/homework.model.js'
import jwt from 'jsonwebtoken'
import { appConfig } from '../config.js'

import fs from 'fs'
import path from 'path'

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

export const createContent = async (req, res) => {
    const { originalname, filename } = req.file
    const { courseId } = req.params // Desde req.params se obtiene el courseId (Id del curso)  
    const { nombre, descripcion } = req.body // Desde el req.boy se obtiene el nombre y la descripción del tema
    const newPDF = PdfFile({ nombre: originalname }) // Para crearlo se crea un pdf con estos parámetros
    newPDF.setPdfURL(filename)
    const savedPdfFile = await newPDF.save()
    const newContent = new Content({ nombre, descripcion, pdfFile: savedPdfFile._id, curso: courseId })
    const savedContent = await newContent.save()
    res.status(201).json({
        nombre: savedContent.nombre
    })
}

export const getContentCourses = async (req, res) => {
    const { courseId } = req.params
    const content = await Content.find({ curso: courseId }).populate('pdfFile')
    res.status(200).json(content)
}

export const createHomework = async (req, res) => {
    const { originalname, filename } = req.file
    const { courseId } = req.params // Desde req.params se obtiene el courseId (Id del curso) 
    const data = JSON.parse(req.body.data)
    const { nombre, descripcion, calificacionMaxima, fecha } = data
    const fechaEntrega = new Date(fecha).toISOString()
    const newPDF = PdfFile({ nombre: originalname }) // Para crearlo se crea un pdf con estos parámetros
    newPDF.setPdfURL(filename)
    const savedPdfFile = await newPDF.save()
    const newTarea = new Homework({ nombre, descripcion, calificacionMaxima, fechaEntrega, pdfFile: savedPdfFile._id, curso: courseId })
    const savedTarea = await newTarea.save()
    res.status(201).json({
        nombre: savedTarea.nombre
    })
}

export const getHomeworksCourse = async (req, res) => {
    try {
        const { courseId } = req.params
        const homework = await Homework.find({ curso: courseId }).populate('pdfFile')
        // Mapear los resultados para formatear las fechas
        const formattedContent = homework.map(homework => ({
            ...homework.toObject(),
            fechaEntrega: formatDate(homework.fechaEntrega) // Formatear la fecha
        }))
        res.status(200).json(formattedContent)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Ha ocurrido un error al obtener las tareas.' })
    }
}

export const getHomeworkCourse = async (req, res) => {
    try {
        const { homeworkId } = req.params
        const homework = await Homework.findById(homeworkId).populate('pdfFile')
        res.status(200).json(homework)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Ha ocurrido un error al obtener las tareas.' })
    }
}

export const editHomework = async (req, res) => {
    try {
        const { originalname, filename } = req.file
        const { homeworkId } = req.params // Desde req.params se obtiene el homeworkId (Id de la tarea)  
        const data = JSON.parse(req.body.data)
        const { nombre, descripcion, calificacionMaxima, fecha } = data
        const fechaEntrega = new Date(fecha).toISOString()
        // Consulta para eliminar la ruta estática del pdf (Debido a que la ruta estática que está llegando es la nueva)
        const homework = await Homework.findById(homeworkId)
        const pdf = await PdfFile.findById(homework.pdfFile)
        const fileName = pdf.pdfURL.split('/').pop()
        const filePath = path.join(__dirname, `../libs/pdf/${fileName}`);
        fs.unlinkSync(filePath)
        // Consulta para reemplazar primero en la colección pdfFiles
        const updatePdfFile = await PdfFile.findByIdAndUpdate(pdf._id, { nombre: originalname, pdfURL: filename })
        // Consulta para reemplazar en segundo lugar la colección homeworks
        const updatedHomework = await Homework.findByIdAndUpdate(homeworkId, { nombre, descripcion, calificacionMaxima, fechaEntrega, pdfFile: updatePdfFile._id })
        // Enviar la tarea actualizada al frontend
        res.status(200).json(updatedHomework)
    } catch (error) {
        console.error("Error al actualizar la tarea:", error)
        res.status(500).send("Error al actualizar la tarea")
    }
}

export const deleteHomework = async (req, res) => {
    try {
        const { homeworkId } = req.params // Desde req.params se obtiene el courseId (Id de la tarea)
        const { pdfFile } = await Homework.findById(homeworkId)
        const { pdfURL } = await PdfFile.findById(pdfFile._id)
        const fileName = pdfURL.split('/').pop()
        const filePath = path.join(__dirname, `../libs/pdf/${fileName}`);
        fs.unlinkSync(filePath)
        await PdfFile.findByIdAndDelete(pdfFile)
        await Homework.findByIdAndDelete(homeworkId)
        res.sendStatus(204)
    }
    catch (error) {
        console.error("Error al eliminar la tarea:", error);
        res.status(500).send("Error al eliminar la tarea");
    }
}

function formatDate(date) {
    // Formato personalizado para Colombia
    return new Date(date).toLocaleString('es-CO', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true // Utilizar formato de 12 horas
    });
}

