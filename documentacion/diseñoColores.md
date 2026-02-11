**planificación del diseño minimalista y moderno**

## 🎨 Paleta de Colores

```
Azul Oscuro:    #1a2332  (Primario - Headers, botones principales)
Plomo Claro:    #e8eef3  (Secundario - Fondos, tarjetas)
Blanco:         #ffffff  (Fondo principal, textos en oscuro)
Azul Acento:    #2c3e50  (Variante para hover/estados)
Gris Texto:     #5a6c7d  (Texto secundario)
```

## 📐 Diseño por Vista

### **1. LoginView.vue**
```
┌─────────────────────────────────────┐
│                                     │
│         [LOGO HOSPITAL]             │
│                                     │
│    ┌─────────────────────┐         │
│    │                     │         │
│    │   [Email]           │         │  ← Fondo: Blanco
│    │   [Password]        │         │  ← Card: Plomo Claro
│    │                     │         │  ← Botón: Azul Oscuro
│    │   [Iniciar Sesión]  │         │
│    │                     │         │
│    └─────────────────────┘         │
│                                     │
└─────────────────────────────────────┘
```
**Características:**
- Centrado vertical y horizontal
- Card con sombra suave sobre fondo blanco
- Inputs con borde gris claro, focus azul oscuro
- Botón azul oscuro con texto blanco

***

### **2. HomeView.vue (Dashboard)**
```
┌─────────────────────────────────────────────┐
│  [NAVBAR - Azul Oscuro]                     │ ← Navbar fijo arriba
├─────────────────────────────────────────────┤
│                                             │
│    Bienvenido al Sistema                    │
│                                             │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐    │
│  │ 👨‍⚕️      │  │ 🧑‍🤝‍🧑    │  │ 📅      │    │
│  │Doctores │  │Pacientes│  │  Citas  │    │ ← Cards: Plomo Claro
│  │         │  │         │  │         │    │ ← Hover: Borde Azul
│  └─────────┘  └─────────┘  └─────────┘    │
│                                             │
│  [Estadísticas Rápidas - opcional]          │
│                                             │
└─────────────────────────────────────────────┘
```
**Características:**
- Fondo: Blanco
- Cards de acceso rápido con íconos
- Hover: Efecto de elevación y borde azul

***

### **3. Navbar.vue (Componente)**
```
┌──────────────────────────────────────────────────┐
│ [🏥 Hospital]  Doctores | Pacientes | Citas  [👤▼]│ ← Azul Oscuro
└──────────────────────────────────────────────────┘
```
**Características:**
- Fondo: Azul Oscuro (#1a2332)
- Texto: Blanco
- Links con hover: Subrayado o fondo más claro
- Dropdown usuario (derecha): Perfil, Cerrar Sesión

***

### **4. DoctorView.vue / PacienteView.vue (CRUD)**
```
┌─────────────────────────────────────────────┐
│  [NAVBAR]                                   │
├─────────────────────────────────────────────┤
│                                             │
│  Gestión de Doctores        [+ Nuevo Doctor]│ ← Botón: Azul Oscuro
│                                             │
│  [Buscador: ___________________ ] [🔍]      │
│                                             │
│  ┌───────────────────────────────────────┐ │
│  │ Nombre    Especialidad    Acciones    │ │ ← Header: Plomo Claro
│  ├───────────────────────────────────────┤ │
│  │ Dr. Juan  Cardiología    [✏️] [🗑️]    │ │
│  │ Dra. Ana  Pediatría      [✏️] [🗑️]    │ │ ← Filas alternas
│  │ Dr. Luis  Neurología     [✏️] [🗑️]    │ │   (blanco/plomo claro)
│  └───────────────────────────────────────┘ │
│                                             │
└─────────────────────────────────────────────┘
```
**Características:**
- Tabla limpia con bordes sutiles
- Filas alternas: Blanco / Plomo Claro
- Botones de acción: Íconos minimalistas
- Hover en filas: Fondo plomo claro

***

### **5. Modal/Form (DoctorForm, PacienteForm, CitaForm)**
```
        ┌─────────────────────────┐
        │  Agregar Doctor    [×]  │ ← Header: Azul Oscuro
        ├─────────────────────────┤
        │                         │
        │  Nombre:                │
        │  [________________]     │
        │                         │
        │  Especialidad:          │
        │  [________________]     │
        │                         │
        │  Teléfono:              │
        │  [________________]     │
        │                         │
        │     [Cancelar] [Guardar]│ ← Cancelar: Plomo
        │                         │   Guardar: Azul Oscuro
        └─────────────────────────┘
```
**Características:**
- Modal centrado con overlay semi-transparente
- Fondo modal: Blanco
- Header: Azul Oscuro con texto blanco
- Inputs: Borde gris claro, espaciado generoso

***

### **6. CitaView.vue (Agendamiento)**
```
┌─────────────────────────────────────────────┐
│  [NAVBAR]                                   │
├─────────────────────────────────────────────┤
│                                             │
│  Agendamiento de Citas      [+ Nueva Cita] │
│                                             │
│  ┌──────────┐  ┌──────────────────────────┐│
│  │ Filtros  │  │  Lista de Citas          ││
│  │          │  │                          ││
│  │ Doctor:  │  │ ┌────────────────────┐  ││
│  │ [▼]      │  │ │ 10:00 AM           │  ││
│  │          │  │ │ Dr. Juan - Paciente│  ││ ← Cards: Plomo Claro
│  │ Fecha:   │  │ └────────────────────┘  ││
│  │ [📅]     │  │                          ││
│  │          │  │ ┌────────────────────┐  ││
│  └──────────┘  │ │ 2:00 PM            │  ││
│                │ │ Dra. Ana - Paciente│  ││
│                │ └────────────────────┘  ││
│                └──────────────────────────┘│
└─────────────────────────────────────────────┘
```

***

## 🎯 Principios de Diseño

### **Espaciado**
- Padding contenedores: 24px
- Margen entre elementos: 16px
- Espaciado interno cards: 20px

### **Tipografía**
- Fuente: Inter, Roboto, o system fonts
- Títulos: 24px - 28px (bold)
- Subtítulos: 18px - 20px (medium)
- Texto normal: 14px - 16px (regular)

### **Bordes y Sombras**
- Border radius: 8px (cards, botones)
- Sombras sutiles: `0 2px 8px rgba(0,0,0,0.08)`
- Bordes: 1px solid #e0e0e0

### **Interactividad**
- Hover botones: Oscurecer 10%
- Hover cards: Elevar con sombra
- Transiciones: 200ms ease
- Focus inputs: Borde azul oscuro

***

## 📱 Responsive

- **Desktop:** Contenido centrado, max-width: 1200px
- **Tablet:** Cards en 2 columnas
- **Mobile:** Navbar colapsable (hamburguesa), cards apilados

Esta planificación mantiene un diseño limpio, profesional y fácil de implementar.