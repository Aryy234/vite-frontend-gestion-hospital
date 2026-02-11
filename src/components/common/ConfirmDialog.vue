<template>
  <Modal :show="show" :title="title" @close="cancel">
    <div class="confirm-dialog">
      <p class="confirm-message">{{ message }}</p>
      <div class="confirm-actions">
        <button class="btn btn-secondary" @click="cancel">Cancelar</button>
        <button class="btn btn-danger" @click="confirm">{{ confirmText }}</button>
      </div>
    </div>
  </Modal>
</template>

<script setup>
import Modal from './Modal.vue'

defineProps({
  show: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: 'Confirmar'
  },
  message: {
    type: String,
    default: '¿Está seguro de realizar esta acción?'
  },
  confirmText: {
    type: String,
    default: 'Eliminar'
  }
})

const emit = defineEmits(['confirm', 'cancel'])

const confirm = () => {
  emit('confirm')
}

const cancel = () => {
  emit('cancel')
}
</script>

<style scoped>
.confirm-dialog {
  text-align: center;
}

.confirm-message {
  color: #5a6c7d;
  font-size: 16px;
  margin-bottom: 24px;
}

.confirm-actions {
  display: flex;
  justify-content: center;
  gap: 12px;
}

.btn {
  padding: 10px 24px;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-secondary {
  background: #e8eef3;
  color: #1a2332;
}

.btn-secondary:hover {
  background: #d1dbe3;
}

.btn-danger {
  background: #dc3545;
  color: #ffffff;
}

.btn-danger:hover {
  background: #c82333;
}
</style>
