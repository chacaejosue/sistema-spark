import { jwt } from 'hono/jwt'
import type { MiddlewareHandler } from 'hono'
import { getConfig } from '../config/env.js'
import type { AppEnv } from '../types/app.js'

export const requireAuth: MiddlewareHandler<AppEnv> = async (c, next) => {
  const config = getConfig()
  const middleware = jwt({
    secret: config.JWT_SECRET,
    alg: 'HS256',
    verification: {
      iss: config.JWT_ISSUER,
      aud: config.JWT_AUDIENCE,
    },
  })

  return middleware(c, next)
}
