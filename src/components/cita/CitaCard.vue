<template>
  <div class="cita-card" :class="estadoClass">
    <div class="card-time">
      <span class="time-icon">📅</span>
      <span class="time-text">{{ formatDate(cita.fecha_hora) }}</span>
    </div>
    <div class="card-content">
      <div class="card-info">
        <p class="info-item">
          <span class="info-label">Doctor:</span>
          <span class="info-value">{{ doctorNombre }}</span>
        </p>
        <p class="info-item">
          <span class="info-label">Paciente:</span>
          <span class="info-value">{{ pacienteNombre }}</span>
        </p>
      </div>
      <span class="card-status" :class="estadoClass">{{ cita.estado }}</span>
    </div>
    <div class="card-actions">
      <button 
        v-if="cita.estado === 'Agendada'"
        class="btn-icon btn-cancel" 
        @click="$emit('cancel', cita)" 
        title="Cancelar cita"
      >
        ❌
      </button>
      <button class="btn-icon btn-edit" @click="$emit('edit', cita)" title="Editar">
        ✏️
      </button>
      <button class="btn-icon btn-delete" @click="$emit('delete', cita)" title="Eliminar">
        🗑️
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  cita: {
    type: Object,
    required: true
  },
  doctores: {
    type: Array,
    default: () => []
  },
  pacientes: {
    type: Array,
    default: () => []
  }
})

defineEmits(['edit', 'delete', 'cancel'])

const doctorNombre = computed(() => {
  const doctor = props.doctores.find(d => d.id_doctor === props.cita.id_doctor)
  return doctor?.nombre || `Doctor #${props.cita.id_doctor}`
})

const pacienteNombre = computed(() => {
  const paciente = props.pacientes.find(p => p.id_paciente === props.cita.id_paciente)
  return paciente?.nombre || `Paciente #${props.cita.id_paciente}`
})

const estadoClass = computed(() => {
  const estado = props.cita.estado?.toLowerCase() || ''
  if (estado === 'agendada') return 'status-agendada'
  if (estado === 'cancelada') return 'status-cancelada'
  if (estado === 'completada') return 'status-completada'
  return ''
})

const formatDate = (dateString) => {
  if (!dateString) return 'Fecha no válida'
  const cleanDate = dateString.replace(/\[UTC\]$/, '')
  const date = new Date(cleanDate)
  if (isNaN(date.getTime())) return 'Fecha no válida'
  
  return date.toLocaleString('es-ES', {
    dateStyle: 'medium',
    timeStyle: 'short'
  })
}
</script>

<style scoped>
.cita-card {
  background: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 16px;
  display: flex;
  align-items: center;
  gap: 16px;
  transition: all 0.2s;
}

.cita-card:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.cita-card.status-agendada {
  border-left: 4px solid #28a745;
}

.cita-card.status-cancelada {
  border-left: 4px solid #dc3545;
}

.cita-card.status-completada {
  border-left: 4px solid #1a2332;
}

.card-time {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  min-width: 120px;
  padding: 8px;
  background: #e8eef3;
  border-radius: 6px;
}

.time-icon {
  font-size: 20px;
}

.time-text {
  font-size: 12px;
  color: #1a2332;
  font-weight: 500;
  text-align: center;
}

.card-content {
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.info-item {
  margin: 0;
  font-size: 14px;
}

.info-label {
  color: #5a6c7d;
  margin-right: 4px;
}

.info-value {
  color: #1a2332;
  font-weight: 500;
}

.card-status {
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
}

.card-status.status-agendada {
  background: #d4edda;
  color: #155724;
}

.card-status.status-cancelada {
  background: #f8d7da;
  color: #721c24;
}

.card-status.status-completada {
  background: #e8eef3;
  color: #1a2332;
}

.card-actions {
  display: flex;
  gap: 8px;
}

.btn-icon {
  background: none;
  border: none;
  font-size: 16px;
  cursor: pointer;
  padding: 8px;
  border-radius: 4px;
  transition: background 0.2s;
}

.btn-edit:hover {
  background: #e8eef3;
}

.btn-delete:hover {
  background: #ffe6e6;
}

.btn-cancel:hover {
  background: #fff3cd;
}
</style>
