import { createRouter, createWebHistory } from 'vue-router'
import { STORAGE_KEYS } from '@/utils/constanst'

// Vistas
import HomeView from '../views/HomeView.vue'
import DoctorView from '../views/DoctorView.vue'
import PacienteView from '../views/PacienteView.vue'
import CitaView from '../views/CitaView.vue'
import LoginView from '../views/auth/LoginView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: { requiresAuth: false }
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView,
      meta: { requiresAuth: true }
    },
    {
      path: '/doctores',
      name: 'doctores',
      component: DoctorView,
      meta: { requiresAuth: true }
    },
    {
      path: '/pacientes',
      name: 'pacientes',
      component: PacienteView,
      meta: { requiresAuth: true }
    },
    {
      path: '/citas',
      name: 'citas',
      component: CitaView,
      meta: { requiresAuth: true }
    }
  ],
})

// Guard de navegación para rutas protegidas
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem(STORAGE_KEYS.TOKEN)
  const expiresAt = localStorage.getItem(STORAGE_KEYS.EXPIRES_AT)
  
  const isAuthenticated = token && expiresAt && (Date.now() / 1000 < Number(expiresAt))
  
  if (to.meta.requiresAuth && !isAuthenticated) {
    // Redirigir a login si no está autenticado
    next({ name: 'login' })
  } else if (to.name === 'login' && isAuthenticated) {
    // Redirigir a home si ya está autenticado
    next({ name: 'home' })
  } else {
    next()
  }
})

export default router
