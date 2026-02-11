<template>
  <div class="paciente-card">
    <div class="card-icon">
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="#1a2332" stroke-width="1.5"/><ellipse cx="12" cy="10" rx="3" ry="3.5" fill="#e8eef3"/><rect x="9" y="15" width="6" height="2" rx="1" fill="#e8eef3"/></svg>
    </div>
    <div class="card-content">
      <h4 class="card-title">{{ paciente.nombre }}</h4>
      <p class="card-info">CI: {{ paciente.ci }}</p>
      <p class="card-phone">Tel: {{ paciente.telefono }}</p>
    </div>
    <div class="card-actions">
      <button class="btn-icon btn-edit" @click="$emit('edit', paciente)" title="Editar">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M4 20h4l10-10a2 2 0 0 0-2-2l-10 10v4z" stroke="#1a2332" stroke-width="1.5"/></svg>
      </button>
      <button class="btn-icon btn-delete" @click="$emit('delete', paciente)" title="Eliminar">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><rect x="5" y="6" width="14" height="14" rx="2" stroke="#dc3545" stroke-width="1.5"/><path d="M9 10v6M15 10v6" stroke="#dc3545" stroke-width="1.5"/></svg>
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
/* Minimalista, moderno y profesional */
.paciente-card {
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
.paciente-card:hover { box-shadow: 0 4px 16px rgba(26,35,50,0.12); }
.card-icon {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: #e8eef3;
  display: flex;
  align-items: center;
  justify-content: center;
}
.card-icon svg { display: block; }
.card-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.card-title {
  font-size: 18px;
  color: #1a2332;
  font-weight: 700;
}
.card-info {
  font-size: 15px;
  color: #5a6c7d;
}
.card-phone {
  font-size: 13px;
  color: #1a2332;
  font-weight: 500;
}
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
</style>
