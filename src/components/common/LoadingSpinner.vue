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
.loading-spinner {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #e8eef3;
  border-top-color: #1a2332;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.loading-spinner p {
  margin-top: 16px;
  color: #5a6c7d;
  font-size: 14px;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
