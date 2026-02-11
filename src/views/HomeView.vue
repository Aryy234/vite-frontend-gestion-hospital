<template>
  <div class="home-view">
    <Navbar />
    
    <main class="main-content">
      <div class="container">
        <header class="page-header">
          <h1>Bienvenido al Sistema</h1>
          <p>Gestión de citas hospitalarias</p>
        </header>

        <div class="dashboard-cards">
          <router-link to="/doctores" class="dashboard-card">
            <span class="card-icon">👨‍⚕️</span>
            <h3>Doctores</h3>
            <p>Gestionar doctores</p>
          </router-link>

          <router-link to="/pacientes" class="dashboard-card">
            <span class="card-icon">🧑</span>
            <h3>Pacientes</h3>
            <p>Gestionar pacientes</p>
          </router-link>

          <router-link to="/citas" class="dashboard-card">
            <span class="card-icon">📅</span>
            <h3>Citas</h3>
            <p>Agendar y ver citas</p>
          </router-link>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import Navbar from '@/components/common/Navbar.vue'
</script>

<style scoped>
.home-view {
  min-height: 100vh;
  background: #ffffff;
}

.main-content {
  padding: 40px 24px;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.page-header {
  text-align: center;
  margin-bottom: 48px;
}

.page-header h1 {
  margin: 0 0 8px 0;
  color: #1a2332;
  font-size: 32px;
  font-weight: 700;
}

.page-header p {
  margin: 0;
  color: #5a6c7d;
  font-size: 16px;
}

.dashboard-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
}

.dashboard-card {
  background: #e8eef3;
  padding: 32px;
  border-radius: 12px;
  text-decoration: none;
  text-align: center;
  transition: all 0.2s;
  border: 2px solid transparent;
}

.dashboard-card:hover {
  border-color: #1a2332;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transform: translateY(-2px);
}

.card-icon {
  font-size: 48px;
  display: block;
  margin-bottom: 16px;
}

.dashboard-card h3 {
  margin: 0 0 8px 0;
  color: #1a2332;
  font-size: 20px;
  font-weight: 600;
}

.dashboard-card p {
  margin: 0;
  color: #5a6c7d;
  font-size: 14px;
}
</style>
