import { ref } from 'vue'
import gestionHospitalClient from '@/clients/gestionHospitalClient'

export function useDoctor() {
  const doctores = ref([])
  const doctor = ref(null)
  const loading = ref(false)
  const error = ref(null)

  const listarDoctores = async () => {
    loading.value = true
    error.value = null
    try {
      doctores.value = await gestionHospitalClient.doctores.listar()
    } catch (err) {
      error.value = err.message
      doctores.value = []
    } finally {
      loading.value = false
    }
  }

  const obtenerDoctor = async (id) => {
    loading.value = true
    error.value = null
    try {
      doctor.value = await gestionHospitalClient.doctores.obtener(id)
    } catch (err) {
      error.value = err.message
      doctor.value = null
    } finally {
      loading.value = false
    }
  }

  const crearDoctor = async (doctorData) => {
    loading.value = true
    error.value = null
    try {
      await gestionHospitalClient.doctores.crear(doctorData)
      await listarDoctores()
      return true
    } catch (err) {
      error.value = err.message
      return false
    } finally {
      loading.value = false
    }
  }

  const actualizarDoctor = async (id, doctorData) => {
    loading.value = true
    error.value = null
    try {
      await gestionHospitalClient.doctores.actualizar(id, doctorData)
      await listarDoctores()
      return true
    } catch (err) {
      error.value = err.message
      return false
    } finally {
      loading.value = false
    }
  }

  const eliminarDoctor = async (id) => {
    loading.value = true
    error.value = null
    try {
      await gestionHospitalClient.doctores.eliminar(id)
      await listarDoctores()
      return true
    } catch (err) {
      error.value = err.message
      return false
    } finally {
      loading.value = false
    }
  }

  return {
    doctores,
    doctor,
    loading,
    error,
    listarDoctores,
    obtenerDoctor,
    crearDoctor,
    actualizarDoctor,
    eliminarDoctor
  }
}

export default useDoctor
