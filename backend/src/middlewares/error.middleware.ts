import type { ErrorHandler } from 'hono'
import { ZodError } from 'zod'

export const errorHandler: ErrorHandler = (error, c) => {
  if (error instanceof ZodError) {
    return c.json({ error: 'VALIDACION_ERROR', detalles: error.flatten() }, 400)
  }

  if (error.message === 'CREDENCIALES_INVALIDAS') {
    return c.json({ error: error.message }, 401)
  }

  if (error.message === 'CLIENTE_NO_ENCONTRADO') {
    return c.json({ error: error.message }, 404)
  }

  const transientDatabaseCodes = new Set(['ECONNREFUSED', 'ENOTFOUND', '08001', '08003', '08004', '08006', '08007', '08S01', '53300', '57P01', 'ECONNRESET', 'EHOSTUNREACH', 'ENETUNREACH', 'ETIMEDOUT', 'EPIPE'])
  const configurationDatabaseCodes = new Set(['28P01', '28000', '3D000'])
  const schemaDatabaseCodes = new Set(['42P01'])
  const errors = error instanceof AggregateError ? error.errors : [error]
  const hasCode = (codes: Set<string>) => errors.some((cause) => {
    const databaseError = cause as NodeJS.ErrnoException & { code?: string }
    return codes.has(databaseError.code ?? '')
  })
  const isTransientError = hasCode(transientDatabaseCodes) || errors.some((cause) => /ssl connection is required|no pg_hba\.conf entry|connection .*timeout|timeout.*connection|connection terminated|connection reset|socket hang up/i.test((cause as Error).message ?? ''))

  if (isTransientError) {
    console.error('Database request failed:', error)
    return c.json({ error: 'BASE_DATOS_NO_DISPONIBLE' }, 503)
  }

  if (hasCode(configurationDatabaseCodes)) {
    console.error('Database configuration failed:', error)
    return c.json({ error: 'CONFIGURACION_BASE_DATOS_INVALIDA' }, 503)
  }

  if (hasCode(schemaDatabaseCodes)) {
    console.error('Database schema failed:', error)
    return c.json({ error: 'ESQUEMA_BASE_DATOS_INVALIDO' }, 500)
  }

  console.error(error)
  return c.json({ error: 'ERROR_INTERNO' }, 500)
}
