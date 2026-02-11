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
.calendario-citas {
  background: #ffffff;
  border-radius: 8px;
  padding: 16px;
  border: 1px solid #e0e0e0;
}

.calendario-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.calendario-header h3 {
  margin: 0;
  color: #1a2332;
  font-size: 16px;
  text-transform: capitalize;
}

.nav-btn {
  background: #e8eef3;
  border: none;
  width: 32px;
  height: 32px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  color: #1a2332;
  transition: background 0.2s;
}

.nav-btn:hover {
  background: #d1dbe3;
}

.calendario-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
}

.day-header {
  text-align: center;
  font-size: 12px;
  font-weight: 600;
  color: #5a6c7d;
  padding: 8px 0;
}

.day-cell {
  aspect-ratio: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  transition: background 0.2s;
}

.day-cell:hover:not(.other-month) {
  background: #e8eef3;
}

.day-cell.other-month {
  color: #c0c0c0;
  cursor: default;
}

.day-cell.today {
  background: #1a2332;
  color: #ffffff;
}

.day-cell.has-citas:not(.today) {
  background: #e8f5e9;
}

.day-number {
  font-size: 14px;
}

.citas-badge {
  position: absolute;
  bottom: 2px;
  font-size: 10px;
  background: #28a745;
  color: #ffffff;
  padding: 1px 5px;
  border-radius: 10px;
}

.day-cell.today .citas-badge {
  background: #ffffff;
  color: #1a2332;
}
</style>
