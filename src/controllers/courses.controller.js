import Courses from '../models/courses.model'

export const getCourses = async (req, res) => {
  const courses = await Courses.find() // El método find busca todos los cursos que hayan
  res.status(200).json(courses) // Aquí se retornan los cursos
}

export const getCourseById = async (req, res) => {
  const { courseId } = req.params // Desde req.params se obtiene el courseId (Id del curso)
  const course = await Courses.findById(courseId) // req.params.courseId es el id que se pasa como ruta así: http://localhost:1721/courses/courseId
  res.status(200).json(course) // Aquí se retorna el curso si lo encontró con ese ID
}

export const createCourse = async (req, res) => {
  const { nombre, descripcion, imagenUrl } = req.body // Desde el req.boy se obtiene el nombre, descripción e imagenUrl
  const newCourse = new Courses({ nombre, descripcion, imagenUrl }) // Para crearlo se crea un curso con estos parámetros
  const savedCourse = await newCourse.save() // Aquí se guarda en base de datos
  res.status(201).json(savedCourse) // Aquí se retorna el curso recién creado
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
