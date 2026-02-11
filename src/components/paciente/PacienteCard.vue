<template>
  <div class="paciente-card">
    <div class="card-icon">🧑</div>
    <div class="card-content">
      <h4 class="card-title">{{ paciente.nombre }}</h4>
      <p class="card-info">CI: {{ paciente.ci }}</p>
      <p class="card-phone">Tel: {{ paciente.telefono }}</p>
    </div>
    <div class="card-actions">
      <button class="btn-icon btn-edit" @click="$emit('edit', paciente)" title="Editar">
        ✏️
      </button>
      <button class="btn-icon btn-delete" @click="$emit('delete', paciente)" title="Eliminar">
        🗑️
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  paciente: {
    type: Object,
    required: true
  }
})

defineEmits(['edit', 'delete'])
</script>

<style scoped>
.paciente-card {
  background: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 16px;
  display: flex;
  align-items: center;
  gap: 16px;
  transition: all 0.2s;
}

.paciente-card:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  border-color: #1a2332;
}

.card-icon {
  font-size: 32px;
  background: #e8eef3;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.card-content {
  flex: 1;
}

.card-title {
  margin: 0 0 4px 0;
  color: #1a2332;
  font-size: 16px;
  font-weight: 600;
}

.card-info {
  margin: 0 0 4px 0;
  color: #2c3e50;
  font-size: 14px;
}

.card-phone {
  margin: 0;
  color: #5a6c7d;
  font-size: 12px;
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
</style>
