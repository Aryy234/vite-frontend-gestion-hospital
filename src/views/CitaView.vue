<template>
  <div class="cita-view">
    <Navbar />
    
    <main class="main-content">
      <div class="container">
        <header class="page-header">
          <div>
            <h1>Agendamiento de Citas</h1>
            <p>Gestiona las citas del hospital</p>
          </div>
          <button class="btn btn-primary" @click="openCreateModal">
            + Nueva Cita
          </button>
        </header>

        <div v-if="error" class="error-message">{{ error }}</div>

        <div class="cita-layout">
          <aside class="cita-sidebar">
            <CalendarioCitas 
              :citas="citas" 
              @selectDate="handleSelectDate"
            />

            <div class="filters">
              <h4>Filtros</h4>
              <div class="filter-group">
                <label>Doctor</label>
                <select v-model="filterDoctor" @change="applyFilters">
                  <option value="">Todos</option>
                  <option 
                    v-for="doctor in doctores" 
                    :key="doctor.id_doctor" 
                    :value="doctor.id_doctor"
                  >
                    {{ doctor.nombre }}
                  </option>
                </select>
              </div>
            </div>
          </aside>

          <div class="cita-main">
            <CitaList 
              :citas="filteredCitas" 
              :doctores="doctores"
              :pacientes="pacientes"
              :loading="loading"
              @edit="openEditModal"
              @delete="openDeleteModal"
              @cancel="handleCancelCita"
            />
          </div>
        </div>
      </div>
    </main>

    <!-- Modal Crear/Editar -->
    <Modal 
      :show="showModal" 
      :title="isEditing ? 'Editar Cita' : 'Nueva Cita'"
      @close="closeModal"
    >
      <CitaForm 
        :cita="selectedCita"
        :doctores="doctores"
        :pacientes="pacientes"
        :loading="loading"
        :error="formError"
        @submit="handleSubmit"
        @cancel="closeModal"
      />
    </Modal>

    <!-- Diálogo Confirmar Eliminación -->
    <ConfirmDialog 
      :show="showDeleteDialog"
      title="Eliminar Cita"
      message="¿Está seguro de eliminar esta cita?"
      @confirm="handleDelete"
      @cancel="closeDeleteDialog"
    />

    <!-- Diálogo Confirmar Cancelación -->
    <ConfirmDialog 
      :show="showCancelDialog"
      title="Cancelar Cita"
      message="¿Está seguro de cancelar esta cita?"
      confirmText="Cancelar Cita"
      @confirm="confirmCancelCita"
      @cancel="closeCancelDialog"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import Navbar from '@/components/common/Navbar.vue'
import Modal from '@/components/common/Modal.vue'
import ConfirmDialog from '@/components/common/ConfirmDialog.vue'
import CitaList from '@/components/cita/CitaList.vue'
import CitaForm from '@/components/cita/CitaForm.vue'
import CalendarioCitas from '@/components/cita/CalendarioCitas.vue'
import { useCita } from '@/composables/useCita'
import { useDoctor } from '@/composables/useDoctor'
import { usePaciente } from '@/composables/usePaciente'

const { 
  citas, 
  loading, 
  error, 
  listarCitas, 
  crearCita, 
  actualizarCita, 
  eliminarCita,
  cancelarCita 
} = useCita()

const { doctores, listarDoctores } = useDoctor()
const { pacientes, listarPacientes } = usePaciente()

const showModal = ref(false)
const showDeleteDialog = ref(false)
const showCancelDialog = ref(false)
const selectedCita = ref(null)
const formError = ref(null)
const filterDoctor = ref('')
const selectedDate = ref(null)

const isEditing = computed(() => !!selectedCita.value?.id_cita)

const filteredCitas = computed(() => {
  let result = [...citas.value]
  
  if (filterDoctor.value) {
    result = result.filter(c => c.id_doctor === filterDoctor.value)
  }
  
  if (selectedDate.value) {
    result = result.filter(c => {
      const citaDate = new Date(c.fecha_hora)
      return citaDate.toDateString() === selectedDate.value.toDateString()
    })
  }
  
  // Ordenar por fecha
  result.sort((a, b) => new Date(a.fecha_hora) - new Date(b.fecha_hora))
  
  return result
})

onMounted(async () => {
  await Promise.all([
    listarCitas(),
    listarDoctores(),
    listarPacientes()
  ])
})

const handleSelectDate = (date) => {
  selectedDate.value = date
}

const applyFilters = () => {
  // Los filtros se aplican automáticamente vía computed
}

const openCreateModal = () => {
  selectedCita.value = null
  formError.value = null
  showModal.value = true
}

const openEditModal = (cita) => {
  selectedCita.value = { ...cita }
  formError.value = null
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
  selectedCita.value = null
  formError.value = null
}

const openDeleteModal = (cita) => {
  selectedCita.value = cita
  showDeleteDialog.value = true
}

const closeDeleteDialog = () => {
  showDeleteDialog.value = false
  selectedCita.value = null
}

const handleCancelCita = (cita) => {
  selectedCita.value = cita
  showCancelDialog.value = true
}

const closeCancelDialog = () => {
  showCancelDialog.value = false
  selectedCita.value = null
}

const handleSubmit = async (citaData) => {
  formError.value = null
  let success = false

  if (isEditing.value) {
    success = await actualizarCita(selectedCita.value.id_cita, citaData)
  } else {
    success = await crearCita(citaData)
  }

  if (success) {
    closeModal()
  } else {
    formError.value = error.value
  }
}

const handleDelete = async () => {
  if (selectedCita.value) {
    await eliminarCita(selectedCita.value.id_cita)
    closeDeleteDialog()
  }
}

const confirmCancelCita = async () => {
  if (selectedCita.value) {
    await cancelarCita(selectedCita.value.id_cita)
    closeCancelDialog()
  }
}
</script>

<style scoped>
.cita-view {
  min-height: 100vh;
  background: #ffffff;
}

.main-content {
  padding: 40px 24px;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
}

.page-header h1 {
  margin: 0 0 4px 0;
  color: #1a2332;
  font-size: 28px;
  font-weight: 700;
}

.page-header p {
  margin: 0;
  color: #5a6c7d;
  font-size: 14px;
}

.btn {
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-primary {
  background: #1a2332;
  color: #ffffff;
}

.btn-primary:hover {
  background: #2c3e50;
}

.error-message {
  color: #dc3545;
  padding: 12px 16px;
  background: #ffe6e6;
  border-radius: 8px;
  margin-bottom: 24px;
}

.cita-layout {
  display: flex;
  gap: 24px;
}

.cita-sidebar {
  width: 300px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.cita-main {
  flex: 1;
}

.filters {
  background: #e8eef3;
  border-radius: 8px;
  padding: 16px;
}

.filters h4 {
  margin: 0 0 16px 0;
  color: #1a2332;
  font-size: 14px;
  font-weight: 600;
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.filter-group label {
  font-size: 12px;
  color: #5a6c7d;
}

.filter-group select {
  padding: 8px 12px;
  border: 1px solid #d1dbe3;
  border-radius: 6px;
  font-size: 14px;
  background: #ffffff;
}

.filter-group select:focus {
  outline: none;
  border-color: #1a2332;
}

@media (max-width: 768px) {
  .cita-layout {
    flex-direction: column;
  }

  .cita-sidebar {
    width: 100%;
  }
}
</style>
