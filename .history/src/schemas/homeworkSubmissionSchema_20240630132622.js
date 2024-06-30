import { z } from 'zod'

export const commentForumSchema = z.object({
    titulo: z.string({
        required_error: 'La tarea a entregar es requerida.'
    })
})