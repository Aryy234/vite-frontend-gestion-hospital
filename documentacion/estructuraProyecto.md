Perfecto, voy a analizar tu estructura actual y proponer una arquitectura completa y bien organizada para tu proyecto Vue con router.

Basándome en tu estructura actual, aquí te propongo la **estructura de archivos y carpetas** completa:

## 📁 Estructura del Proyecto

```
src/
├── assets/
│   ├── images/
│   │   └── logo.png
│   └── styles/
│       ├── main.css
│       └── variables.css
│
├── clients/
│   ├── authorizationClient.js
│   └── gestionHospitalClient.js
│
├── components/
│   ├── common/
│   │   ├── Navbar.vue
│   │   ├── Sidebar.vue
│   │   ├── Modal.vue
│   │   ├── LoadingSpinner.vue
│   │   └── ConfirmDialog.vue
│   │
│   ├── doctor/
│   │   ├── DoctorForm.vue
│   │   ├── DoctorList.vue
│   │   └── DoctorCard.vue
│   │
│   ├── paciente/
│   │   ├── PacienteForm.vue
│   │   ├── PacienteList.vue
│   │   └── PacienteCard.vue
│   │
│   └── cita/
│       ├── CitaForm.vue
│       ├── CitaList.vue
│       ├── CitaCard.vue
│       └── CalendarioCitas.vue
│
├── composables/
│   ├── useAuth.js
│   ├── useDoctor.js
│   ├── usePaciente.js
│   └── useCita.js
│
├── router/
│   ├── index.js
│   
│
│
├── utils/
│   └── constants.js
│
├── views/
│   ├── auth/
│   │   └── LoginView.vue
│   │
│   ├── HomeView.vue
│   ├── DoctorView.vue
│   ├── PacienteView.vue
│   └── CitaView.vue
│
├── App.vue
└── main.js
```

## 🗂️ Descripción de la Estructura

### **clients/** - Clientes API
- `authorizationClient.js` - Configuración y llamadas a la API de autenticación
- `gestionHospitalClient.js` - Configuración y llamadas a la API de gestión hospitalaria

### **components/** - Componentes reutilizables
- **common/** - Componentes compartidos (Navbar, Modal, Spinner, etc.)
- **doctor/** - Componentes específicos para el módulo de doctores
- **paciente/** - Componentes específicos para el módulo de pacientes
- **cita/** - Componentes específicos para agendamiento de citas

### **composables/** - Lógica reutilizable
- `useAuth.js` - Manejo de autenticación (login, logout, verificación)
- `useDoctor.js` - Lógica CRUD de doctores
- `usePaciente.js` - Lógica CRUD de pacientes
- `useCita.js` - Lógica de agendamiento de citas

### **router/** - Configuración de rutas
- `index.js` - Definición de todas las rutas

### **views/** - Vistas principales
- **auth/LoginView.vue** - Página de inicio de sesión
- **HomeView.vue** - Página principal/dashboard
- **DoctorView.vue** - Vista CRUD de doctores
- **PacienteView.vue** - Vista CRUD de pacientes
- **CitaView.vue** - Vista de agendamiento de citas

## 🎯 Flujo de Navegación

1. **Ruta inicial** → `/login` (si no está autenticado)
2. **Después de login** → `/home` (Dashboard con barra de navegación)
3. **Rutas protegidas:**
   - `/doctores` - CRUD Doctores
   - `/pacientes` - CRUD Pacientes
   - `/citas` - Agendamiento de citas

Esta estructura mantiene una arquitectura limpia, escalable y fácil de mantener, separando responsabilidades y manteniendo la simplicidad que buscas.