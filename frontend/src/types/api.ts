export type Administrador = {
  idAdmin: number
  nombreAdmin: string
  nombreUsuario: string
}

export type LoginResponse = {
  token: string
  administrador: Administrador
}

export type Cliente = {
  idCliente: number
  nombreCliente: string
  telefono: string
  montoPago: string | number
  tipoEntrada: 'mensual' | 'semanal' | 'sesión'
  tipoPago: 'efectivo' | 'QR'
  fechaRegistro: string
}

export type ClienteListResponse = {
  data: Cliente[]
  total: number
}
