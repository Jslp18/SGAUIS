import { z } from 'zod'

export const loginSchema = z.object({
  codigo: z.string({
    required_error: 'El código es requerido.'
  }).length(7, { message: 'La longitud del código es de 7 caracteres.' }),
  password: z.string({
    required_error: 'La contraseña es requerida.'
  }).min(14, { message: 'La contraseña debe contener mínimo 14 caracteres.' }).max(32, { message: 'La contraseña debe contener máximo 32 caracteres.' })
})
