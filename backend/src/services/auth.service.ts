import bcrypt from 'bcrypt'
import { sign } from 'hono/jwt'
import { getConfig } from '../config/env.js'
import { findByUsername } from '../repositories/administrador.repository.js'
import type { LoginInput } from '../schemas/auth.schema.js'
import type { AdministradorPublico } from '../types/entities.js'

function expirationInSeconds(value: string): number {
  const match = value.match(/^(\d+)([smhd])$/i)
  if (!match) return 3600

  const amount = Number(match[1])
  const multiplier = { s: 1, m: 60, h: 3600, d: 86_400 }[match[2].toLowerCase() as 's' | 'm' | 'h' | 'd']
  return amount * multiplier
}

export async function login(input: LoginInput): Promise<{ token: string; administrador: AdministradorPublico }> {
  const administrador = await findByUsername(input.nombreUsuario)
  const validPassword = administrador
    ? await bcrypt.compare(input.contrasena, administrador.contrasena)
    : false

  if (!administrador || !validPassword) {
    throw new Error('CREDENCIALES_INVALIDAS')
  }

  const config = getConfig()
  const now = Math.floor(Date.now() / 1000)
  const token = await sign(
    {
      sub: String(administrador.idAdmin),
      username: administrador.nombreUsuario,
      role: 'admin',
      iss: config.JWT_ISSUER,
      aud: config.JWT_AUDIENCE,
      iat: now,
      exp: now + expirationInSeconds(config.JWT_EXPIRES_IN),
    },
    config.JWT_SECRET,
  )

  const publico: AdministradorPublico = {
    idAdmin: administrador.idAdmin,
    nombreAdmin: administrador.nombreAdmin,
    nombreUsuario: administrador.nombreUsuario,
  }

  return { token, administrador: publico }
}
