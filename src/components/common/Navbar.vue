<template>
  <nav class="navbar">
    <div class="navbar-brand">
      <router-link to="/home" class="brand-link">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <rect x="3" y="3" width="18" height="18" rx="4" stroke="#fff" stroke-width="1.5"/>
          <path d="M12 7v10M7 12h10" stroke="#fff" stroke-width="1.5"/>
        </svg>
        <span class="brand-text">Hospital</span>
      </router-link>
    </div>

    <div class="navbar-menu" :class="{ 'is-active': menuOpen }">
      <router-link to="/doctores" class="nav-link" @click="closeMenu">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.5"/>
          <path d="M12 7a3 3 0 0 1 3 3v1a3 3 0 0 1-6 0v-1a3 3 0 0 1 3-3z" stroke="currentColor" stroke-width="1.5"/>
        </svg>
        Doctores
      </router-link>
      <router-link to="/pacientes" class="nav-link" @click="closeMenu">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.5"/>
          <ellipse cx="12" cy="10" rx="3" ry="3.5" fill="currentColor" opacity="0.3"/>
        </svg>
        Pacientes
      </router-link>
      <router-link to="/citas" class="nav-link" @click="closeMenu">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <rect x="3" y="4" width="18" height="16" rx="4" stroke="currentColor" stroke-width="1.5"/>
          <path d="M8 2v4M16 2v4" stroke="currentColor" stroke-width="1.5"/>
        </svg>
        Citas
      </router-link>
    </div>

    <div class="navbar-user">
      <div class="user-dropdown" @click="toggleDropdown">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="8" r="4" stroke="#fff" stroke-width="1.5"/>
          <path d="M6 21c0-3.5 2.7-6 6-6s6 2.5 6 6" stroke="#fff" stroke-width="1.5"/>
        </svg>
        <span class="user-name">{{ user }}</span>
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" class="dropdown-arrow">
          <path d="M2 4l4 4 4-4" stroke="#fff" stroke-width="1.5"/>
        </svg>
        
        <div v-if="dropdownOpen" class="dropdown-menu">
          <button @click="handleLogout" class="dropdown-item">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" stroke="#dc3545" stroke-width="1.5"/>
            </svg>
            Cerrar Sesión
          </button>
        </div>
      </div>
    </div>

    <button class="navbar-toggle" @click="toggleMenu">
      <span></span>
      <span></span>
      <span></span>
    </button>
  </nav>
</template>

<script setup>
import { ref } from 'vue'
import { useAuth } from '@/composables/useAuth'

const { user, logout } = useAuth()

const menuOpen = ref(false)
const dropdownOpen = ref(false)

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value
}

const closeMenu = () => {
  menuOpen.value = false
}

const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value
}

const handleLogout = () => {
  dropdownOpen.value = false
  logout()
}
</script>

<style scoped>
/* Minimalista, moderno y profesional */
.navbar {
  background: #1a2332;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 32px;
  height: 64px;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}
.navbar-brand .brand-link {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  color: #fff;
}
.brand-link svg { display: block; }
.brand-text {
  font-size: 20px;
  font-weight: 700;
  letter-spacing: 0.5px;
}
.navbar-menu {
  display: flex;
  gap: 6px;
}
.nav-link {
  color: #fff;
  text-decoration: none;
  padding: 10px 18px;
  border-radius: 8px;
  transition: all 0.2s;
  font-size: 15px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 8px;
}
.nav-link svg { display: block; }
.nav-link:hover,
.nav-link.router-link-active {
  background: rgba(255,255,255,0.12);
}
.navbar-user { position: relative; }
.user-dropdown {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  padding: 8px 14px;
  border-radius: 8px;
  transition: background 0.2s;
}
.user-dropdown svg { display: block; }
.user-dropdown:hover { background: rgba(255,255,255,0.12); }
.user-name {
  font-size: 15px;
  font-weight: 500;
}
.dropdown-arrow { opacity: 0.7; }
.dropdown-menu {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.15);
  min-width: 180px;
  overflow: hidden;
}
.dropdown-item {
  width: 100%;
  padding: 12px 18px;
  border: none;
  background: none;
  text-align: left;
  font-size: 15px;
  color: #1a2332;
  cursor: pointer;
  transition: background 0.2s;
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 500;
}
.dropdown-item svg { display: block; }
.dropdown-item:hover { background: #f8d7da; }
.navbar-toggle {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
}
.navbar-toggle span {
  display: block;
  width: 24px;
  height: 2.5px;
  background: #fff;
  border-radius: 2px;
  transition: all 0.2s;
}
@media (max-width: 768px) {
  .navbar { padding: 0 16px; }
  .navbar-menu {
    position: absolute;
    top: 64px;
    left: 0;
    right: 0;
    background: #1a2332;
    flex-direction: column;
    padding: 16px;
    display: none;
    border-top: 1px solid rgba(255,255,255,0.1);
  }
  .navbar-menu.is-active { display: flex; }
  .navbar-toggle { display: flex; }
  .navbar-user { display: none; }
}
</style>
