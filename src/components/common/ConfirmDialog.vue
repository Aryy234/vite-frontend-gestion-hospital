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
/* Minimalista, moderno y profesional */
.confirm-dialog { text-align: center; }
.confirm-message {
  color: #5a6c7d;
  font-size: 16px;
  margin-bottom: 28px;
  line-height: 1.5;
}
.confirm-actions {
  display: flex;
  justify-content: center;
  gap: 14px;
}
.btn {
  padding: 12px 28px;
  border: none;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  letter-spacing: 0.5px;
}
.btn-secondary {
  background: #e8eef3;
  color: #1a2332;
}
.btn-secondary:hover {
  background: #d1dbe3;
  transform: translateY(-1px);
}
.btn-danger {
  background: #dc3545;
  color: #fff;
  box-shadow: 0 2px 8px rgba(220,53,69,0.3);
}
.btn-danger:hover {
  background: #c82333;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(220,53,69,0.4);
}
</style>
