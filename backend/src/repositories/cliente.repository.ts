import type { QueryResult } from 'pg'
import { query } from '../db/pool.js'
import type { CreateClienteInput, ListClientesQuery, UpdateClienteInput } from '../schemas/cliente.schema.js'
import type { Cliente } from '../types/entities.js'

export async function create(input: CreateClienteInput): Promise<Cliente> {
  const result = await query<Cliente>(
    `INSERT INTO "Cliente" (
       "nombreCliente", "telefono", "montoPago", "tipoEntrada", "tipoPago"
     ) VALUES ($1, $2, $3, $4, $5)
     RETURNING "idCliente", "nombreCliente", "telefono", "montoPago", "tipoEntrada", "tipoPago", "fechaRegistro"`,
    [input.nombreCliente, input.telefono, input.montoPago, input.tipoEntrada, input.tipoPago],
  )

  return result.rows[0]
}

export async function update(idCliente: number, input: UpdateClienteInput): Promise<Cliente | null> {
  const entries = Object.entries(input) as [keyof UpdateClienteInput, unknown][]
  const allowedColumns: Record<keyof UpdateClienteInput, string> = {
    nombreCliente: '"nombreCliente"',
    telefono: '"telefono"',
    montoPago: '"montoPago"',
    tipoEntrada: '"tipoEntrada"',
    tipoPago: '"tipoPago"',
  }
  const values: unknown[] = []
  const assignments = entries.map(([key, value]) => {
    values.push(value)
    return `${allowedColumns[key]} = $${values.length}`
  })

  values.push(idCliente)
  const result = await query<Cliente>(
    `UPDATE "Cliente"
     SET ${assignments.join(', ')}
     WHERE "idCliente" = $${values.length}
     RETURNING "idCliente", "nombreCliente", "telefono", "montoPago", "tipoEntrada", "tipoPago", "fechaRegistro"`,
    values,
  )

  return result.rows[0] ?? null
}

export async function findAll(filters: ListClientesQuery): Promise<{ data: Cliente[]; total: number }> {
  const conditions: string[] = []
  const values: unknown[] = []

  if (filters.nombreCliente) {
    values.push(`%${filters.nombreCliente}%`)
    conditions.push(`"nombreCliente" ILIKE $${values.length}`)
  }
  if (filters.telefono) {
    values.push(`${filters.telefono}%`)
    conditions.push(`"telefono" LIKE $${values.length}`)
  }
  if (filters.tipoEntrada) {
    values.push(filters.tipoEntrada)
    conditions.push(`"tipoEntrada" = $${values.length}`)
  }
  if (filters.tipoPago) {
    values.push(filters.tipoPago)
    conditions.push(`"tipoPago" = $${values.length}`)
  }
  if (filters.fechaDesde) {
    values.push(filters.fechaDesde)
    conditions.push(`"fechaRegistro" >= $${values.length}`)
  }
  if (filters.fechaHasta) {
    values.push(filters.fechaHasta)
    conditions.push(`"fechaRegistro" <= $${values.length}`)
  }

  const where = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : ''
  const countResult = await query<{ count: string }>(
    `SELECT COUNT(*)::text AS count FROM "Cliente" ${where}`,
    values,
  )

  const dataValues = [...values, filters.limit, filters.offset]
  const dataResult: QueryResult<Cliente> = await query<Cliente>(
    `SELECT "idCliente", "nombreCliente", "telefono", "montoPago", "tipoEntrada", "tipoPago", "fechaRegistro"
     FROM "Cliente"
     ${where}
     ORDER BY "idCliente" DESC
     LIMIT $${dataValues.length - 1} OFFSET $${dataValues.length}`,
    dataValues,
  )

  return { data: dataResult.rows, total: Number(countResult.rows[0]?.count ?? 0) }
}
