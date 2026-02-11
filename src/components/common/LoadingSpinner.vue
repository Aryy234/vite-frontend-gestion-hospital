<template>
  <div class="loading-spinner">
    <div class="spinner"></div>
    <p v-if="message">{{ message }}</p>
  </div>
</template>

<script setup>
defineProps({
  message: {
    type: String,
    default: 'Cargando...'
  }
})
</script>

<style scoped>
/* Minimalista, moderno y profesional */
.loading-spinner {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 48px;
}
.spinner {
  width: 48px;
  height: 48px;
  border: 4px solid #e8eef3;
  border-top-color: #1a2332;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}
.loading-spinner p {
  margin-top: 20px;
  color: #5a6c7d;
  font-size: 15px;
  font-weight: 500;
  letter-spacing: 0.3px;
}
@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>
