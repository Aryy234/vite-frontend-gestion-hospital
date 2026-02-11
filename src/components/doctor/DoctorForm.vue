<template>
  <form @submit.prevent="handleSubmit" class="doctor-form">
    <div class="form-group">
      <label for="nombre">Nombre</label>
      <input 
        id="nombre"
        v-model="form.nombre"
        type="text"
        placeholder="Nombre del doctor"
        required
      />
    </div>

    <div class="form-group">
      <label for="especialidad">Especialidad</label>
      <input 
        id="especialidad"
        v-model="form.especialidad"
        type="text"
        placeholder="Ej: Cardiología"
        required
      />
    </div>

    <div class="form-group">
      <label for="nro_licencia">Número de Licencia</label>
      <input 
        id="nro_licencia"
        v-model="form.nro_licencia"
        type="text"
        placeholder="Número de licencia médica"
        required
      />
    </div>

    <div class="form-group">
      <label for="id_usuario">ID Usuario (opcional)</label>
      <input 
        id="id_usuario"
        v-model.number="form.id_usuario"
        type="number"
        placeholder="ID del usuario asociado"
      />
    </div>

    <div v-if="error" class="form-error">{{ error }}</div>

    <div class="form-actions">
      <button type="button" class="btn btn-secondary" @click="$emit('cancel')">
        Cancelar
      </button>
      <button type="submit" class="btn btn-primary" :disabled="loading">
        {{ loading ? 'Guardando...' : (isEditing ? 'Actualizar' : 'Guardar') }}
      </button>
    </div>
  </form>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const props = defineProps({
  doctor: {
    type: Object,
    default: null
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

const isEditing = computed(() => !!props.doctor?.id_doctor)

const form = ref({
  nombre: '',
  especialidad: '',
  nro_licencia: '',
  id_usuario: null
})

watch(() => props.doctor, (newDoctor) => {
  if (newDoctor) {
    form.value = {
      nombre: newDoctor.nombre || '',
      especialidad: newDoctor.especialidad || '',
      nro_licencia: newDoctor.nro_licencia || '',
      id_usuario: newDoctor.id_usuario || null
    }
  } else {
    form.value = {
      nombre: '',
      especialidad: '',
      nro_licencia: '',
      id_usuario: null
    }
  }
}, { immediate: true })

const handleSubmit = () => {
  emit('submit', { ...form.value })
}
</script>

<style scoped>
.doctor-form {
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

.form-group input {
  padding: 10px 12px;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  font-size: 14px;
  transition: border-color 0.2s;
}

.form-group input:focus {
  outline: none;
  border-color: #1a2332;
}

.form-group input::placeholder {
  color: #9ca3af;
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
