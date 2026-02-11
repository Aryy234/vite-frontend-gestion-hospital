<template>
  <div class="paciente-list">
    <LoadingSpinner v-if="loading" message="Cargando pacientes..." />
    
    <div v-else-if="pacientes.length === 0" class="empty-state">
      <span class="empty-icon">🧑</span>
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
.paciente-list {
  width: 100%;
}

.list-grid {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.empty-state {
  text-align: center;
  padding: 60px 20px;
  color: #5a6c7d;
}

.empty-icon {
  font-size: 48px;
  display: block;
  margin-bottom: 16px;
  opacity: 0.5;
}

.empty-state p {
  margin: 0;
  font-size: 16px;
}
</style>
