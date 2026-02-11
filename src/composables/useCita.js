import { ref } from 'vue'
import gestionHospitalClient from '@/clients/gestionHospitalClient'

export function useCita() {
  const citas = ref([])
  const cita = ref(null)
  const loading = ref(false)
  const error = ref(null)

  const listarCitas = async () => {
    loading.value = true
    error.value = null
    try {
      citas.value = await gestionHospitalClient.citas.listar()
    } catch (err) {
      error.value = err.message
      citas.value = []
    } finally {
      loading.value = false
    }
  }

  const obtenerCita = async (id) => {
    loading.value = true
    error.value = null
    try {
      cita.value = await gestionHospitalClient.citas.obtener(id)
    } catch (err) {
      error.value = err.message
      cita.value = null
    } finally {
      loading.value = false
    }
  }

  const crearCita = async (citaData) => {
    loading.value = true
    error.value = null
    try {
      await gestionHospitalClient.citas.crear(citaData)
      await listarCitas()
      return true
    } catch (err) {
      error.value = err.message
      return false
    } finally {
      loading.value = false
    }
  }

  const actualizarCita = async (id, citaData) => {
    loading.value = true
    error.value = null
    try {
      await gestionHospitalClient.citas.actualizar(id, citaData)
      await listarCitas()
      return true
    } catch (err) {
      error.value = err.message
      return false
    } finally {
      loading.value = false
    }
  }

  const eliminarCita = async (id) => {
    loading.value = true
    error.value = null
    try {
      await gestionHospitalClient.citas.eliminar(id)
      await listarCitas()
      return true
    } catch (err) {
      error.value = err.message
      return false
    } finally {
      loading.value = false
    }
  }

  const cancelarCita = async (id) => {
    loading.value = true
    error.value = null
    try {
      await gestionHospitalClient.citas.cancelar(id)
      await listarCitas()
      return true
    } catch (err) {
      error.value = err.message
      return false
    } finally {
      loading.value = false
    }
  }

  const listarCitasPorDoctor = async (idDoctor) => {
    loading.value = true
    error.value = null
    try {
      citas.value = await gestionHospitalClient.citas.listarPorDoctor(idDoctor)
    } catch (err) {
      error.value = err.message
      citas.value = []
    } finally {
      loading.value = false
    }
  }

  const listarCitasPorPaciente = async (idPaciente) => {
    loading.value = true
    error.value = null
    try {
      citas.value = await gestionHospitalClient.citas.listarPorPaciente(idPaciente)
    } catch (err) {
      error.value = err.message
      citas.value = []
    } finally {
      loading.value = false
    }
  }

  return {
    citas,
    cita,
    loading,
    error,
    listarCitas,
    obtenerCita,
    crearCita,
    actualizarCita,
    eliminarCita,
    cancelarCita,
    listarCitasPorDoctor,
    listarCitasPorPaciente
  }
}

export default useCita
