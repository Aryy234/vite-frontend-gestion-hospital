<template>
  <div class="cita-list">
    <LoadingSpinner v-if="loading" message="Cargando citas..." />
    
    <div v-else-if="citas.length === 0" class="empty-state">
      <span class="empty-icon">📅</span>
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
.cita-list {
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
