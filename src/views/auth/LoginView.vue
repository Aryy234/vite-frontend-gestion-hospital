<template>
  <div class="login-container">
    <div class="login-card">
      <div class="login-header">
        <span class="logo-icon">🏥</span>
        <h1>Hospital</h1>
        <p>Sistema de Gestión de Citas</p>
      </div>

      <form @submit.prevent="handleLogin" class="login-form">
        <div class="form-group">
          <label for="user">Usuario</label>
          <input 
            id="user"
            v-model="credentials.user"
            type="text"
            placeholder="Ingrese su usuario"
            required
            autocomplete="username"
          />
        </div>

        <div class="form-group">
          <label for="password">Contraseña</label>
          <input 
            id="password"
            v-model="credentials.password"
            type="password"
            placeholder="Ingrese su contraseña"
            required
            autocomplete="current-password"
          />
        </div>

        <div v-if="error" class="form-error">{{ error }}</div>

        <button type="submit" class="btn-login" :disabled="loading">
          {{ loading ? 'Iniciando sesión...' : 'Iniciar Sesión' }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuth } from '@/composables/useAuth'

const { login, loading, error } = useAuth()

const credentials = ref({
  user: '',
  password: ''
})

const handleLogin = async () => {
  await login(credentials.value.user, credentials.value.password)
}
</script>

<style scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ffffff;
  padding: 20px;
}

.login-card {
  background: #e8eef3;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  width: 100%;
  max-width: 400px;
}

.login-header {
  text-align: center;
  margin-bottom: 32px;
}

.logo-icon {
  font-size: 48px;
  display: block;
  margin-bottom: 16px;
}

.login-header h1 {
  margin: 0 0 8px 0;
  color: #1a2332;
  font-size: 28px;
  font-weight: 700;
}

.login-header p {
  margin: 0;
  color: #5a6c7d;
  font-size: 14px;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group label {
  color: #1a2332;
  font-size: 14px;
  font-weight: 500;
}

.form-group input {
  padding: 12px 16px;
  border: 1px solid #d1dbe3;
  border-radius: 8px;
  font-size: 14px;
  background: #ffffff;
  transition: border-color 0.2s;
}

.form-group input:focus {
  outline: none;
  border-color: #1a2332;
}

.form-group input::placeholder {
  color: #9ca3af;
}

.form-error {
  color: #dc3545;
  font-size: 14px;
  padding: 12px;
  background: #ffe6e6;
  border-radius: 8px;
  text-align: center;
}

.btn-login {
  background: #1a2332;
  color: #ffffff;
  border: none;
  padding: 14px 24px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}

.btn-login:hover:not(:disabled) {
  background: #2c3e50;
}

.btn-login:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
