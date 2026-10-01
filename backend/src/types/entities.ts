export type Administrador = {
  idAdmin: number
  nombreAdmin: string
  contrasena: string
  nombreUsuario: string
}

export type AdministradorPublico = Omit<Administrador, 'contrasena'>

export type Cliente = {
  idCliente: number
  nombreCliente: string
  telefono: string
  montoPago: string | number
  tipoEntrada: 'mensual' | 'semanal' | 'sesión'
  tipoPago: 'efectivo' | 'QR'
  fechaRegistro: string
}
