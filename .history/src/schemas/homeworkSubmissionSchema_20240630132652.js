import { z } from 'zod'

export const commentForumSchema = z.object({
    nombre: z.string({
        required_error: 'El nombre del curso es necesario para el registro.'
      }).min(1, { message: 'El nombre debe contener mínimo 1 caracter.' }).max(50, { message: 'El nombre debe contener máximo 50 caracteres.' })
})