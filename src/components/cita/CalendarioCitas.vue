<template>
  <div class="calendario-citas">
    <div class="calendario-header">
      <button class="nav-btn" @click="prevMonth">&lt;</button>
      <h3>{{ mesAnio }}</h3>
      <button class="nav-btn" @click="nextMonth">&gt;</button>
    </div>

    <div class="calendario-grid">
      <div class="day-header" v-for="dia in diasSemana" :key="dia">{{ dia }}</div>
      <div 
        v-for="(day, index) in diasMes" 
        :key="index"
        class="day-cell"
        :class="{ 
          'other-month': day.otherMonth,
          'today': day.isToday,
          'has-citas': day.citasCount > 0
        }"
        @click="selectDay(day)"
      >
        <span class="day-number">{{ day.date }}</span>
        <span v-if="day.citasCount > 0" class="citas-badge">{{ day.citasCount }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  citas: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['selectDate'])

const currentDate = ref(new Date())
const diasSemana = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb']

const mesAnio = computed(() => {
  return currentDate.value.toLocaleDateString('es-ES', { 
    month: 'long', 
    year: 'numeric' 
  })
})

const diasMes = computed(() => {
  const year = currentDate.value.getFullYear()
  const month = currentDate.value.getMonth()
  
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  
  const days = []
  const today = new Date()
  
  // Días del mes anterior
  const startingDay = firstDay.getDay()
  const prevMonthLastDay = new Date(year, month, 0).getDate()
  for (let i = startingDay - 1; i >= 0; i--) {
    days.push({
      date: prevMonthLastDay - i,
      otherMonth: true,
      isToday: false,
      citasCount: 0
    })
  }
  
  // Días del mes actual
  for (let i = 1; i <= lastDay.getDate(); i++) {
    const date = new Date(year, month, i)
    const citasEnDia = props.citas.filter(cita => {
      const citaDate = new Date(cita.fecha_hora)
      return citaDate.getDate() === i && 
             citaDate.getMonth() === month && 
             citaDate.getFullYear() === year
    })
    
    days.push({
      date: i,
      fullDate: date,
      otherMonth: false,
      isToday: date.toDateString() === today.toDateString(),
      citasCount: citasEnDia.length
    })
  }
  
  // Días del siguiente mes
  const remainingDays = 42 - days.length
  for (let i = 1; i <= remainingDays; i++) {
    days.push({
      date: i,
      otherMonth: true,
      isToday: false,
      citasCount: 0
    })
  }
  
  return days
})

const prevMonth = () => {
  currentDate.value = new Date(
    currentDate.value.getFullYear(),
    currentDate.value.getMonth() - 1,
    1
  )
}

const nextMonth = () => {
  currentDate.value = new Date(
    currentDate.value.getFullYear(),
    currentDate.value.getMonth() + 1,
    1
  )
}

const selectDay = (day) => {
  if (!day.otherMonth && day.fullDate) {
    emit('selectDate', day.fullDate)
  }
}
</script>

<style scoped>
/* Minimalista, moderno y profesional */
.calendario-citas {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(26,35,50,0.08);
  padding: 20px;
}
.calendario-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
.calendario-header h3 {
  margin: 0;
  color: #1a2332;
  font-size: 18px;
  font-weight: 700;
  text-transform: capitalize;
  letter-spacing: 0.5px;
}
.nav-btn {
  background: #e8eef3;
  border: none;
  width: 36px;
  height: 36px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 700;
  color: #1a2332;
  transition: all 0.2s;
}
.nav-btn:hover {
  background: #1a2332;
  color: #fff;
}
.calendario-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 6px;
}
.day-header {
  text-align: center;
  font-size: 13px;
  font-weight: 700;
  color: #5a6c7d;
  padding: 10px 0;
  letter-spacing: 0.5px;
}
.day-cell {
  aspect-ratio: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  cursor: pointer;
  position: relative;
  transition: all 0.2s;
  font-weight: 600;
}
.day-cell:hover:not(.other-month) {
  background: #e8eef3;
  transform: scale(1.05);
}
.day-cell.other-month {
  color: #c0c0c0;
  cursor: default;
}
.day-cell.today {
  background: #1a2332;
  color: #fff;
  box-shadow: 0 2px 8px rgba(26,35,50,0.3);
}
.day-cell.has-citas:not(.today) {
  background: #d4edda;
  color: #28a745;
}
.day-number { font-size: 15px; }
.citas-badge {
  position: absolute;
  bottom: 4px;
  font-size: 10px;
  background: #28a745;
  color: #fff;
  padding: 2px 6px;
  border-radius: 10px;
  font-weight: 700;
}
.day-cell.today .citas-badge {
  background: #fff;
  color: #1a2332;
}
</style>
