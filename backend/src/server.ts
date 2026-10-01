import { serve } from '@hono/node-server'
import app from './app.js'
import { getConfig } from './config/env.js'

const config = getConfig()
const server = serve({ fetch: app.fetch, port: config.PORT })

console.log(`API ejecutándose en http://localhost:${config.PORT}`)

process.on('SIGINT', () => {
  server.close()
  process.exit(0)
})

process.on('SIGTERM', () => {
  server.close()
  process.exit(0)
})
