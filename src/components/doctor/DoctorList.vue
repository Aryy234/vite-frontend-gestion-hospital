<template>
  <div class="doctor-list">
    <LoadingSpinner v-if="loading" message="Cargando doctores..." />
    
    <div v-else-if="doctores.length === 0" class="empty-state">
      <span class="empty-icon">👨‍⚕️</span>
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
.doctor-list {
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
