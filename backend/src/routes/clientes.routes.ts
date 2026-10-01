import { Hono } from 'hono'
import type { AppEnv } from '../types/app.js'
import * as clienteController from '../controllers/cliente.controller.js'
import { requireAuth } from '../middlewares/auth.middleware.js'

const clienteRoutes = new Hono<AppEnv>()
clienteRoutes.use('*', requireAuth)
clienteRoutes.post('/', clienteController.create)
clienteRoutes.put('/:id', clienteController.update)
clienteRoutes.get('/', clienteController.list)

export default clienteRoutes
