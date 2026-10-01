import { Pool, type QueryResult, type QueryResultRow } from 'pg'
import { getConfig } from '../config/env.js'

const globalForPool = globalThis as typeof globalThis & {
  __gimnasioPool?: Pool
}

export function getPool(): Pool {
  if (!globalForPool.__gimnasioPool) {
    globalForPool.__gimnasioPool = new Pool({
      connectionString: getConfig().DATABASE_URL,
      max: 5,
      idleTimeoutMillis: 60_000,
      connectionTimeoutMillis: 15_000,
      keepAlive: true,
      keepAliveInitialDelayMillis: 10_000,
      ssl: getConfig().DATABASE_SSL ? { rejectUnauthorized: false } : undefined,
    })

    globalForPool.__gimnasioPool.on('error', (error) => {
      console.error('PostgreSQL pool connection error:', error)
    })
  }

  return globalForPool.__gimnasioPool
}

const transientDatabaseCodes = new Set([
  '08001',
  '08003',
  '08004',
  '08006',
  '08007',
  '08S01',
  '53300',
  '57P01',
  'ECONNREFUSED',
  'ECONNRESET',
  'EHOSTUNREACH',
  'ENETUNREACH',
  'ENOTFOUND',
  'ETIMEDOUT',
  'EPIPE',
])

function isTransientDatabaseError(error: unknown): boolean {
  const databaseError = error as NodeJS.ErrnoException & { code?: string }
  return (
    transientDatabaseCodes.has(databaseError.code ?? '') ||
    /connection .*timeout|timeout.*connection|connection terminated|connection reset|socket hang up/i.test(databaseError.message ?? '')
  )
}

function isReadOnlyQuery(text: string): boolean {
  return /^(SELECT|WITH|SHOW|EXPLAIN)\b/i.test(text.trim())
}

export async function query<T extends QueryResultRow = QueryResultRow>(text: string, values?: unknown[]): Promise<QueryResult<T>> {
  const pool = getPool()
  const attempts = isReadOnlyQuery(text) ? 3 : 1

  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      return await pool.query<T>(text, values)
    } catch (error) {
      if (attempt === attempts || !isTransientDatabaseError(error)) throw error
      await new Promise((resolve) => setTimeout(resolve, attempt * 250))
    }
  }

  throw new Error('La consulta no pudo completarse')
}
