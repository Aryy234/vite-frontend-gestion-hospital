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
/* Minimalista, moderno y profesional */
.doctor-form {
  display: flex;
  flex-direction: column;
  gap: 24px;
}
.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.form-group label {
  color: #1a2332;
  font-size: 15px;
  font-weight: 600;
  letter-spacing: 0.3px;
}
.form-group input {
  padding: 12px 16px;
  border: 2px solid #e8eef3;
  border-radius: 8px;
  font-size: 15px;
  transition: all 0.2s;
  background: #fff;
}
.form-group input:focus {
  outline: none;
  border-color: #1a2332;
  box-shadow: 0 0 0 3px rgba(26,35,50,0.08);
}
.form-group input::placeholder { color: #9ca3af; }
.form-error {
  color: #dc3545;
  font-size: 14px;
  padding: 14px 16px;
  background: #f8d7da;
  border-radius: 8px;
  font-weight: 500;
}
.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 8px;
}
.btn {
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  letter-spacing: 0.5px;
}
.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.btn-secondary {
  background: #e8eef3;
  color: #1a2332;
}
.btn-secondary:hover:not(:disabled) {
  background: #d1dbe3;
  transform: translateY(-1px);
}
.btn-primary {
  background: #1a2332;
  color: #fff;
  box-shadow: 0 2px 8px rgba(26,35,50,0.15);
}
.btn-primary:hover:not(:disabled) {
  background: #2c3e50;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(26,35,50,0.25);
}
</style>
