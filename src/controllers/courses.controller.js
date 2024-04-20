import Courses from '../models/courses.model'
import Users from '../models/users.model'
import jwt from 'jsonwebtoken'
import { appConfig } from '../config.js'

export const getCourses = async (req, res) => {
  const { token } = req.cookies
  if (!token) return res.status(401).json({ message: 'No autorizado.' })
  jwt.verify(token, appConfig.secret, async (err, user) => {
    if (err) return res.status(401).json({ message: 'No autorizado.' })
    const userFound = await Users.findById(user.id)
    if (!userFound) return res.status(401).json({ message: 'No autorizado.' })
    const courses = await Courses.find({ creadoPor: userFound._id }) // El método find busca todos los cursos que hayan
    res.status(200).json(courses) // Aquí se retornan los cursos
  })
}

export const getCourseById = async (req, res) => {
  const { courseId } = req.params // Desde req.params se obtiene el courseId (Id del curso)
  const course = await Courses.findById(courseId) // req.params.courseId es el id que se pasa como ruta así: http://localhost:1721/courses/courseId
  res.status(200).json(course) // Aquí se retorna el curso si lo encontró con ese ID
}

export const createCourse = async (req, res) => {
  const { token } = req.cookies
  const { nombre, descripcion, imagenURL } = req.body // Desde el req.boy se obtiene el nombre, descripción e imagenUrl
  if (!token) return res.status(401).json({ message: 'No autorizado.' })
  jwt.verify(token, appConfig.secret, async (err, user) => {
    if (err) return res.status(401).json({ message: 'No autorizado.' })
    const userFound = await Users.findById(user.id)
    if (!userFound) return res.status(401).json({ message: 'No autorizado.' })
    const creadoPor = userFound._id
    const newCourse = new Courses({ nombre, descripcion, imagenURL, creadoPor }) // Para crearlo se crea un curso con estos parámetros
    const savedCourse = await newCourse.save() // Aquí se guarda en base de datos
    res.status(201).json(savedCourse) // Aquí se retorna el curso recién creado
  })
}

export const updateCourseById = async (req, res) => {
  const { courseId } = req.params // Desde req.params se obtiene el courseId (Id del curso)
  const updatedCourse = await Courses.findByIdAndUpdate(courseId, req.body, { new: true }) // El parámetro new: true permite retornar el curso actualizado
  res.status(200).json(updatedCourse) // Aquí se retorna el curso actualizado
}

export const deleteProductById = async (req, res) => {
  const { courseId } = req.params // Desde req.params se obtiene el courseId (Id del curso)
  await Courses.findByIdAndDelete(courseId) // Se elimina el curso por medio del courseId
  res.status(204) // No se retornada nada como respuesta de la eliminación exitosa
}
