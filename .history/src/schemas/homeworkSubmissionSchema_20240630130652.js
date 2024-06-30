import { z } from 'zod'

export const commentForumSchema = z.object({
    tarea: z.id({
        required_error: 'El comentario es requerido.'
    }).min(20, { message: 'El comentario debe contener al menos 20 caracteres' }).max(500, { message: 'El comentario tiene una longitud máxima de 500 caracteres.' })
})