<template>
  <div class="doctor-view">
    <Navbar />
    
    <main class="main-content">
      <div class="container">
        <header class="page-header">
          <div>
            <h1>Gestión de Doctores</h1>
            <p>Administra los doctores del hospital</p>
          </div>
          <button class="btn btn-primary" @click="openCreateModal">
            + Nuevo Doctor
          </button>
        </header>

        <div v-if="error" class="error-message">{{ error }}</div>

        <DoctorList 
          :doctores="doctores" 
          :loading="loading"
          @edit="openEditModal"
          @delete="openDeleteModal"
        />
      </div>
    </main>

    <!-- Modal Crear/Editar -->
    <Modal 
      :show="showModal" 
      :title="isEditing ? 'Editar Doctor' : 'Nuevo Doctor'"
      @close="closeModal"
    >
      <DoctorForm 
        :doctor="selectedDoctor"
        :loading="loading"
        :error="formError"
        @submit="handleSubmit"
        @cancel="closeModal"
      />
    </Modal>

    <!-- Diálogo Confirmar Eliminación -->
    <ConfirmDialog 
      :show="showDeleteDialog"
      title="Eliminar Doctor"
      :message="`¿Está seguro de eliminar al doctor ${selectedDoctor?.nombre}?`"
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
import DoctorList from '@/components/doctor/DoctorList.vue'
import DoctorForm from '@/components/doctor/DoctorForm.vue'
import { useDoctor } from '@/composables/useDoctor'

const { 
  doctores, 
  loading, 
  error, 
  listarDoctores, 
  crearDoctor, 
  actualizarDoctor, 
  eliminarDoctor 
} = useDoctor()

const showModal = ref(false)
const showDeleteDialog = ref(false)
const selectedDoctor = ref(null)
const formError = ref(null)

const isEditing = computed(() => !!selectedDoctor.value?.id_doctor)

onMounted(() => {
  listarDoctores()
})

const openCreateModal = () => {
  selectedDoctor.value = null
  formError.value = null
  showModal.value = true
}

const openEditModal = (doctor) => {
  selectedDoctor.value = { ...doctor }
  formError.value = null
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
  selectedDoctor.value = null
  formError.value = null
}

const openDeleteModal = (doctor) => {
  selectedDoctor.value = doctor
  showDeleteDialog.value = true
}

const closeDeleteDialog = () => {
  showDeleteDialog.value = false
  selectedDoctor.value = null
}

const handleSubmit = async (doctorData) => {
  formError.value = null
  let success = false

  if (isEditing.value) {
    success = await actualizarDoctor(selectedDoctor.value.id_doctor, doctorData)
  } else {
    success = await crearDoctor(doctorData)
  }

  if (success) {
    closeModal()
  } else {
    formError.value = error.value
  }
}

const handleDelete = async () => {
  if (selectedDoctor.value) {
    await eliminarDoctor(selectedDoctor.value.id_doctor)
    closeDeleteDialog()
  }
}
</script>

<style scoped>
.doctor-view {
  min-height: 100vh;
  background: #ffffff;
}

.main-content {
  padding: 40px 24px;
}

.container {
  max-width: 1000px;
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
</style>
