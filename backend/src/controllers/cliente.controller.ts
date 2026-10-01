import type { Context } from 'hono'
import { createClienteSchema, listClientesQuerySchema, updateClienteSchema } from '../schemas/cliente.schema.js'
import * as clienteService from '../services/cliente.service.js'

export async function create(c: Context) {
  const input = createClienteSchema.parse(await c.req.json())
  const cliente = await clienteService.create(input)
  return c.json({ data: cliente }, 201)
}

export async function update(c: Context) {
  const id = Number(c.req.param('id'))
  if (!Number.isInteger(id) || id <= 0) return c.json({ error: 'ID_INVALIDO' }, 400)

  const input = updateClienteSchema.parse(await c.req.json())
  const cliente = await clienteService.update(id, input)
  return c.json({ data: cliente })
}

export async function list(c: Context) {
  const rawQuery = c.req.query()
  const filters = listClientesQuerySchema.parse(rawQuery)
  const result = await clienteService.findAll(filters)
  return c.json(result)
}
