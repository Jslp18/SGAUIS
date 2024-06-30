import Courses from '../models/courses.model'
import Users from '../models/users.model'
import InscribeUsersCourses from '../models/inscribeUserCourse.model.js'
import PdfFile from '../models/PDFfile.model.js'
import Content from '../models/content.model.js'
import Homework from '../models/homework.model.js'
import Questionnaire from '../models/questionnaires.model.js'
import Forum from '../models/forum.model.js'
import Answers from '../models/answer.model.js'
import Questions from '../models/questions.model.js'
import QuestionsAnswers from '../models/questionsAnswers.model.js'
import jwt from 'jsonwebtoken'
import { appConfig } from '../config.js'

import moment from 'moment-timezone'

import fs from 'fs'
import path from 'path'

const mongoose = require('mongoose')

export const getProfessorCourses = async (req, res) => {
  try {
    const { token } = req.cookies
    if (!token) return res.status(401).json({ message: 'No autorizado.' })

    jwt.verify(token, appConfig.secret, async (err, user) => {
      if (err) return res.status(401).json({ message: 'No autorizado.' })

      const userFound = await Users.findById(user.id)
      if (!userFound) return res.status(401).json({ message: 'No autorizado.' })

      const inscribeUsersCourses = await InscribeUsersCourses.find({ usuarios: userFound._id })
      const coursesIds = inscribeUsersCourses.map(inscribe => inscribe.curso)
      const courses = await Promise.all(coursesIds.map(id => Courses.findById(id)))
      res.status(200).json(courses) // Aquí se retornan los cursos
    })
  } catch (error) {
    console.error('Error al obtener los cursos del profesor:', error)
    res.status(500).json({ message: 'Error al obtener los cursos del profesor.' })
  }
}

export const getStudentsCourses = async (req, res) => {
  try {
    const { courseId } = req.params // Desde req.params se obtiene el courseId (Id del curso)

    const inscribeUsersCourses = await InscribeUsersCourses.find({ curso: courseId })
    const usersIds = inscribeUsersCourses.map(inscribe => inscribe.usuarios)

    let usersCourse = await Promise.all(usersIds.map(id => Users.find(id)))
    usersCourse = usersCourse.flat()

    const studentsCourse = usersCourse.filter(user => user.rol.toString() === '661a033c50163523e2fe9448')

    res.status(200).json(studentsCourse) // Aquí se retornan los estudiantes matriculados al curso
  } catch (error) {
    console.error('Error al obtener los estudiantes del curso:', error)
    res.status(500).json({ message: 'Error al obtener los estudiantes del curso.' })
  }
}

export const createContent = async (req, res) => {
  try {
    const { originalname, filename } = req.file
    const { courseId } = req.params // Desde req.params se obtiene el courseId (Id del curso)
    const { nombre, descripcion } = req.body // Desde el req.body se obtiene el nombre y la descripción del tema

    const newPDF = PdfFile({ nombre: originalname }) // Para crearlo se crea un pdf con estos parámetros
    newPDF.setPdfURL(filename)

    const savedPdfFile = await newPDF.save()
    const newContent = new Content({ nombre, descripcion, pdfFile: savedPdfFile._id, curso: courseId })

    const savedContent = await newContent.save()

    res.status(201).json({
      nombre: savedContent.nombre
    })
  } catch (error) {
    console.error('Error al crear el contenido:', error)
    res.status(500).json({ message: 'Error al crear el contenido.' })
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

export const createHomework = async (req, res) => {
  try {
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
  } catch (error) {
    console.error('Error al crear la tarea:', error)
    res.status(500).json({ message: 'Error al crear la tarea.' })
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

export const getHomeworkCourse = async (req, res) => {
  try {
    const { homeworkId } = req.params
    const homework = await Homework.findById(homeworkId).populate('pdfFile')
    res.status(200).json(homework)
  } catch (error) {
    console.error('Error al obtener la tarea:', error)
    res.status(500).json({ message: 'Error al obtener la tarea.' })
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
    const filePath = path.join(__dirname, `../libs/pdf/${fileName}`)
    fs.unlinkSync(filePath)

    // Consulta para reemplazar primero en la colección pdfFiles
    const updatePdfFile = await PdfFile.findByIdAndUpdate(pdf._id, { nombre: originalname, pdfURL: filename })

    // Consulta para reemplazar en segundo lugar la colección homeworks
    const updatedHomework = await Homework.findByIdAndUpdate(homeworkId, { nombre, descripcion, calificacionMaxima, fechaEntrega, pdfFile: updatePdfFile._id }, { new: true })

    // Enviar la tarea actualizada al frontend
    res.status(200).json(updatedHomework)
  } catch (error) {
    console.error('Error al actualizar la tarea:', error)
    res.status(500).send('Error al actualizar la tarea')
  }
}

export const deleteHomework = async (req, res) => {
  try {
    const { homeworkId } = req.params // Desde req.params se obtiene el courseId (Id de la tarea)
    const { pdfFile } = await Homework.findById(homeworkId)
    const { pdfURL } = await PdfFile.findById(pdfFile._id)
    const fileName = pdfURL.split('/').pop()
    const filePath = path.join(__dirname, `../libs/pdf/${fileName}`)
    fs.unlinkSync(filePath)

    await PdfFile.findByIdAndDelete(pdfFile)
    await Homework.findByIdAndDelete(homeworkId)

    res.sendStatus(204)
  } catch (error) {
    console.error('Error al eliminar la tarea:', error)
    res.status(500).send('Error al eliminar la tarea')
  }
}

export const createQuestionnaire = async (req, res) => {
  const { courseId } = req.params // Obtener el courseId desde req.params
  const data = JSON.parse(req.body.data)
  const { nombre, descripcion, calificacionMaxima, fecha, tiempoInicial, tiempoFinal, preguntas } = data
  try {
    // Crear y guardar el cuestionario
    const newQuestionnaire = new Questionnaire({
      nombre,
      descripcion,
      calificacionMaxima,
      fecha: new Date(fecha).toISOString(),
      tiempoInicial,
      tiempoFinal,
      curso: courseId,
    })
    const savedQuestionnaire = await newQuestionnaire.save()
    // Mapear preguntas y respuestas
    const questionsPromises = preguntas.map(async (preguntaData) => {
      const { pregunta, respuestas } = preguntaData
      // Crear y guardar la pregunta
      const newQuestion = new Questions({
        pregunta,
        cuestionario: savedQuestionnaire._id,
      })
      const savedQuestion = await newQuestion.save()
      // Mapear respuestas
      const answersPromises = respuestas.map(async (respuestaData) => {
        const { respuesta, esCorrecta } = respuestaData

        // Crear y guardar la respuesta
        const newAnswer = new Answers({
          respuesta,
          esCorrecta,
        })
        const savedAnswer = await newAnswer.save()
        // Crear y guardar la relación pregunta-respuesta
        const newQuestionAnswer = new QuestionsAnswers({
          pregunta: savedQuestion._id,
          respuesta: savedAnswer._id,
        })
        await newQuestionAnswer.save()
      })
      await Promise.all(answersPromises)
    })
    await Promise.all(questionsPromises)
    res.status(201).json({
      nombre: savedQuestionnaire.nombre
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error al crear el cuestionario' })
  }
}

export const getQuestionnairesCourse = async (req, res) => {
  try {
    const { courseId } = req.params
    const questionnaire = await Questionnaire.find({ curso: courseId })
    // Mapear los resultados para formatear las fechas y horas
    const formattedContent = questionnaire.map(qs => ({
      ...qs.toObject(),
      fecha: formatDate(qs.fecha), // Formatear la fecha
      tiempoInicial: formatTime(qs.tiempoInicial), // Formatear la hora inicial
      tiempoFinal: formatTime(qs.tiempoFinal), // Formatear la hora final
    }))

    res.status(200).json(formattedContent)
  } catch (error) {
    console.error('Error al obtener los cuestionarios del curso:', error)
    res.status(500).json({ message: 'Error al obtener los cuestionarios del curso.' })
  }
}

export const getQuestionnaireCourse = async (req, res) => {
  try {
    const { questionnaireId } = req.params
    // Encontrar el cuestionario por ID
    const questionnaire = await Questionnaire.findById(questionnaireId)
    if (!questionnaire) {
      return res.status(404).json({ message: 'Cuestionario no encontrado' })
    }
    // Encontrar las preguntas asociadas con el cuestionario y ordenarlas por ObjectId
    const questions = await Questions.find({ cuestionario: questionnaireId }).sort({ _id: 1 })
    // Crear un arreglo de promesas para obtener las respuestas de cada pregunta
    const questionsWithAnswers = await Promise.all(
      questions.map(async (question) => {
        // Encontrar las relaciones de QuestionsAnswers para la pregunta actual
        const questionsAnswers = await QuestionsAnswers.find({ pregunta: question._id }).sort({ respuesta: 1 })
        // Crear un arreglo de promesas para obtener las respuestas
        const answers = await Promise.all(
          questionsAnswers.map(async (qa) => {
            const answer = await Answers.findById(qa.respuesta)
            return {
              id: answer._id,
              respuesta: answer.respuesta,
              esCorrecta: answer.esCorrecta,
            }
          })
        )
        return {
          id: question._id,
          pregunta: question.pregunta,
          respuestas: answers
        }
      })
    )
    // Formatear el cuestionario con las preguntas y respuestas
    const formattedQuestionnaire = {
      nombre: questionnaire.nombre,
      descripcion: questionnaire.descripcion,
      calificacionMaxima: questionnaire.calificacionMaxima,
      fecha: questionnaire.fecha,
      tiempoInicial: questionnaire.tiempoInicial,
      tiempoFinal: questionnaire.tiempoFinal,
      preguntas: questionsWithAnswers,
    }
    res.status(200).json(formattedQuestionnaire)
  } catch (error) {
    console.error('Error al obtener el cuestionario:', error)
    res.status(500).json({ message: 'Error al obtener el cuestionario.' })
  }
}

export const editQuestionnaire = async (req, res) => {
  const { questionnaireId } = req.params
  const data = JSON.parse(req.body.data)
  const { nombre, descripcion, calificacionMaxima, fecha, tiempoInicial, tiempoFinal, preguntas } = data

  try {
    // Actualizar preguntas y respuestas en paralelo
    const updatePromises = preguntas.map(async (preguntaData) => {
      let preguntaId // Declaración de preguntaId fuera del bloque if

      const { id: preguntaIdFromData, pregunta, respuestas } = preguntaData

      // Actualizar o crear la pregunta
      let updateQuestionPromise
      if (preguntaIdFromData) {
        // Actualizar pregunta existente
        updateQuestionPromise = await Questions.findByIdAndUpdate(preguntaIdFromData, { pregunta })
        preguntaId = preguntaIdFromData // Asignación de preguntaId solo si existe en los datos
      } else {
        // Crear nueva pregunta
        const newQuestion = new Questions({ pregunta, cuestionario: questionnaireId })
        const savedQuestion = await newQuestion.save()
        preguntaId = savedQuestion._id // Obtener el ID de la nueva pregunta
      }

      // Actualizar las respuestas de la pregunta
      const updateAnswersPromises = respuestas.map(async (respuestaData) => {
        let respuestaId // Declaración de respuestaId fuera del bloque if
        const { id: respuestaIdFromData, respuesta: respuestaText, esCorrecta } = respuestaData

        // Actualizar o crear la respuesta
        let updateAnswerPromise
        if (respuestaIdFromData) {
          // Actualizar respuesta existente
          updateAnswerPromise = await Answers.findByIdAndUpdate(respuestaIdFromData, { respuesta: respuestaText, esCorrecta })
          respuestaId = respuestaIdFromData // Asignación de respuestaId solo si existe en los datos
        } else {
          // Crear nueva respuesta
          const newAnswer = new Answers({ respuesta: respuestaText, esCorrecta })
          const savedAnswer = await newAnswer.save()
          respuestaId = savedAnswer._id // Obtener el ID de la nueva respuesta
        }

        // Actualizar o crear la relación pregunta-respuesta
        let questionAnswerPromise
        if (preguntaId && respuestaId) {
          // Buscar si ya existe la relación pregunta-respuesta
          const existingQuestionAnswer = await QuestionsAnswers.findOne({ pregunta: preguntaId, respuesta: respuestaId })
          if (!existingQuestionAnswer) {
            // Si no existe, crearla
            const newQuestionAnswer = new QuestionsAnswers({ pregunta: preguntaId, respuesta: respuestaId })
            questionAnswerPromise = await newQuestionAnswer.save()
          }
        }
        return questionAnswerPromise
      })

      // Esperar a que se completen todas las actualizaciones de respuestas y relaciones
      await Promise.all(updateAnswersPromises)

      // Devolver la promesa de actualización de pregunta
      return updateQuestionPromise
    })

    // Esperar a que se completen todas las actualizaciones de preguntas
    await Promise.all(updatePromises)

    // Actualizar el cuestionario
    const updatedQuestionnaire = await Questionnaire.findByIdAndUpdate(questionnaireId, {
      nombre,
      descripcion,
      calificacionMaxima,
      fecha: new Date(fecha).toISOString(),
      tiempoInicial,
      tiempoFinal
    }, { new: true })

    res.status(200).json(updatedQuestionnaire)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error al actualizar el cuestionario' })
  }
}

export const deleteQuestionnaire = async (req, res) => {
  const session = await mongoose.startSession()
  session.startTransaction()
  try {
    const { questionnaireId } = req.params
    // Encontrar las preguntas relacionadas con el cuestionario
    const questions = await Questions.find({ cuestionario: questionnaireId }).session(session)
    if (questions.length > 0) {
      // Obtener los IDs de las preguntas
      const questionIds = questions.map(q => q._id)
      // Encontrar las relaciones QuestionsAnswers relacionadas con las preguntas
      const questionsAnswers = await QuestionsAnswers.find({ pregunta: { $in: questionIds } }).session(session)
      if (questionsAnswers.length > 0) {
        // Obtener los IDs de las respuestas
        const answerIds = questionsAnswers.map(qa => qa.respuesta)
        // Eliminar las relaciones QuestionsAnswers
        await QuestionsAnswers.deleteMany({ pregunta: { $in: questionIds } }).session(session)
        // Eliminar respuestas
        await Answers.deleteMany({ _id: { $in: answerIds } }).session(session)
      }
      // Eliminar preguntas
      await Questions.deleteMany({ _id: { $in: questionIds } }).session(session)
    }
    // Eliminar el cuestionario
    await Questionnaire.findByIdAndDelete(questionnaireId).session(session)
    // Commit de la transacción
    await session.commitTransaction()
    session.endSession()
    res.sendStatus(204)
  } catch (error) {
    await session.abortTransaction()
    session.endSession()
    console.error('Error al eliminar el cuestionario:', error)
    res.status(500).send('Error al eliminar el cuestionario')
  }
}

export const createForum = async (req, res) => {
  try {
    const { courseId } = req.params // Desde req.params se obtiene el courseId (Id del curso)
    const data = JSON.parse(req.body.data)
    const { titulo, descripcion } = data
    const newForum = new Forum({ titulo, descripcion, curso: courseId })
    const savedForum = await newForum.save()
    res.status(201).json({
      nombre: savedForum.titulo
    })
  } catch (error) {
    console.error('Error al crear el foro:', error)
    res.status(500).json({ message: 'Error al crear el foro.' })
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

export const getForumCourse = async (req, res) => {
  try {
    const { forumId } = req.params
    const forum = await Forum.findById(forumId)
    res.status(200).json(forum)
  } catch (error) {
    console.error('Error al obtener el foro:', error)
    res.status(500).json({ message: 'Error al obtener el foro.' })
  }
}

export const editForum = async (req, res) => {
  try {
    const { forumId } = req.params // Desde req.params se obtiene el homeworkId (Id de la tarea)
    const data = JSON.parse(req.body.data)
    const { titulo, descripcion } = data

    // Consulta para reemplazar en segundo lugar la colección homeworks
    const updatedForum = await Forum.findByIdAndUpdate(forumId, { titulo, descripcion }, { new: true })

    // Enviar la tarea actualizada al frontend
    res.status(200).json(updatedForum)
  } catch (error) {
    console.error('Error al actualizar el foro:', error)
    res.status(500).send('Error al actualizar el foro')
  }
}

export const deleteForum = async (req, res) => {
  try {
    const { forumId } = req.params // Desde req.params se obtiene el courseId (Id de la tarea)
    await 
    await Forum.findByIdAndDelete(forumId)
    res.sendStatus(204)
  } catch (error) {
    console.error('Error al eliminar el foro:', error)
    res.status(500).send('Error al eliminar el foro')
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

