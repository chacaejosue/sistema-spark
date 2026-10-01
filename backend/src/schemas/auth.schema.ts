import { z } from 'zod'

export const loginSchema = z.object({
  nombreUsuario: z.string().trim().min(5).max(10),
  contrasena: z.string().min(12, 'La contraseña debe tener al menos 12 caracteres'),
})

export type LoginInput = z.infer<typeof loginSchema>
