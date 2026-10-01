import * as clienteRepository from '../repositories/cliente.repository.js'
import type { CreateClienteInput, ListClientesQuery, UpdateClienteInput } from '../schemas/cliente.schema.js'

export function create(input: CreateClienteInput) {
  return clienteRepository.create(input)
}

export async function update(idCliente: number, input: UpdateClienteInput) {
  const cliente = await clienteRepository.update(idCliente, input)
  if (!cliente) throw new Error('CLIENTE_NO_ENCONTRADO')
  return cliente
}

export function findAll(filters: ListClientesQuery) {
  return clienteRepository.findAll(filters)
}
