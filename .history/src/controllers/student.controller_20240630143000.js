import Courses from '../models/courses.model'
import Users from '../models/users.model'
import InscribeUsersCourses from '../models/inscribeUserCourse.model.js'
import PdfFile from '../models/PDFfile.model.js'
import Content from '../models/content.model.js'
import Homework from '../models/homework.model.js'
import HomeworkSubmission from '../models/homework.model.js'
import Questionnaire from '../models/questionnaires.model.js'
import Forum from '../models/forum.model.js'
import ForumComment from '../models/forumComment.model.js'
import jwt from 'jsonwebtoken'
import { appConfig } from '../config.js'

import moment from 'moment-timezone'

const mongoose = require('mongoose')

export const getStudentCourses = async (req, res) => {
  try {
    const { token } = req.cookies
    if (!token) return res.status(401).json({ message: 'No autorizado.' })

    jwt.verify(token, appConfig.secret, async (err, user) => {
      if (err) return res.status(401).json({ message: 'No autorizado.' })

      const userFound = await Users.findById(user.id)
      if (!userFound) return res.status(401).json({ message: 'No autorizado.' })

      const inscribeUsersCourses = await InscribeUsersCourses.find({ usuarios: userFound._id })
      const coursesIds = inscribeUsersCourses.map(inscribe => inscribe.curso)

      const courses = await Promise.all(coursesIds.map(async id => {
        const course = await Courses.findById(id)

        // Obtener los usuarios inscritos en este curso
        const inscriptions = await InscribeUsersCourses.find({ curso: id })
        const userIds = inscriptions.map(inscription => inscription.usuarios)

        // Obtener los usuarios y filtrar los que tienen el rol de "profesor"
        const users = await Users.find({ _id: { $in: userIds } }).populate('rol')
        const professor = users.find(user => user.rol.nombre === 'Profesor')

        return {
          ...course.toObject(),
          profesor: professor ? {
            nombre: professor.nombre,
            correo: professor.correo,
            // añade otros campos necesarios del profesor aquí
          } : null
        }
      }))
      res.status(200).json(courses)
    })
  } catch (error) {
    console.error('Error al obtener los cursos del estudiante:', error)
    res.status(500).json({ message: 'Error al obtener los cursos del estudiante.' })
  }
}

export const getContentCourses = async (req, res) => {
  try {
    const { courseId } = req.params
    const content = await Content.find({ curso: courseId }).populate('pdfFile')
    res.status(200).json(content)
  } catch (error) {
    console.error('Error al obtener el contenido del curso:', error)
    res.status(500).json({ message: 'Error al obtener el contenido del curso.' })
  }
}

export const getHomeworksCourse = async (req, res) => {
  try {
    const { courseId } = req.params
    const homeworks = await Homework.find({ curso: courseId }).populate('pdfFile')

    // Mapear los resultados para formatear las fechas
    const formattedContent = homeworks.map(hw => ({
      ...hw.toObject(),
      fechaEntrega: formatDateTime(hw.fechaEntrega), // Formatear la fecha
    }))

    res.status(200).json(formattedContent)
  } catch (error) {
    console.error('Error al obtener las tareas del curso:', error)
    res.status(500).json({ message: 'Error al obtener las tareas del curso.' })
  }
}

export const homeworkSubmission = async (req, res) => {
  try {

    const { originalname, filename } = req.file
    const { homeworkId } = req.params // Desde req.params se obtiene el courseId (Id del curso)
    const data = JSON.parse(req.body.data)

    const newPDF = PdfFile({ nombre: originalname }) // Para crearlo se crea un pdf con estos parámetros
    newPDF.setPdfURL(filename)

    const savedPdfFile = await newPDF.save()
    const newHomeworkSubmission = new HomeworkSubmission({ titulo, descripcion, calificacionMaxima, fechaEntrega, pdfFile: savedPdfFile._id, curso: courseId })

    const savedHomeworkSubmission = await newHomeworkSubmission.save()

    res.status(201).json(savedHomeworkSubmission)
  } catch (error) {
    console.error('Error al crear la tarea:', error)
    res.status(500).json({ message: 'Error al crear la tarea.' })
  }
}

export const getForumsCourse = async (req, res) => {
  try {
    const { courseId } = req.params
    const forums = await Forum.find({ curso: courseId })
    res.status(200).json(forums)
  } catch (error) {
    console.error('Error al obtener los foros del curso:', error)
    res.status(500).json({ message: 'Error al obtener los foros del curso.' })
  }
}

export const createCommentForum = async (req, res) => {
  try {
    const { token } = await req.cookies // Se obtiene el token de acceso que viene en el header 'token-acceso'
    if (!token) return res.status(403).json({ message: 'No se proporcionó un token de acceso. Por favor, verifica e intenta de nuevo.' })
    const userToken = jwt.verify(token, appConfig.secret) // Se verifica que el token que es proporcionado, efectivamente es el token que se le había otorgado al usuario
    req.userId = userToken.id
    const {_id: userId} = await Users.findById(req.userId, { password: 0 })
    const { forumId } = req.params // Desde req.params se obtiene el homeworkId (Id de la tarea)
    const data = JSON.parse(req.body.data)
    const { comentario } = data
    const newCommentForum = new ForumComment({ comentario, foro: forumId, usuario:  userId})
    await newCommentForum.save()
    res.sendStatus(201)
  } catch (error) {
    console.error('Error al actualizar el foro:', error)
    res.status(500).send('Error al actualizar el foro')
  }
}

export const getCommentsForum = async (req, res) => {
  try {
    const { forumId } = req.params
    const comments = await ForumComment.find({foro: forumId}).populate('usuario', { password: 0 })
    res.status(200).json(comments)
  } catch (error) {
    console.error('Error al obtener el foro:', error)
    res.status(500).json({ message: 'Error al obtener el foro.' })
  }
}


function formatDateTime(date) {
  try {
    return moment(date).tz('America/Bogota').format('DD/MM/YYYY, h:mm a')
  } catch (error) {
    console.error('Error al formatear la fecha:', error)
    return date // Devolver la fecha original en caso de error
  }
}

function formatTime(timeString) {
  try {
    // Convertir la hora desde formato 24 horas a formato 12 horas (AM/PM)
    return moment(timeString, 'HH:mm').format('hh:mm A')
  } catch (error) {
    console.error('Error al formatear la hora:', error)
    return timeString // Devolver la hora original en caso de error
  }
}

function formatDate(date) {
  try {
    return moment(date).tz('UTC').format('DD/MM/YYYY')
  } catch (error) {
    console.error('Error al formatear la fecha:', error)
    return date // Devolver la fecha original en caso de error
  }
}