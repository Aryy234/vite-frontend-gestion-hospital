import { AUTH_BASE_URL } from '@/utils/constanst'

/**
 * Cliente para la API de autenticación
 */
export const authorizationClient = {
  /**
   * Obtiene token de autenticación
   * @param {string} user - Nombre de usuario
   * @param {string} password - Contraseña
   * @returns {Promise<{accessToken: string, expiresAt: number, role: string}>}
   */
  async getToken(user, password) {
    const url = `${AUTH_BASE_URL}/auth/token?user=${encodeURIComponent(user)}&password=${encodeURIComponent(password)}`
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Credenciales incorrectas')
      }
      throw new Error('Error de autenticación')
    }

    return response.json()
  }
}

export default authorizationClient
