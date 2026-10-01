import type { Administrador } from '../types/api'

const TOKEN_KEY = 'gimnasio_token'
const ADMIN_KEY = 'gimnasio_admin'

export function getToken(): string | null {
  return typeof localStorage === 'undefined' ? null : localStorage.getItem(TOKEN_KEY)
}

export function getAdmin(): Administrador | null {
  if (typeof localStorage === 'undefined') return null
  const value = localStorage.getItem(ADMIN_KEY)
  if (!value) return null

  try {
    return JSON.parse(value) as Administrador
  } catch {
    clearSession()
    return null
  }
}

export function setSession(token: string, admin: Administrador): void {
  localStorage.setItem(TOKEN_KEY, token)
  localStorage.setItem(ADMIN_KEY, JSON.stringify(admin))
}

export function clearSession(): void {
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(ADMIN_KEY)
}

export function requireSession(): void {
  if (!getToken()) window.location.replace('/login')
}
