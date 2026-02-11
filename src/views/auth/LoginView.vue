<template>
  <div class="login-container">
    <div class="login-card">
      <div class="login-header">
        <div class="logo-icon">
          <svg width="56" height="56" viewBox="0 0 24 24" fill="none">
            <rect x="3" y="3" width="18" height="18" rx="4" stroke="#1a2332" stroke-width="1.5"/>
            <path d="M12 7v10M7 12h10" stroke="#1a2332" stroke-width="1.5"/>
          </svg>
        </div>
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
/* Minimalista, moderno y profesional */
.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #1a2332 0%, #2c3e50 100%);
  padding: 20px;
}
.login-card {
  background: #fff;
  padding: 48px;
  border-radius: 20px;
  box-shadow: 0 10px 40px rgba(0,0,0,0.3);
  width: 100%;
  max-width: 420px;
}
.login-header {
  text-align: center;
  margin-bottom: 40px;
}
.logo-icon {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}
.logo-icon svg { display: block; }
.login-header h1 {
  margin: 0 0 10px 0;
  color: #1a2332;
  font-size: 32px;
  font-weight: 800;
  letter-spacing: -0.5px;
}
.login-header p {
  margin: 0;
  color: #5a6c7d;
  font-size: 16px;
  font-weight: 500;
}
.login-form {
  display: flex;
  flex-direction: column;
  gap: 24px;
}
.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.form-group label {
  color: #1a2332;
  font-size: 15px;
  font-weight: 600;
  letter-spacing: 0.3px;
}
.form-group input {
  padding: 14px 18px;
  border: 2px solid #e8eef3;
  border-radius: 10px;
  font-size: 15px;
  background: #fff;
  transition: all 0.2s;
}
.form-group input:focus {
  outline: none;
  border-color: #1a2332;
  box-shadow: 0 0 0 3px rgba(26,35,50,0.08);
}
.form-group input::placeholder { color: #9ca3af; }
.form-error {
  color: #dc3545;
  font-size: 14px;
  padding: 14px 16px;
  background: #f8d7da;
  border-radius: 10px;
  text-align: center;
  font-weight: 600;
}
.btn-login {
  background: #1a2332;
  color: #fff;
  border: none;
  padding: 16px 28px;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;
  letter-spacing: 0.5px;
  box-shadow: 0 4px 12px rgba(26,35,50,0.2);
}
.btn-login:hover:not(:disabled) {
  background: #2c3e50;
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(26,35,50,0.3);
}
.btn-login:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
