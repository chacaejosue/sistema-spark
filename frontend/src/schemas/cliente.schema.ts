import { z } from 'zod'

export const clienteFormSchema = z.object({
  nombreCliente: z.string().trim().min(1, 'Ingresa el nombre').max(100, 'El nombre es demasiado largo'),
  telefono: z.string().regex(/^\d{8}$/, 'El teléfono debe tener exactamente 8 dígitos'),
  montoPago: z.coerce.number().min(0, 'El monto no puede ser negativo').max(10000, 'El monto máximo es 10.000 Bs'),
  tipoEntrada: z.enum(['mensual', 'semanal', 'sesión']),
  tipoPago: z.enum(['efectivo', 'QR']),
})

export const clienteFilterSchema = z.object({
  nombreCliente: z.preprocess((value) => value === '' ? undefined : value, z.string().trim().max(100).optional()),
  telefono: z.preprocess((value) => value === '' ? undefined : value, z.string().regex(/^\d{0,8}$/, 'Solo se permiten dígitos').optional()),
  tipoEntrada: z.preprocess((value) => value === '' ? undefined : value, z.enum(['mensual', 'semanal', 'sesión']).optional()),
  tipoPago: z.preprocess((value) => value === '' ? undefined : value, z.enum(['efectivo', 'QR']).optional()),
  fechaDesde: z.preprocess((value) => value === '' ? undefined : value, z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Fecha inicial inválida').optional()),
  fechaHasta: z.preprocess((value) => value === '' ? undefined : value, z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Fecha final inválida').optional()),
}).refine(
  (value) => !value.fechaDesde || !value.fechaHasta || value.fechaDesde <= value.fechaHasta,
  { message: 'La fecha inicial no puede ser posterior a la fecha final', path: ['fechaHasta'] },
)
