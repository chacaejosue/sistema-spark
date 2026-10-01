import type { Context } from 'hono'
import { loginSchema } from '../schemas/auth.schema.js'
import * as authService from '../services/auth.service.js'

export async function login(c: Context) {
  const input = loginSchema.parse(await c.req.json())
  const result = await authService.login(input)
  return c.json(result)
}

export function logout(c: Context) {
  return c.json({ message: 'Sesión cerrada correctamente. El cliente debe eliminar el JWT.' })
}
