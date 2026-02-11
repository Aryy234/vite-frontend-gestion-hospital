import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import authorizationClient from '@/clients/authorizationClient'
import { STORAGE_KEYS } from '@/utils/constanst'

// Estado global reactivo
const token = ref(localStorage.getItem(STORAGE_KEYS.TOKEN) || null)
const role = ref(localStorage.getItem(STORAGE_KEYS.ROLE) || null)
const user = ref(localStorage.getItem(STORAGE_KEYS.USER) || null)
const expiresAt = ref(localStorage.getItem(STORAGE_KEYS.EXPIRES_AT) || null)

export function useAuth() {
  const router = useRouter()
  const loading = ref(false)
  const error = ref(null)

  const isAuthenticated = computed(() => {
    if (!token.value || !expiresAt.value) return false
    return Date.now() / 1000 < Number(expiresAt.value)
  })

  const login = async (username, password) => {
    loading.value = true
    error.value = null

    try {
      const response = await authorizationClient.getToken(username, password)
      
      // Guardar en localStorage
      localStorage.setItem(STORAGE_KEYS.TOKEN, response.accessToken)
      localStorage.setItem(STORAGE_KEYS.EXPIRES_AT, response.expiresAt)
      localStorage.setItem(STORAGE_KEYS.ROLE, response.role)
      localStorage.setItem(STORAGE_KEYS.USER, username)

      // Actualizar estado reactivo
      token.value = response.accessToken
      expiresAt.value = response.expiresAt
      role.value = response.role
      user.value = username

      router.push('/home')
      return true
    } catch (err) {
      error.value = err.message
      return false
    } finally {
      loading.value = false
    }
  }

  const logout = () => {
    // Limpiar localStorage
    localStorage.removeItem(STORAGE_KEYS.TOKEN)
    localStorage.removeItem(STORAGE_KEYS.EXPIRES_AT)
    localStorage.removeItem(STORAGE_KEYS.ROLE)
    localStorage.removeItem(STORAGE_KEYS.USER)

    // Limpiar estado reactivo
    token.value = null
    expiresAt.value = null
    role.value = null
    user.value = null

    router.push('/login')
  }

  const checkAuth = () => {
    if (!isAuthenticated.value) {
      logout()
      return false
    }
    return true
  }

  return {
    token,
    role,
    user,
    loading,
    error,
    isAuthenticated,
    login,
    logout,
    checkAuth
  }
}

export default useAuth
