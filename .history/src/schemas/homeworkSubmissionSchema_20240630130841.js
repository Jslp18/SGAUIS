import { z } from 'zod'

export const commentForumSchema = z.object({
    tarea: z.string({
        required_error: 'La tarea a entregar es requerida.'
    }).min(20, { message: 'El comentario debe contener al menos 20 caracteres' }).max(500, { message: 'El comentario tiene una longitud máxima de 500 caracteres.' })
})