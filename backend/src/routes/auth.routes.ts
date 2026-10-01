import { Hono } from 'hono'
import type { AppEnv } from '../types/app.js'
import * as authController from '../controllers/auth.controller.js'
import { requireAuth } from '../middlewares/auth.middleware.js'

const authRoutes = new Hono<AppEnv>()

authRoutes.post('/login', authController.login)
authRoutes.post('/logout', requireAuth, authController.logout)

export default authRoutes
