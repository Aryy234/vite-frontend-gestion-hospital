import { API_BASE_URL, STORAGE_KEYS } from '@/utils/constanst'

/**
 * Obtiene el token de localStorage
 */
const getToken = () => localStorage.getItem(STORAGE_KEYS.TOKEN)

/**
 * Headers con autorización Bearer
 */
const getAuthHeaders = () => ({
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${getToken()}`
})

/**
 * Maneja respuestas de la API
 */
const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({}))
    throw new Error(error.message || error.error || `Error ${response.status}`)
  }
  
  if (response.status === 204 || response.status === 201) {
    return null
  }
  
  return response.json()
}

/**
 * Cliente para la API de gestión hospitalaria
 */
export const gestionHospitalClient = {
  // ==================== DOCTORES ====================
  doctores: {
    async listar() {
      const response = await fetch(`${API_BASE_URL}/doctores`, {
        headers: getAuthHeaders()
      })
      return handleResponse(response)
    },

    async obtener(id) {
      const response = await fetch(`${API_BASE_URL}/doctores/${id}`, {
        headers: getAuthHeaders()
      })
      return handleResponse(response)
    },

    async crear(doctor) {
      const response = await fetch(`${API_BASE_URL}/doctores`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(doctor)
      })
      return handleResponse(response)
    },

    async actualizar(id, doctor) {
      const response = await fetch(`${API_BASE_URL}/doctores/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(doctor)
      })
      return handleResponse(response)
    },

    async eliminar(id) {
      const response = await fetch(`${API_BASE_URL}/doctores/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      })
      return handleResponse(response)
    },

    async obtenerCitas(id) {
      const response = await fetch(`${API_BASE_URL}/doctores/${id}/citas`, {
        headers: getAuthHeaders()
      })
      return handleResponse(response)
    }
  },

  // ==================== PACIENTES ====================
  pacientes: {
    async listar() {
      const response = await fetch(`${API_BASE_URL}/pacientes`, {
        headers: getAuthHeaders()
      })
      return handleResponse(response)
    },

    async obtener(id) {
      const response = await fetch(`${API_BASE_URL}/pacientes/${id}`, {
        headers: getAuthHeaders()
      })
      return handleResponse(response)
    },

    async crear(paciente) {
      const response = await fetch(`${API_BASE_URL}/pacientes`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(paciente)
      })
      return handleResponse(response)
    },

    async actualizar(id, paciente) {
      const response = await fetch(`${API_BASE_URL}/pacientes/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(paciente)
      })
      return handleResponse(response)
    },

    async eliminar(id) {
      const response = await fetch(`${API_BASE_URL}/pacientes/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      })
      return handleResponse(response)
    },

    async obtenerCitas(id) {
      const response = await fetch(`${API_BASE_URL}/pacientes/${id}/citas`, {
        headers: getAuthHeaders()
      })
      return handleResponse(response)
    }
  },

  // ==================== CITAS ====================
  citas: {
    async listar() {
      const response = await fetch(`${API_BASE_URL}/citas`, {
        headers: getAuthHeaders()
      })
      return handleResponse(response)
    },

    async obtener(id) {
      const response = await fetch(`${API_BASE_URL}/citas/${id}`, {
        headers: getAuthHeaders()
      })
      return handleResponse(response)
    },

    async crear(cita) {
      const response = await fetch(`${API_BASE_URL}/citas`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(cita)
      })
      return handleResponse(response)
    },

    async actualizar(id, cita) {
      const response = await fetch(`${API_BASE_URL}/citas/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(cita)
      })
      return handleResponse(response)
    },

    async eliminar(id) {
      const response = await fetch(`${API_BASE_URL}/citas/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      })
      return handleResponse(response)
    },

    async cancelar(id) {
      const response = await fetch(`${API_BASE_URL}/citas/${id}/cancelar`, {
        method: 'PUT',
        headers: getAuthHeaders()
      })
      return handleResponse(response)
    },

    async listarPorDoctor(idDoctor) {
      const response = await fetch(`${API_BASE_URL}/citas/doctor/${idDoctor}`, {
        headers: getAuthHeaders()
      })
      return handleResponse(response)
    },

    async listarPorPaciente(idPaciente) {
      const response = await fetch(`${API_BASE_URL}/citas/paciente/${idPaciente}`, {
        headers: getAuthHeaders()
      })
      return handleResponse(response)
    }
  }
}

export default gestionHospitalClient
