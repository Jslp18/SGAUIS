import { z } from 'zod'
import { toDate } from 'date-fns-tz' 

const isTodayOrLater = (dateString) => {
  console.log(dateString)
  const timeZone = 'America/Bogota'  // zona horaria

  // Convertir la fecha de entrada a una fecha en la zona horaria especificada
  const inputDate = toDate(dateString, { timeZone }) 

  // Obtener la fecha y hora actual en la zona horaria especificada
  const now = new Date() 
  const nowInTimeZone = toDate(now, { timeZone }) 

  // Comparar las fechas
  return inputDate >= nowInTimeZone 
} 

export const homeworkSchema = z.object({
  nombre: z.string({
    required_error: 'El nombre del curso es necesario para el registro.'
  }).min(1, { message: 'El nombre debe contener mínimo 1 caracter.' })
    .max(50, { message: 'El nombre debe contener máximo 50 caracteres.' }),
  calificacionMaxima: z.number({
    required_error: 'La calificación máxima es requerida.',
    invalid_type_error: 'La calificación máxima debe ser un número de precisión doble.'
  }).min(0, { message: 'La calificación máxima es de mínimo 0' })
    .max(5.0, { message: 'La calificación máxima es de máximo 5.0' }),
  descripcion: z.string({
    required_error: 'La descripción es requerida.'
  }).min(20, { message: 'La descripción debe contener al menos 20 caracteres' })
    .max(200, { message: 'La descripción tiene una longitud máxima de 200 caracteres.' }),
  fecha: z.string({
    required_error: 'La fecha es requerida'
  }).refine(value => isTodayOrLater(value), {
    message: 'La fecha y hora no pueden ser anterior a la actual.'
  })
})
