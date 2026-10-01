import type { Administrador } from '../types/entities.js'
import { query } from '../db/pool.js'

export async function findByUsername(nombreUsuario: string): Promise<Administrador | null> {
  const result = await query<Administrador>(
    `SELECT "idAdmin", "nombreAdmin", "contrasena", "nombreUsuario"
     FROM "Administrador"
     WHERE "nombreUsuario" = $1
     LIMIT 1`,
    [nombreUsuario],
  )

  return result.rows[0] ?? null
}
