import { z } from 'zod'

export const loginFormSchema = z.object({
  nombreUsuario: z.string().trim().min(5, 'El usuario debe tener al menos 5 caracteres').max(10, 'El usuario no puede superar 10 caracteres'),
  contrasena: z.string().min(12, 'La contraseña debe tener al menos 12 caracteres'),
})
