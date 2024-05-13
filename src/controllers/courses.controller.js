import Courses from '../models/courses.model'
import Roles from '../models/roles.model.js'
import Users from '../models/users.model'
import InscribeUsersCourses from '../models/inscribeUserCourse.model.js'
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
  const { token } = req.cookies
  if (!token) return res.status(401).json({ message: 'No autorizado.' })
  jwt.verify(token, appConfig.secret, async (err, user) => {
    if (err) return res.status(401).json({ message: 'No autorizado.' })
    const userFound = await Users.findById(user.id)
    if (!userFound) return res.status(401).json({ message: 'No autorizado.' })
    const { nombres } = req.params
    const regex = new RegExp(`^${nombres}`, 'i')
    try {
      const courses = await Courses.find({ nombre: regex, creadoPor: userFound._id })
      res.status(200).json(courses)
    } catch (error) {
      console.error('Error al buscar cursos:', error)
      res.status(500).json({ error: 'Error al buscar cursos' })
    }
  })
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

export const deleteCourseById = async (req, res) => {
  const { courseId } = req.params // Desde req.params se obtiene el courseId (Id del curso)
  const inscribeUsersCourses = await InscribeUsersCourses.find({ curso: courseId })
  await Promise.all(inscribeUsersCourses.map(id => InscribeUsersCourses.findByIdAndDelete(id)))
  await Courses.findByIdAndDelete(courseId) // Se elimina el curso por medio del courseId
  res.sendStatus(204) // No se retornada nada como respuesta de la eliminación exitosa */
}

export const inscribeUserCourses = async (req, res) => {
  const { courseId } = req.params // Desde req.params se obtiene el courseId (Id del curso)
  const { codigo } = req.body
  const userFound = await Users.findOne({codigo})
  const rol = await Roles.findById(userFound.rol)
  const inscribedUser = new InscribeUsersCourses({ usuarios: userFound._id, curso: courseId})
  await inscribedUser.save()
  res.status(201).json({
    nombre: userFound.nombre,
    rol: rol.nombre
  })
}

export const undoInscribeUserCourses = async (req, res) => {
  const { courseId } = req.params // Desde req.params se obtiene el courseId (Id del curso)
  const { codigo } = req.body
  const userFound = await Users.findOne({codigo})
  const courseFound = await Courses.findById(courseId)
  const rol = await Roles.findById(userFound.rol)
  const inscribeUsersCourses = await InscribeUsersCourses.findOneAndDelete({ usuarios: userFound._id, curso: courseId })
  if(!inscribeUsersCourses) { return res.status(404).json({ message: `Lo siento, pero el usuario con código ${codigo} no se encuentra matriculado  en el curso ${courseFound.nombre}` })}
  res.status(201).json({
    nombre: userFound.nombre,
    rol: rol.nombre
  })
}
