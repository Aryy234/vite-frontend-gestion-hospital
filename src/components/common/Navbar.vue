<template>
  <nav class="navbar">
    <div class="navbar-brand">
      <router-link to="/home" class="brand-link">
        <span class="brand-icon">🏥</span>
        <span class="brand-text">Hospital</span>
      </router-link>
    </div>

    <div class="navbar-menu" :class="{ 'is-active': menuOpen }">
      <router-link to="/doctores" class="nav-link" @click="closeMenu">Doctores</router-link>
      <router-link to="/pacientes" class="nav-link" @click="closeMenu">Pacientes</router-link>
      <router-link to="/citas" class="nav-link" @click="closeMenu">Citas</router-link>
    </div>

    <div class="navbar-user">
      <div class="user-dropdown" @click="toggleDropdown">
        <span class="user-icon">👤</span>
        <span class="user-name">{{ user }}</span>
        <span class="dropdown-arrow">▼</span>
        
        <div v-if="dropdownOpen" class="dropdown-menu">
          <button @click="handleLogout" class="dropdown-item">Cerrar Sesión</button>
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
.navbar {
  background: #1a2332;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  height: 60px;
  position: sticky;
  top: 0;
  z-index: 100;
}

.navbar-brand .brand-link {
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  color: #ffffff;
}

.brand-icon {
  font-size: 24px;
}

.brand-text {
  font-size: 18px;
  font-weight: 600;
}

.navbar-menu {
  display: flex;
  gap: 8px;
}

.nav-link {
  color: #ffffff;
  text-decoration: none;
  padding: 8px 16px;
  border-radius: 6px;
  transition: background 0.2s;
  font-size: 14px;
}

.nav-link:hover,
.nav-link.router-link-active {
  background: rgba(255, 255, 255, 0.1);
}

.navbar-user {
  position: relative;
}

.user-dropdown {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  padding: 8px 12px;
  border-radius: 6px;
  transition: background 0.2s;
}

.user-dropdown:hover {
  background: rgba(255, 255, 255, 0.1);
}

.user-icon {
  font-size: 16px;
}

.user-name {
  font-size: 14px;
}

.dropdown-arrow {
  font-size: 10px;
  opacity: 0.7;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  right: 0;
  background: #ffffff;
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  min-width: 150px;
  margin-top: 8px;
  overflow: hidden;
}

.dropdown-item {
  width: 100%;
  padding: 12px 16px;
  border: none;
  background: none;
  text-align: left;
  font-size: 14px;
  color: #1a2332;
  cursor: pointer;
  transition: background 0.2s;
}

.dropdown-item:hover {
  background: #e8eef3;
}

.navbar-toggle {
  display: none;
  flex-direction: column;
  gap: 4px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
}

.navbar-toggle span {
  display: block;
  width: 20px;
  height: 2px;
  background: #ffffff;
  transition: all 0.2s;
}

@media (max-width: 768px) {
  .navbar-menu {
    position: absolute;
    top: 60px;
    left: 0;
    right: 0;
    background: #1a2332;
    flex-direction: column;
    padding: 16px;
    display: none;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
  }

  .navbar-menu.is-active {
    display: flex;
  }

  .navbar-toggle {
    display: flex;
  }

  .navbar-user {
    display: none;
  }
}
</style>
