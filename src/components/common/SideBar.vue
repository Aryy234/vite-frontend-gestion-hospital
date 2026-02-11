<template>
  <aside class="sidebar">
    <div class="sidebar-header">
      <h3>Filtros</h3>
    </div>
    <div class="sidebar-content">
      <slot></slot>
    </div>
  </aside>
</template>

<script setup>
</script>

<style scoped>
/* Minimalista, moderno y profesional */
.sidebar {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(26,35,50,0.08);
  padding: 24px;
  min-width: 240px;
}
.sidebar-header h3 {
  color: #1a2332;
  font-size: 18px;
  font-weight: 700;
  margin: 0 0 20px 0;
  padding-bottom: 16px;
  border-bottom: 2px solid #e8eef3;
  letter-spacing: 0.5px;
}
.sidebar-content {
  display: flex;
  flex-direction: column;
  gap: 18px;
}
</style>
