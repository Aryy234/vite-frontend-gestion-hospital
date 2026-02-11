// URLs de la API
export const API_BASE_URL = 'http://localhost:8081/gestion-hospital/api/v1.0'
export const AUTH_BASE_URL = 'http://localhost:8082/auth/api/v1.0'

// Estados de citas
export const ESTADOS_CITA = {
  AGENDADA: 'Agendada',
  CANCELADA: 'Cancelada',
  COMPLETADA: 'Completada'
}

// Claves de localStorage
export const STORAGE_KEYS = {
  TOKEN: 'accessToken',
  EXPIRES_AT: 'expiresAt',
  ROLE: 'userRole',
  USER: 'user'
}

// Colores del diseño
export const COLORS = {
  PRIMARY: '#1a2332',
  SECONDARY: '#e8eef3',
  WHITE: '#ffffff',
  ACCENT: '#2c3e50',
  TEXT_GRAY: '#5a6c7d'
}
