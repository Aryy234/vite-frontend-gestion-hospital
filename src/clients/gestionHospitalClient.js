
import { API_BASE_URL, STORAGE_KEYS } from '@/utils/constanst'
import axios from 'axios'

const getToken = () => localStorage.getItem(STORAGE_KEYS.TOKEN)
const getAuthHeaders = () => ({
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${getToken()}`
})

const handleAxiosError = (error) => {
  if (error.response && error.response.data) {
    throw new Error(error.response.data.message || error.response.data.error || 'Error de API')
  }
  throw new Error('Error de conexión')
}

export const gestionHospitalClient = {
  doctores: {
    async listar() {
      try {
        const { data } = await axios.get(`${API_BASE_URL}/doctores`, { headers: getAuthHeaders() })
        return data
      } catch (error) {
        handleAxiosError(error)
      }
    },
    async obtener(id) {
      try {
        const { data } = await axios.get(`${API_BASE_URL}/doctores/${id}`, { headers: getAuthHeaders() })
        return data
      } catch (error) {
        handleAxiosError(error)
      }
    },
    async crear(doctor) {
      try {
        await axios.post(`${API_BASE_URL}/doctores`, doctor, { headers: getAuthHeaders() })
        return true
      } catch (error) {
        handleAxiosError(error)
        return false
      }
    },
    async actualizar(id, doctor) {
      try {
        await axios.put(`${API_BASE_URL}/doctores/${id}`, doctor, { headers: getAuthHeaders() })
        return true
      } catch (error) {
        handleAxiosError(error)
        return false
      }
    },
    async eliminar(id) {
      try {
        await axios.delete(`${API_BASE_URL}/doctores/${id}`, { headers: getAuthHeaders() })
        return true
      } catch (error) {
        handleAxiosError(error)
        return false
      }
    },
    async obtenerCitas(id) {
      try {
        const { data } = await axios.get(`${API_BASE_URL}/doctores/${id}/citas`, { headers: getAuthHeaders() })
        return data
      } catch (error) {
        handleAxiosError(error)
      }
    }
  },
  pacientes: {
    async listar() {
      try {
        const { data } = await axios.get(`${API_BASE_URL}/pacientes`, { headers: getAuthHeaders() })
        return data
      } catch (error) {
        handleAxiosError(error)
      }
    },
    async obtener(id) {
      try {
        const { data } = await axios.get(`${API_BASE_URL}/pacientes/${id}`, { headers: getAuthHeaders() })
        return data
      } catch (error) {
        handleAxiosError(error)
      }
    },
    async crear(paciente) {
      try {
        await axios.post(`${API_BASE_URL}/pacientes`, paciente, { headers: getAuthHeaders() })
        return true
      } catch (error) {
        handleAxiosError(error)
        return false
      }
    },
    async actualizar(id, paciente) {
      try {
        await axios.put(`${API_BASE_URL}/pacientes/${id}`, paciente, { headers: getAuthHeaders() })
        return true
      } catch (error) {
        handleAxiosError(error)
        return false
      }
    },
    async eliminar(id) {
      try {
        await axios.delete(`${API_BASE_URL}/pacientes/${id}`, { headers: getAuthHeaders() })
        return true
      } catch (error) {
        handleAxiosError(error)
        return false
      }
    },
    async obtenerCitas(id) {
      try {
        const { data } = await axios.get(`${API_BASE_URL}/pacientes/${id}/citas`, { headers: getAuthHeaders() })
        return data
      } catch (error) {
        handleAxiosError(error)
      }
    }
  },
  citas: {
    async listar() {
      try {
        const { data } = await axios.get(`${API_BASE_URL}/citas`, { headers: getAuthHeaders() })
        return data
      } catch (error) {
        handleAxiosError(error)
      }
    },
    async obtener(id) {
      try {
        const { data } = await axios.get(`${API_BASE_URL}/citas/${id}`, { headers: getAuthHeaders() })
        return data
      } catch (error) {
        handleAxiosError(error)
      }
    },
    async crear(cita) {
      try {
        await axios.post(`${API_BASE_URL}/citas`, cita, { headers: getAuthHeaders() })
        return true
      } catch (error) {
        handleAxiosError(error)
        return false
      }
    },
    async actualizar(id, cita) {
      try {
        await axios.put(`${API_BASE_URL}/citas/${id}`, cita, { headers: getAuthHeaders() })
        return true
      } catch (error) {
        handleAxiosError(error)
        return false
      }
    },
    async eliminar(id) {
      try {
        await axios.delete(`${API_BASE_URL}/citas/${id}`, { headers: getAuthHeaders() })
        return true
      } catch (error) {
        handleAxiosError(error)
        return false
      }
    },
    async cancelar(id) {
      try {
        await axios.put(`${API_BASE_URL}/citas/${id}/cancelar`, {}, { headers: getAuthHeaders() })
        return true
      } catch (error) {
        handleAxiosError(error)
        return false
      }
    },
    async listarPorDoctor(idDoctor) {
      try {
        const { data } = await axios.get(`${API_BASE_URL}/citas/doctor/${idDoctor}`, { headers: getAuthHeaders() })
        return data
      } catch (error) {
        handleAxiosError(error)
      }
    },
    async listarPorPaciente(idPaciente) {
      try {
        const { data } = await axios.get(`${API_BASE_URL}/citas/paciente/${idPaciente}`, { headers: getAuthHeaders() })
        return data
      } catch (error) {
        handleAxiosError(error)
      }
    }
  }
}

export default gestionHospitalClient
