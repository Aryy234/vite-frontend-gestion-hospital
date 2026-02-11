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
.sidebar {
  background: #e8eef3;
  border-radius: 8px;
  padding: 20px;
  min-width: 220px;
}

.sidebar-header h3 {
  color: #1a2332;
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 16px 0;
  padding-bottom: 12px;
  border-bottom: 1px solid #d1dbe3;
}

.sidebar-content {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>
