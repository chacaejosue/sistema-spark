import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'
import authRoutes from './routes/auth.routes.js'
import clienteRoutes from './routes/clientes.routes.js'
import { errorHandler } from './middlewares/error.middleware.js'
import { getConfig } from './config/env.js'
import type { AppEnv } from './types/app.js'
import { query } from './db/pool.js'

const app = new Hono<AppEnv>()

app.use('*', logger())
app.use('*', async (c, next) => {
  const allowedOrigins = getConfig().CORS_ORIGIN
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean)

  return cors({
    origin: (origin) => allowedOrigins.includes(origin) ? origin : undefined,
    allowHeaders: ['Content-Type', 'Authorization'],
    allowMethods: ['GET', 'POST', 'PUT', 'OPTIONS'],
  })(c, next)
})

app.get('/health', (c) => c.json({ status: 'ok' }))
app.get('/health/db', async (c) => {
  try {
    await query('SELECT 1')
    return c.json({ status: 'ok', database: 'connected' })
  } catch (error) {
    console.error('Database health check failed:', error)
    return c.json({ status: 'error', database: 'unavailable' }, 503)
  }
})
app.route('/api/auth', authRoutes)
app.route('/api/clientes', clienteRoutes)
app.notFound((c) => c.json({ error: 'RUTA_NO_ENCONTRADA' }, 404))
app.onError(errorHandler)

export default app
