import { z } from 'zod'

const tipoEntradaSchema = z.enum(['mensual', 'semanal', 'sesión'])
const tipoPagoSchema = z.enum(['efectivo', 'QR'])
const emptyToUndefined = (value: unknown) => value === '' ? undefined : value
const dateFilterSchema = z.preprocess(
  emptyToUndefined,
  z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'La fecha debe tener formato YYYY-MM-DD').optional(),
)

const clienteFields = {
  nombreCliente: z.string().trim().min(1).max(100),
  telefono: z.string().regex(/^\d{8}$/, 'El teléfono debe contener exactamente 8 dígitos'),
  montoPago: z.coerce.number().min(0).max(10_000),
  tipoEntrada: tipoEntradaSchema,
  tipoPago: tipoPagoSchema,
}

export const createClienteSchema = z.object(clienteFields)

export const updateClienteSchema = z
  .object(clienteFields)
  .partial()
  .refine((value) => Object.keys(value).length > 0, {
    message: 'Debe enviar al menos un campo para actualizar',
  })

export const listClientesQuerySchema = z.object({
  nombreCliente: z.preprocess(emptyToUndefined, z.string().trim().min(1).max(100).optional()),
  telefono: z.preprocess(emptyToUndefined, z.string().regex(/^\d{0,8}$/, 'El teléfono solo puede contener dígitos').optional()),
  tipoEntrada: z.preprocess(emptyToUndefined, tipoEntradaSchema.optional()),
  tipoPago: z.preprocess(emptyToUndefined, tipoPagoSchema.optional()),
  fechaDesde: dateFilterSchema,
  fechaHasta: dateFilterSchema,
  limit: z.coerce.number().int().min(1).max(100).default(20),
  offset: z.coerce.number().int().min(0).default(0),
}).refine(
  (value) => !value.fechaDesde || !value.fechaHasta || value.fechaDesde <= value.fechaHasta,
  { message: 'La fecha inicial no puede ser posterior a la fecha final', path: ['fechaHasta'] },
)

export type CreateClienteInput = z.infer<typeof createClienteSchema>
export type UpdateClienteInput = z.infer<typeof updateClienteSchema>
export type ListClientesQuery = z.infer<typeof listClientesQuerySchema>
