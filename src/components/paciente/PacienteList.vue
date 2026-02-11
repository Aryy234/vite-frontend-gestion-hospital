<template>
  <div class="paciente-list">
    <LoadingSpinner v-if="loading" message="Cargando pacientes..." />
    
    <div v-else-if="pacientes.length === 0" class="empty-state">
      <svg width="64" height="64" viewBox="0 0 24 24" fill="none" class="empty-icon">
        <circle cx="12" cy="12" r="10" stroke="#5a6c7d" stroke-width="1.5" opacity="0.3"/>
        <ellipse cx="12" cy="10" rx="3" ry="3.5" fill="#5a6c7d" opacity="0.2"/>
      </svg>
      <p>No hay pacientes registrados</p>
    </div>

    <div v-else class="list-grid">
      <PacienteCard 
        v-for="paciente in pacientes" 
        :key="paciente.id_paciente"
        :paciente="paciente"
        @edit="$emit('edit', paciente)"
        @delete="$emit('delete', paciente)"
      />
    </div>
  </div>
</template>

<script setup>
import PacienteCard from './PacienteCard.vue'
import LoadingSpinner from '@/components/common/LoadingSpinner.vue'

defineProps({
  pacientes: {
    type: Array,
    default: () => []
  },
  loading: {
    type: Boolean,
    default: false
  }
})

defineEmits(['edit', 'delete'])
</script>

<style scoped>
/* Minimalista, moderno y profesional */
.paciente-list { width: 100%; }
.list-grid {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.empty-state {
  text-align: center;
  padding: 80px 20px;
  color: #5a6c7d;
}
.empty-icon {
  display: block;
  margin: 0 auto 20px;
}
.empty-state p {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
}
</style>
