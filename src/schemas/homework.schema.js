import { z } from 'zod'

const isTodayOrLater = (dateString) => {
  const inputDate = new Date(dateString)
  const today = new Date()

  if (inputDate < today) {
    return false; // Fecha anterior al día actual
  } else {
    return true; // Fecha igual o posterior al día actual
  }
}

export const homeworkSchema = z.object({
  nombre: z.string({
    required_error: 'El nombre del curso es necesario para el registro.'
  }).min(1, { message: 'El nombre debe contener mínimo 1 caracter.' })
    .max(50, { message: 'El nombre debe contener máximo 50 caracteres.' }),
  calificacionMaxima: z.number({
    required_error: 'La calificación máxima es requerida.',
    invalid_type_error: 'La calificación máxima debe ser un número de precisión doble.'
  }),
  descripcion: z.string({
    required_error: 'La descripción es requerida.'
  }).min(20, { message: 'La descripción debe contener al menos 20 caracteres' }).
    max(200, { message: 'La descripción tiene una longitud máxima de 200 caracteres.' }),
  fecha: z.string({
    required_error: 'La fecha es requerida'
  }).refine(value => isTodayOrLater(value), {
    message: 'La fecha y hora no pueden ser anterior a la actual.'
  })
})
