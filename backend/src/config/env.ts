import { z } from 'zod'
import 'dotenv/config'

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().int().positive().default(3000),
  DATABASE_URL: z.string().min(1),
  DATABASE_SSL: z.enum(['true', 'false']).default('true').transform((value) => value === 'true'),
  JWT_SECRET: z.string().min(32, 'JWT_SECRET debe tener al menos 32 caracteres'),
  JWT_ISSUER: z.string().default('gimnasiodb-api'),
  JWT_AUDIENCE: z.string().default('gimnasiodb-client'),
  JWT_EXPIRES_IN: z.string().default('1h'),
  CORS_ORIGIN: z.string().min(1, 'CORS_ORIGIN debe contener al menos un origen permitido'),
})

export type AppConfig = z.infer<typeof envSchema>

let cachedConfig: AppConfig | undefined

export function getConfig(): AppConfig {
  if (!cachedConfig) {
    const result = envSchema.safeParse(process.env)

    if (!result.success) {
      throw new Error(`Variables de entorno inválidas: ${result.error.message}`)
    }

    cachedConfig = result.data
  }

  return cachedConfig
}

export function resetConfigForTests(): void {
  cachedConfig = undefined
}
