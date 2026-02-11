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
            <div class="card-icon">
              <svg width="56" height="56" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="#1a2332" stroke-width="1.5"/>
                <path d="M12 7a3 3 0 0 1 3 3v1a3 3 0 0 1-6 0v-1a3 3 0 0 1 3-3z" stroke="#1a2332" stroke-width="1.5"/>
                <rect x="9" y="15" width="6" height="2" rx="1" fill="#e8eef3"/>
              </svg>
            </div>
            <h3>Doctores</h3>
            <p>Gestionar doctores</p>
          </router-link>

          <router-link to="/pacientes" class="dashboard-card">
            <div class="card-icon">
              <svg width="56" height="56" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="#1a2332" stroke-width="1.5"/>
                <ellipse cx="12" cy="10" rx="3" ry="3.5" fill="#e8eef3"/>
                <rect x="9" y="15" width="6" height="2" rx="1" fill="#e8eef3"/>
              </svg>
            </div>
            <h3>Pacientes</h3>
            <p>Gestionar pacientes</p>
          </router-link>

          <router-link to="/citas" class="dashboard-card">
            <div class="card-icon">
              <svg width="56" height="56" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="4" width="18" height="16" rx="4" stroke="#1a2332" stroke-width="1.5"/>
                <path d="M8 2v4M16 2v4" stroke="#1a2332" stroke-width="1.5"/>
                <rect x="7" y="10" width="2" height="2" rx="1" fill="#1a2332"/>
                <rect x="11" y="10" width="2" height="2" rx="1" fill="#1a2332"/>
                <rect x="15" y="10" width="2" height="2" rx="1" fill="#1a2332"/>
              </svg>
            </div>
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
/* Minimalista, moderno y profesional */
.home-view {
  min-height: 100vh;
  background: #f8f9fa;
}
.main-content { padding: 48px 24px; }
.container {
  max-width: 1200px;
  margin: 0 auto;
}
.page-header {
  text-align: center;
  margin-bottom: 56px;
}
.page-header h1 {
  margin: 0 0 12px 0;
  color: #1a2332;
  font-size: 36px;
  font-weight: 800;
  letter-spacing: -0.5px;
}
.page-header p {
  margin: 0;
  color: #5a6c7d;
  font-size: 18px;
  font-weight: 500;
}
.dashboard-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 28px;
}
.dashboard-card {
  background: #fff;
  padding: 40px;
  border-radius: 16px;
  text-decoration: none;
  text-align: center;
  transition: all 0.3s;
  border: 2px solid transparent;
  box-shadow: 0 2px 12px rgba(26,35,50,0.08);
}
.dashboard-card:hover {
  border-color: #1a2332;
  box-shadow: 0 8px 24px rgba(26,35,50,0.15);
  transform: translateY(-4px);
}
.card-icon {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}
.card-icon svg { display: block; }
.dashboard-card h3 {
  margin: 0 0 10px 0;
  color: #1a2332;
  font-size: 22px;
  font-weight: 700;
  letter-spacing: 0.5px;
}
.dashboard-card p {
  margin: 0;
  color: #5a6c7d;
  font-size: 15px;
  font-weight: 500;
}
</style>
