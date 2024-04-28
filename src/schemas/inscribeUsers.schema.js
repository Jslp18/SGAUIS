import z from 'zod'

export const inscribeUsersSchema = z.object({
    codigo: z.string({
        required_error: 'El código es requerido.'
      }).length(7, { message: 'La longitud del código es de 7 caracteres.' })
        .refine(codigo => !isNaN(Number(codigo)), { message: 'El código debe ser númerico.' })
})