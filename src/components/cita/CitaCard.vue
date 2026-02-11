<template>
  <div class="cita-card" :class="estadoClass">
    <div class="card-time">
      <span class="time-icon">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="18" height="16" rx="4" stroke="#1a2332" stroke-width="1.5"/><path d="M8 2v4M16 2v4" stroke="#1a2332" stroke-width="1.5"/><rect x="7" y="10" width="2" height="2" rx="1" fill="#1a2332"/><rect x="11" y="10" width="2" height="2" rx="1" fill="#1a2332"/><rect x="15" y="10" width="2" height="2" rx="1" fill="#1a2332"/></svg>
      </span>
      <span class="time-text">{{ formatDate(cita.fecha_hora) }}</span>
    </div>
    <div class="card-content">
      <div class="card-info">
        <span class="info-label">👨‍⚕️</span>
        <span class="info-value">{{ doctorNombre }}</span>
        <span class="info-label">🧑‍🦰</span>
        <span class="info-value">{{ pacienteNombre }}</span>
      </div>
      <span class="card-status" :class="estadoClass">{{ cita.estado }}</span>
    </div>
    <div class="card-actions">
      <button v-if="cita.estado === 'Agendada'" class="btn-icon btn-cancel" @click="$emit('cancel', cita)" title="Cancelar cita">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="#dc3545" stroke-width="1.5"/><path d="M8 8l8 8M16 8l-8 8" stroke="#dc3545" stroke-width="1.5"/></svg>
      </button>
      <button class="btn-icon btn-edit" @click="$emit('edit', cita)" title="Editar">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M4 20h4l10-10a2 2 0 0 0-2-2l-10 10v4z" stroke="#1a2332" stroke-width="1.5"/></svg>
      </button>
      <button class="btn-icon btn-delete" @click="$emit('delete', cita)" title="Eliminar">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><rect x="5" y="6" width="14" height="14" rx="2" stroke="#dc3545" stroke-width="1.5"/><path d="M9 10v6M15 10v6" stroke="#dc3545" stroke-width="1.5"/></svg>
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
/* Minimalista, moderno y profesional */
.cita-card {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(26,35,50,0.08);
  padding: 18px 22px;
  display: flex;
  align-items: center;
  gap: 18px;
  border-left: 4px solid #e8eef3;
  transition: box-shadow 0.2s;
}
.cita-card.status-agendada { border-left-color: #28a745; }
.cita-card.status-cancelada { border-left-color: #dc3545; }
.cita-card.status-completada { border-left-color: #1a2332; }
.cita-card:hover { box-shadow: 0 4px 16px rgba(26,35,50,0.12); }
.card-time {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  min-width: 90px;
  padding: 8px 0;
}
.time-icon svg { display: block; }
.time-text {
  font-size: 13px;
  color: #1a2332;
  font-weight: 600;
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
  gap: 12px;
  font-size: 15px;
  align-items: center;
}
.info-label {
  color: #5a6c7d;
  font-size: 16px;
  margin-right: 2px;
}
.info-value {
  color: #1a2332;
  font-weight: 600;
  margin-right: 12px;
}
.card-status {
  padding: 4px 14px;
  border-radius: 14px;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.5px;
  background: #e8eef3;
  color: #1a2332;
}
.card-status.status-agendada { background: #d4edda; color: #28a745; }
.card-status.status-cancelada { background: #f8d7da; color: #dc3545; }
.card-status.status-completada { background: #e8eef3; color: #1a2332; }
.card-actions {
  display: flex;
  gap: 10px;
}
.btn-icon {
  background: none;
  border: none;
  cursor: pointer;
  padding: 6px;
  border-radius: 6px;
  transition: background 0.2s;
  display: flex;
  align-items: center;
}
.btn-icon svg { display: block; }
.btn-edit:hover { background: #e8eef3; }
.btn-delete:hover { background: #f8d7da; }
.btn-cancel:hover { background: #fff3cd; }
</style>
