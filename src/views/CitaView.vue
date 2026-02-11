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
              @selectDate="selectedDate = $event"
            />

            <div class="filters">
              <h4>Filtros</h4>
              <div class="filter-group">
                <label>Doctor</label>
                <select v-model="filterDoctor">
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
      const cleanDate = c.fecha_hora.replace(/\[UTC\]$/, '')
      const citaDate = new Date(cleanDate)
      return citaDate.toDateString() === selectedDate.value.toDateString()
    })
  }
  
  return result.sort((a, b) => {
    const dateA = new Date(a.fecha_hora.replace(/\[UTC\]$/, ''))
    const dateB = new Date(b.fecha_hora.replace(/\[UTC\]$/, ''))
    return dateA - dateB
  })
})

onMounted(async () => {
  await Promise.all([
    listarCitas(),
    listarDoctores(),
    listarPacientes()
  ])
})

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
  const success = isEditing.value 
    ? await actualizarCita(selectedCita.value.id_cita, citaData)
    : await crearCita(citaData)

  if (success) {
    closeModal()
  } else {
    formError.value = error.value
  }
}

const handleDelete = async () => {
  await eliminarCita(selectedCita.value.id_cita)
  closeDeleteDialog()
}

const confirmCancelCita = async () => {
  await cancelarCita(selectedCita.value.id_cita)
  closeCancelDialog()
}
</script>

<style scoped>
/* Minimalista, moderno y profesional */
.cita-view {
  min-height: 100vh;
  background: #f8f9fa;
}
.main-content { padding: 48px 24px; }
.container {
  max-width: 1200px;
  margin: 0 auto;
}
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 36px;
}
.page-header h1 {
  margin: 0 0 8px 0;
  color: #1a2332;
  font-size: 32px;
  font-weight: 800;
  letter-spacing: -0.5px;
}
.page-header p {
  margin: 0;
  color: #5a6c7d;
  font-size: 16px;
  font-weight: 500;
}
.btn {
  padding: 14px 28px;
  border: none;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;
  letter-spacing: 0.5px;
}
.btn-primary {
  background: #1a2332;
  color: #fff;
  box-shadow: 0 4px 12px rgba(26,35,50,0.2);
}
.btn-primary:hover {
  background: #2c3e50;
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(26,35,50,0.3);
}
.error-message {
  color: #dc3545;
  padding: 16px 20px;
  background: #f8d7da;
  border-radius: 10px;
  margin-bottom: 28px;
  font-weight: 600;
  border-left: 4px solid #dc3545;
}
.cita-layout {
  display: flex;
  gap: 28px;
}
.cita-sidebar {
  width: 320px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 28px;
}
.cita-main { flex: 1; }
.filters {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(26,35,50,0.08);
  padding: 24px;
}
.filters h4 {
  margin: 0 0 20px 0;
  color: #1a2332;
  font-size: 18px;
  font-weight: 700;
  letter-spacing: 0.5px;
}
.filter-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.filter-group label {
  font-size: 14px;
  color: #1a2332;
  font-weight: 600;
}
.filter-group select {
  padding: 12px 16px;
  border: 2px solid #e8eef3;
  border-radius: 8px;
  font-size: 15px;
  background: #fff;
  transition: all 0.2s;
}
.filter-group select:focus {
  outline: none;
  border-color: #1a2332;
  box-shadow: 0 0 0 3px rgba(26,35,50,0.08);
}
@media (max-width: 768px) {
  .cita-layout { flex-direction: column; }
  .cita-sidebar { width: 100%; }
}
</style>
