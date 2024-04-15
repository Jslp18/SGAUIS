import { z } from 'zod'

export const registerSchema = z.object({
  codigo: z.string({
    required_error: 'El código es requerido.'
  }).length(7, { message: 'La longitud del código es de 7 caracteres.' }),
  nombre: z.string({
    required_error: 'El nombre de usuario es necesario para el registro.'
  }).min(1, { message: 'El nombre debe contener mínimo 1 caracter.' }).max(50, { message: 'El nombre debe contener máximo 50 caracteres.' }),
  correo: z.string({
    required_error: 'El correo electrónico es requerido.'
  }).email({
    message: 'Correo electrónico inválido.'
  }),
  password: z.string({
    required_error: 'La contraseña es requerida.'
  }).min(14, { message: 'La contraseña debe contener mínimo 14 caracteres.' }).max(32, { message: 'La contraseña debe contener máximo 32 caracteres.' }),
  rol: z.enum(['Estudiante', 'Profesor'])
})
