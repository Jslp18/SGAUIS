import { z } from 'zod'

export const commentForumSchema = z.object({
    titulo: z.string({
        required_error: 'El titulo de la entrega es necesario para el registro.'
      }).min(1, { message: 'El titulo debe contener mínimo 1 caracter.' }).max(50, { message: 'El titulo debe contener máximo 50 caracteres.' })
})