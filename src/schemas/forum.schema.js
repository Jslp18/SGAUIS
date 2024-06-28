import { z } from 'zod'

export const forumSchema = z.object({
  titulo: z.string({
    required_error: 'El título del foro es necesario para el registro.'
  }).min(1, { message: 'El título debe contener mínimo 1 caracter.' }).max(50, { message: 'El título debe contener máximo 50 caracteres.' }),
  descripcion: z.string({
    required_error: 'La descripción es requerida.'
  }).min(20, { message: 'La descripción debe contener al menos 20 caracteres' }).max(200, { message: 'La descripción tiene una longitud máxima de 200 caracteres.' })
})