<template>
  <div class="cita-list">
    <LoadingSpinner v-if="loading" message="Cargando citas..." />
    
    <div v-else-if="citas.length === 0" class="empty-state">
      <svg width="64" height="64" viewBox="0 0 24 24" fill="none" class="empty-icon">
        <rect x="3" y="4" width="18" height="16" rx="4" stroke="#5a6c7d" stroke-width="1.5" opacity="0.3"/>
        <path d="M8 2v4M16 2v4" stroke="#5a6c7d" stroke-width="1.5" opacity="0.3"/>
      </svg>
      <p>No hay citas programadas</p>
    </div>

    <div v-else class="list-grid">
      <CitaCard 
        v-for="cita in citas" 
        :key="cita.id_cita"
        :cita="cita"
        :doctores="doctores"
        :pacientes="pacientes"
        @edit="$emit('edit', cita)"
        @delete="$emit('delete', cita)"
        @cancel="$emit('cancel', cita)"
      />
    </div>
  </div>
</template>

<script setup>
import CitaCard from './CitaCard.vue'
import LoadingSpinner from '@/components/common/LoadingSpinner.vue'

defineProps({
  citas: {
    type: Array,
    default: () => []
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
  }
})

defineEmits(['edit', 'delete', 'cancel'])
</script>

<style scoped>
/* Minimalista, moderno y profesional */
.cita-list { width: 100%; }
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
