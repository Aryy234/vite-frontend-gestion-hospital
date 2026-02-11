import { ref } from 'vue'
import gestionHospitalClient from '@/clients/gestionHospitalClient'

export function usePaciente() {
  const pacientes = ref([])
  const paciente = ref(null)
  const loading = ref(false)
  const error = ref(null)

  const listarPacientes = async () => {
    loading.value = true
    error.value = null
    try {
      pacientes.value = await gestionHospitalClient.pacientes.listar()
    } catch (err) {
      error.value = err.message
      pacientes.value = []
    } finally {
      loading.value = false
    }
  }

  const obtenerPaciente = async (id) => {
    loading.value = true
    error.value = null
    try {
      paciente.value = await gestionHospitalClient.pacientes.obtener(id)
    } catch (err) {
      error.value = err.message
      paciente.value = null
    } finally {
      loading.value = false
    }
  }

  const crearPaciente = async (pacienteData) => {
    loading.value = true
    error.value = null
    try {
      await gestionHospitalClient.pacientes.crear(pacienteData)
      await listarPacientes()
      return true
    } catch (err) {
      error.value = err.message
      return false
    } finally {
      loading.value = false
    }
  }

  const actualizarPaciente = async (id, pacienteData) => {
    loading.value = true
    error.value = null
    try {
      await gestionHospitalClient.pacientes.actualizar(id, pacienteData)
      await listarPacientes()
      return true
    } catch (err) {
      error.value = err.message
      return false
    } finally {
      loading.value = false
    }
  }

  const eliminarPaciente = async (id) => {
    loading.value = true
    error.value = null
    try {
      await gestionHospitalClient.pacientes.eliminar(id)
      await listarPacientes()
      return true
    } catch (err) {
      error.value = err.message
      return false
    } finally {
      loading.value = false
    }
  }

  return {
    pacientes,
    paciente,
    loading,
    error,
    listarPacientes,
    obtenerPaciente,
    crearPaciente,
    actualizarPaciente,
    eliminarPaciente
  }
}

export default usePaciente
