import type { Cliente, ClienteListResponse, LoginResponse } from '../types/api'
import { clearSession, getToken } from './storage'

const API_URL = (import.meta.env.PUBLIC_API_URL ?? (typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000')).replace(/\/$/, '')

export class ApiError extends Error {
  status: number
  details?: unknown

  constructor(message: string, status: number, details?: unknown) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.details = details
  }
}

async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  const headers = new Headers(init.headers)
  headers.set('Content-Type', 'application/json')

  const token = getToken()
  if (token) headers.set('Authorization', `Bearer ${token}`)

  const isReadRequest = (init.method ?? 'GET').toUpperCase() === 'GET'
  const maxAttempts = isReadRequest ? 3 : 1
  let lastError: unknown

  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    const controller = new AbortController()
    const timeout = window.setTimeout(() => controller.abort(), 15_000)

    try {
      const response = await fetch(`${API_URL}${path}`, { ...init, headers, signal: controller.signal })
      const body = await response.json().catch(() => ({}))

      if (!response.ok) {
        if (response.status === 401) clearSession()
        const apiError = new ApiError(body.error ?? 'No se pudo completar la solicitud', response.status, body.detalles)
        if (!isReadRequest || response.status < 500 || attempt === maxAttempts) throw apiError
        lastError = apiError
      } else {
        return body as T
      }
    } catch (error) {
      lastError = error
      if (!isReadRequest || attempt === maxAttempts || (error instanceof ApiError && error.status < 500)) throw error
    } finally {
      window.clearTimeout(timeout)
    }

    await new Promise((resolve) => window.setTimeout(resolve, attempt * 350))
  }

  throw lastError instanceof Error ? lastError : new Error('No se pudo completar la solicitud')
}

export function login(payload: { nombreUsuario: string; contrasena: string }) {
  return request<LoginResponse>('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export function logout() {
  return request<{ message: string }>('/api/auth/logout', { method: 'POST' })
}

export function listClientes(params: URLSearchParams = new URLSearchParams()) {
  const query = params.toString()
  return request<ClienteListResponse>(`/api/clientes${query ? `?${query}` : ''}`)
}

export function createCliente(payload: Omit<Cliente, 'idCliente' | 'fechaRegistro'>) {
  return request<{ data: Cliente }>('/api/clientes', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export function updateCliente(id: number, payload: Partial<Omit<Cliente, 'idCliente' | 'fechaRegistro'>>) {
  return request<{ data: Cliente }>(`/api/clientes/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  })
}
