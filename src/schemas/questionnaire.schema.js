import { z } from 'zod'

// Función para validar que la fecha sea igual o posterior a la fecha actual
const isTodayOrLater = (dateString) => {
  // Convertir la cadena de fecha a un objeto Date
  const inputDate = new Date(dateString)
  // Obtener el día del mes en UTC para la fecha de entrada
  const inputDay = inputDate.getUTCDate()
  // Obtener el día del mes en UTC para la fecha actual
  const today = new Date()
  const todayDay = today.getDate()
  // Comparar los días del mes
  return inputDay >= todayDay
}

export const questionnaireSchema = z.object({
  nombre: z.string({
    required_error: 'El nombre del curso es necesario para el registro.'
  }).min(1, { message: 'El nombre debe contener mínimo 1 caracter.' })
    .max(50, { message: 'El nombre debe contener máximo 50 caracteres.' }),
  calificacionMaxima: z.number({
    required_error: 'La calificación máxima es requerida.',
    invalid_type_error: 'La calificación máxima debe ser un número de precisión doble.'
  }).min(0, { message: 'La calificación máxima es de mínimo 0.' })
    .max(5.0, { message: 'La calificación máxima es de máximo 5.0.' }),
  descripcion: z.string({
    required_error: 'La descripción es requerida.'
  }).min(20, { message: 'La descripción debe contener al menos 20 caracteres.' })
    .max(200, { message: 'La descripción tiene una longitud máxima de 200 caracteres.' }),
  fecha: z.string({
    required_error: 'La fecha es requerida.'
  }).refine(value => isTodayOrLater(value), {
    message: 'La fecha no puede ser anterior a la actual.'
  }),
  preguntas: z.array(z.object({
    pregunta: z.string().min(1, { message: 'La pregunta no puede estar vacía.' }),
    respuestas: z.array(z.object({
      respuesta: z.string().min(1, { message: 'La respuesta no puede estar vacía.' }),
      esCorrecta: z.boolean()
    })).min(1, { message: 'Debe haber al menos una respuesta.' })
  })).min(1, { message: 'Debe haber al menos una pregunta.' }).refine((preguntas) => {
    // Verificar que cada pregunta tenga al menos una respuesta
    const invalidPreguntaIndices = preguntas
      .map((pregunta, index) => ({
        index,
        valid: pregunta.respuestas.length > 0
      }))
      .filter(item => !item.valid)
      .map(item => item.index)

    if (invalidPreguntaIndices.length > 0) {
      throw new z.ZodError(invalidPreguntaIndices.map(index => ({
        path: ['preguntas', index, 'respuestas'],
        message: `Debe haber al menos una respuesta en la pregunta ${index + 1}.`
      })))
    }
    return true
  }, {
    message: 'Cada pregunta debe tener al menos una respuesta.'
  }).refine((preguntas) => {
    // Verificar que al menos una de las respuestas sea correcta
    const invalidPreguntaIndices = preguntas
      .map((pregunta, index) => ({
        index,
        valid: pregunta.respuestas.some(respuesta => respuesta.esCorrecta)
      }))
      .filter(item => !item.valid)
      .map(item => item.index)

    if (invalidPreguntaIndices.length > 0) {
      throw new z.ZodError(invalidPreguntaIndices.map(index => ({
        path: ['preguntas', index, 'respuestas'],
        message: `Debe haber al menos una respuesta correcta en la pregunta ${index + 1}.`
      })))
    }
    return true
  }, {
    message: 'Cada pregunta debe tener al menos una respuesta correcta.'
  })
}) 
