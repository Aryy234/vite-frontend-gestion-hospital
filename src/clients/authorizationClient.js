
import { AUTH_BASE_URL } from '@/utils/constanst'
import axios from 'axios'

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
    try {
      const { data } = await axios.get(url)
      return data
    } catch (error) {
      if (error.response && error.response.status === 401) {
        throw new Error('Credenciales incorrectas')
      }
      throw new Error('Error de autenticación')
    }
  }
}

export default authorizationClient
