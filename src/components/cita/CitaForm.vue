<template>
  <form @submit.prevent="handleSubmit" class="cita-form">
    <div class="form-group">
      <label for="id_doctor">Doctor</label>
      <select 
        id="id_doctor"
        v-model.number="form.id_doctor"
        required
      >
        <option value="" disabled>Seleccione un doctor</option>
        <option 
          v-for="doctor in doctores" 
          :key="doctor.id_doctor" 
          :value="doctor.id_doctor"
        >
          {{ doctor.nombre }} - {{ doctor.especialidad }}
        </option>
      </select>
    </div>

    <div class="form-group">
      <label for="id_paciente">Paciente</label>
      <select 
        id="id_paciente"
        v-model.number="form.id_paciente"
        required
      >
        <option value="" disabled>Seleccione un paciente</option>
        <option 
          v-for="paciente in pacientes" 
          :key="paciente.id_paciente" 
          :value="paciente.id_paciente"
        >
          {{ paciente.nombre }} - CI: {{ paciente.ci }}
        </option>
      </select>
    </div>

    <div class="form-group">
      <label for="fecha_hora">Fecha y Hora</label>
      <input 
        id="fecha_hora"
        v-model="form.fecha_hora"
        type="datetime-local"
        required
      />
    </div>

    <div v-if="isEditing" class="form-group">
      <label for="estado">Estado</label>
      <select 
        id="estado"
        v-model="form.estado"
      >
        <option value="Agendada">Agendada</option>
        <option value="Cancelada">Cancelada</option>
        <option value="Completada">Completada</option>
      </select>
    </div>

    <div v-if="error" class="form-error">{{ error }}</div>

    <div class="form-actions">
      <button type="button" class="btn btn-secondary" @click="$emit('cancel')">
        Cancelar
      </button>
      <button type="submit" class="btn btn-primary" :disabled="loading">
        {{ loading ? 'Guardando...' : (isEditing ? 'Actualizar' : 'Agendar') }}
      </button>
    </div>
  </form>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const props = defineProps({
  cita: {
    type: Object,
    default: null
  },
  doctores: {
    type: Array,
    default: () => []
  },
  pacientes: {
    type: Array,
    default: () => []
  },
  loading: {
    type: Boolean,
    default: false
  },
  error: {
    type: String,
    default: null
  }
})

const emit = defineEmits(['submit', 'cancel'])

const isEditing = computed(() => !!props.cita?.id_cita)

const form = ref({
  id_doctor: '',
  id_paciente: '',
  fecha_hora: '',
  estado: 'Agendada'
})

const formatDateForInput = (dateString) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  const offset = date.getTimezoneOffset()
  const localDate = new Date(date.getTime() - (offset * 60 * 1000))
  return localDate.toISOString().slice(0, 16)
}

watch(() => props.cita, (newCita) => {
  if (newCita) {
    form.value = {
      id_doctor: newCita.id_doctor || '',
      id_paciente: newCita.id_paciente || '',
      fecha_hora: formatDateForInput(newCita.fecha_hora),
      estado: newCita.estado || 'Agendada'
    }
  } else {
    form.value = {
      id_doctor: '',
      id_paciente: '',
      fecha_hora: '',
      estado: 'Agendada'
    }
  }
}, { immediate: true })

const handleSubmit = () => {
  const citaData = {
    id_doctor: form.value.id_doctor,
    id_paciente: form.value.id_paciente,
    fecha_hora: new Date(form.value.fecha_hora).toISOString()
  }
  
  if (isEditing.value) {
    citaData.estado = form.value.estado
  }
  
  emit('submit', citaData)
}
</script>

<style scoped>
.cita-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.form-group label {
  color: #1a2332;
  font-size: 14px;
  font-weight: 500;
}

.form-group input,
.form-group select {
  padding: 10px 12px;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  font-size: 14px;
  transition: border-color 0.2s;
  background: #ffffff;
}

.form-group input:focus,
.form-group select:focus {
  outline: none;
  border-color: #1a2332;
}

.form-error {
  color: #dc3545;
  font-size: 14px;
  padding: 12px;
  background: #ffe6e6;
  border-radius: 6px;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 8px;
}

.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-secondary {
  background: #e8eef3;
  color: #1a2332;
}

.btn-secondary:hover:not(:disabled) {
  background: #d1dbe3;
}

.btn-primary {
  background: #1a2332;
  color: #ffffff;
}

.btn-primary:hover:not(:disabled) {
  background: #2c3e50;
}
</style>
