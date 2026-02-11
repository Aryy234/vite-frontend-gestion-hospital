<template>
  <div class="paciente-view">
    <Navbar />
    
    <main class="main-content">
      <div class="container">
        <header class="page-header">
          <div>
            <h1>Gestión de Pacientes</h1>
            <p>Administra los pacientes del hospital</p>
          </div>
          <button class="btn btn-primary" @click="openCreateModal">
            + Nuevo Paciente
          </button>
        </header>

        <div v-if="error" class="error-message">{{ error }}</div>

        <PacienteList 
          :pacientes="pacientes" 
          :loading="loading"
          @edit="openEditModal"
          @delete="openDeleteModal"
        />
      </div>
    </main>

    <!-- Modal Crear/Editar -->
    <Modal 
      :show="showModal" 
      :title="isEditing ? 'Editar Paciente' : 'Nuevo Paciente'"
      @close="closeModal"
    >
      <PacienteForm 
        :paciente="selectedPaciente"
        :loading="loading"
        :error="formError"
        @submit="handleSubmit"
        @cancel="closeModal"
      />
    </Modal>

    <!-- Diálogo Confirmar Eliminación -->
    <ConfirmDialog 
      :show="showDeleteDialog"
      title="Eliminar Paciente"
      :message="`¿Está seguro de eliminar al paciente ${selectedPaciente?.nombre}?`"
      @confirm="handleDelete"
      @cancel="closeDeleteDialog"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import Navbar from '@/components/common/Navbar.vue'
import Modal from '@/components/common/Modal.vue'
import ConfirmDialog from '@/components/common/ConfirmDialog.vue'
import PacienteList from '@/components/paciente/PacienteList.vue'
import PacienteForm from '@/components/paciente/PacienteForm.vue'
import { usePaciente } from '@/composables/usePaciente'

const { 
  pacientes, 
  loading, 
  error, 
  listarPacientes, 
  crearPaciente, 
  actualizarPaciente, 
  eliminarPaciente 
} = usePaciente()

const showModal = ref(false)
const showDeleteDialog = ref(false)
const selectedPaciente = ref(null)
const formError = ref(null)

const isEditing = computed(() => !!selectedPaciente.value?.id_paciente)

onMounted(() => {
  listarPacientes()
})

const openCreateModal = () => {
  selectedPaciente.value = null
  formError.value = null
  showModal.value = true
}

const openEditModal = (paciente) => {
  selectedPaciente.value = { ...paciente }
  formError.value = null
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
  selectedPaciente.value = null
  formError.value = null
}

const openDeleteModal = (paciente) => {
  selectedPaciente.value = paciente
  showDeleteDialog.value = true
}

const closeDeleteDialog = () => {
  showDeleteDialog.value = false
  selectedPaciente.value = null
}

const handleSubmit = async (pacienteData) => {
  formError.value = null
  let success = false

  if (isEditing.value) {
    success = await actualizarPaciente(selectedPaciente.value.id_paciente, pacienteData)
  } else {
    success = await crearPaciente(pacienteData)
  }

  if (success) {
    closeModal()
  } else {
    formError.value = error.value
  }
}

const handleDelete = async () => {
  if (selectedPaciente.value) {
    await eliminarPaciente(selectedPaciente.value.id_paciente)
    closeDeleteDialog()
  }
}
</script>

<style scoped>
/* Minimalista, moderno y profesional */
.paciente-view {
  min-height: 100vh;
  background: #f8f9fa;
}
.main-content { padding: 48px 24px; }
.container {
  max-width: 1000px;
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
</style>
