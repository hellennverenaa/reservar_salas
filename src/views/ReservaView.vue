<template>
  <div class="min-h-screen p-4" style="background-color: #ffffff">
    <div class="max-w-7xl mx-auto">
      <div class="grid grid-cols-1 xl:grid-cols-2 gap-10">
        <div class="space-y-8">
          <div class="shadow-2xl border-2 hover:shadow-3xl transition-all duration-500 rounded-3xl" style="background-color: #ffffff; border-color: rgba(0,0,0,0.1)">
            <div class="pb-6 border-b p-6" style="border-color: rgba(220,38,38,0.2)">
              <div class="flex items-center text-2xl">
                <div class="w-14 h-14 rounded-2xl flex items-center justify-center mr-4 shadow-lg" style="background-color: #000000">
                  <UsersIcon class="w-7 h-7" style="color: #ffffff" />
                </div>
                <span style="color: #000000" class="font-bold">
                  Dados da Reserva
                </span>
              </div>
            </div>
            <div class="pt-6 p-8">
              <form @submit.prevent="handleSubmit" class="space-y-8">
                <div class="space-y-3">
                  <label class="text-base font-bold flex items-center" style="color: #000000">
                    <div class="w-2 h-2 rounded-full mr-2" style="background-color: #dc2626"></div>
                    Responsável *
                  </label>
                  <div class="flex gap-4">
                    
                    <input
                      v-model="formData.responsibleName"
                      placeholder="Digite seu nome"
                      class="flex-1 text-black px-5 py-2 border-5 rounded-2xl focus:outline-none transition-all duration-300 text-base"
                      
                    />
                  
                   
                    <button 
                      type="button" 
                      @click="handleBadgeRead"
                      class="px-6 py-4 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                      style="background-color: #10b981; color: #ffffff"
                      
                    >
                      Bipar
                    </button>
                  </div>
                </div>

                <div class="space-y-3">
                  <label class="text-base font-bold" style="color: #000000">
                    Qual será o tipo de evento/atividade? (Reunião, treinamento, apresentação, entrevista, etc.)
                  </label>
                  <textarea
                    v-model="formData.eventType"
                    placeholder="Descreva o tipo de evento ou atividade"
                    rows="1"
                    class="w-full text-black px-4 py-4 border-9 rounded-2xl focus:outline-none transition-all duration-300 resize-none text-base"
                    style="background-color: #ffffff; border-color: #e5e7eb"

                  ></textarea>
                </div>

                <div class="space-y-3">
                  <label class="text-base font-bold flex items-center" style="color: #000000">
                    <div class="w-2 h-2 rounded-full mr-2" style="background-color: #dc2626"></div>
                    Data *
                  </label>
                  <input
                    v-model="formData.date"
                    type="date"
                    :min="new Date().toISOString().split('T')[0]"
                    class="text-black w-full px-5 py-4 border-2 rounded-2xl focus:outline-none transition-all duration-300 text-base"
                    style="background-color: #ffffff; border-color: #e5e7eb"
                    
                  />
                </div>

                <div class="grid grid-cols-2 gap-6">
                  <div class="space-y-3">
                    <label class="text-base font-bold flex items-center" style="color: #000000">
                      <div class="w-2 h-2 rounded-full mr-2" style="background-color: #000000"></div>
                      Hora de Início *
                    </label>
                    <select 
                      v-model="formData.startTime"
                      class="w-full text-black px-5 py-4 border-2 rounded-2xl focus:outline-none transition-all duration-300 text-base" 
                      style="background-color: #ffffff; border-color: #e5e7eb"
                    >
                      <option value="">Selecione</option>
                      <option v-for="time in timeSlots" :key="time" :value="time">{{ time }}</option>
                    </select>
                  </div>

                  <div class="space-y-3">
                    <label class="text-base font-bold flex items-center" style="color: #000000">
                      <div class="w-2 h-2 rounded-full mr-2" style="background-color: #dc2626"></div>
                      Hora Final *
                    </label>
                    <select 
                      v-model="formData.endTime"
                      class="w-full text-black px-5 py-4 border-2 rounded-2xl focus:outline-none transition-all duration-300 text-base" 
                      style="background-color: #ffffff; border-color: #e5e7eb"
                    >
                      <option value="">Selecione</option>
                      <option v-for="time in timeSlots" :key="time" :value="time">{{ time }}</option>
                    </select>
                  </div>
                </div>

                <div class="space-y-3">
                  <label class="text-base font-bold" style="color: #000000">
                    Quem serão os participantes?
                  </label>
                  <select 
                    v-model="formData.participants"
                    class="w-full text-black px-5 py-4 border-2 rounded-2xl focus:outline-none transition-all duration-300 text-base" 
                    style="background-color: #ffffff; border-color: #e5e7eb"
                  >
                    <option value="">Selecione o tipo de participantes</option>
                    <option v-for="participant in participantsList" :key="participant" :value="participant">
                      {{ participant }}
                    </option>
                  </select>
                </div>

                <div class="space-y-3">
                  <label class="text-base font-bold" style="color: #000000">
                    Número de Participantes
                  </label>
                  <input
                    v-model="formData.participantCount"
                    type="number"
                    placeholder="Digite o número de participantes"
                    min="1"
                    max="100"
                    class="w-full text-black px-5 py-4 border-2 rounded-2xl focus:outline-none transition-all duration-300 text-base"
                    style="background-color: #ffffff; border-color: #e5e7eb"
                    
                  />
                </div>

                <div class="space-y-3">
                  <label class="text-base font-bold flex items-center" style="color: #000000">
                    <div class="w-2 h-2 rounded-full mr-2" style="background-color: #000000"></div>
                    Sala *
                  </label>
                  <select 
                    v-model="formData.room"
                    class="w-full text-black px-5 py-4 border-2 rounded-2xl focus:outline-none transition-all duration-300 text-base" 
                    style="background-color: #ffffff; border-color: #e5e7eb"
                  >
                    <option value="">Selecione uma sala</option>
                    <option v-for="room in rooms" :key="room" :value="room">
                      🏛️ {{ room }}
                    </option>
                  </select>
                </div>

                <button 
                  type="submit" 
                  class="group relative w-full py-6 text-xl rounded-3xl transition-all duration-500 hover:scale-105 shadow-2xl hover:shadow-3xl overflow-hidden font-bold"
                  style="background-color: #000000; color: #ffffff"
                 @mouseleave="$event.target.style.backgroundColor = '#000000'">
                  <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>                  
                  <div class="relative flex items-center justify-center">
                    <ClockIcon class="w-6 h-6 mr-4 group-hover:rotate-12 transition-transform duration-300"/>
                    Confirmar Reserva
                  </div>
                </button>
              </form>
            </div>
          </div>
        </div>
        <div>
          <AvailabilityCalendar
            :selected-room="formData.room"
            :selected-date="formData.date"
            :start-time="formData.startTime"
            :end-time="formData.endTime"
            :bookings="bookings"
            @date-select="handleDateSelect"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Users as UsersIcon, Clock as ClockIcon } from 'lucide-vue-next'
import CalendarView  from "./CalendarView.vue";

interface BookingEvent {
  id: string
  title: string
  start: string
  end: string
  date: string
  room: string
  color: string
  responsibleName: string
  eventType: string
  participants: string
  participantCount: string
  needsCoffee: boolean
  notes: string
}

interface Props {
  bookings: BookingEvent[]
}

const props = defineProps<Props>()

const emit = defineEmits<{
  back: []
  'add-booking': [booking: Omit<BookingEvent, 'id' | 'color'>]
}>()

const formData = ref({
  responsibleName: "",
  room: "",
  eventType: "",
  date: "",
  startTime: "",
  endTime: "",
  participants: "",
  participantCount: "",
  needsCoffee: false,
  notes: ""
})

const rooms = [
  'Sala Paixão',
  'Respeito',
  'Auditório F1',
  'Auditório F2',
  'Auditório F3',
  'Hoshin',
  'Sala ADM',
  'Sala RH',
  'Sala Manutenção',
  'Sala NIKE',
  'Sala do BIP'
]

const participantsList = [
  'Colaboradores específicos',
  'Auxiliares',
  'Coordenadores',
  'Gerentes',
  'Áreas de Apoio',
  'Colaboradores',
  'Aprendizes',
  'Líderes e Coordenadores',
  'Mecânicos',
  'Processos Seletivos',
  'Visitas',
  'Workshops'
]

const timeSlots = [
  "08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30",
  "16:00", "16:30", "17:00", "17:30", "18:00"
]

// Verificar conflitos de horário
const hasTimeConflict = (date: string, startTime: string, endTime: string, room: string) => {
  return props.bookings.some(booking => {
    if (booking.date !== date || booking.room !== room) {
      return false
    }
    
    // Verificar sobreposição de horários
    return (
      (startTime >= booking.start && startTime < booking.end) ||
      (endTime > booking.start && endTime <= booking.end) ||
      (startTime <= booking.start && endTime >= booking.end)
    )
  })
}

const handleSubmit = () => {
  // Validação básica
  if (!formData.value.responsibleName || !formData.value.room || !formData.value.date || 
      !formData.value.startTime || !formData.value.endTime) {
    alert("Por favor, preencha todos os campos obrigatórios")
    return
  }

  if (formData.value.startTime >= formData.value.endTime) {
    alert("O horário de término deve ser posterior ao horário de início")
    return
  }

  // Verificar conflitos
  if (hasTimeConflict(formData.value.date, formData.value.startTime, formData.value.endTime, formData.value.room)) {
    alert("Este horário já está ocupado para esta sala. Escolha outro horário.")
    return
  }

  // Criar título baseado no tipo de evento ou responsável
  const title = formData.value.eventType ? formData.value.eventType : `Reunião - ${formData.value.responsibleName}`
  
  // Adicionar a nova reserva
  emit('add-booking', {
    title,
    start: formData.value.startTime,
    end: formData.value.endTime,
    date: formData.value.date,
    room: formData.value.room,
    responsibleName: formData.value.responsibleName,
    eventType: formData.value.eventType,
    participants: formData.value.participants,
    participantCount: formData.value.participantCount,
    needsCoffee: formData.value.needsCoffee,
    notes: formData.value.notes
  })

  alert("✅ Reserva realizada com sucesso!")
  
  // Resetar formulário
  formData.value = {
    responsibleName: "",
    room: "",
    eventType: "",
    date: "",
    startTime: "",
    endTime: "",
    participants: "",
    participantCount: "",
    needsCoffee: false,
    notes: ""
  }
}

const handleBadgeRead = () => {
  // Simulação de leitura de crachá
  const mockNames = ["João Silva", "Maria Santos", "Pedro Costa", "Ana Oliveira"]
  const randomName = mockNames[Math.floor(Math.random() * mockNames.length)]
  formData.value.responsibleName = randomName
  alert(`🎫 Crachá lido: ${randomName}`)
}

const handleDateSelect = (date: string) => {
  formData.value.date = date
}
</script>