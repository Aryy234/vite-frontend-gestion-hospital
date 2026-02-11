<template>
  <div class="doctor-list">
    <LoadingSpinner v-if="loading" message="Cargando doctores..." />
    
    <div v-else-if="doctores.length === 0" class="empty-state">
      <svg width="64" height="64" viewBox="0 0 24 24" fill="none" class="empty-icon">
        <circle cx="12" cy="12" r="10" stroke="#5a6c7d" stroke-width="1.5" opacity="0.3"/>
        <path d="M12 7a3 3 0 0 1 3 3v1a3 3 0 0 1-6 0v-1a3 3 0 0 1 3-3z" stroke="#5a6c7d" stroke-width="1.5" opacity="0.3"/>
      </svg>
      <p>No hay doctores registrados</p>
    </div>

    <div v-else class="list-grid">
      <DoctorCard 
        v-for="doctor in doctores" 
        :key="doctor.id_doctor"
        :doctor="doctor"
        @edit="$emit('edit', doctor)"
        @delete="$emit('delete', doctor)"
      />
    </div>
  </div>
</template>

<script setup>
import DoctorCard from './DoctorCard.vue'
import LoadingSpinner from '@/components/common/LoadingSpinner.vue'

defineProps({
  doctores: {
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
.doctor-list { width: 100%; }
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
