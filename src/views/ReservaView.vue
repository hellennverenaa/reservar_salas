<template>
  <div class="min-h-screen relative overflow-hidden bg-gray-50">
    <!-- Background decorativo -->
    <div class="absolute top-0 right-0 w-96 h-96 bg-red-500/10 rounded-full blur-3xl animate-pulse" />
    <div class="absolute bottom-0 left-0 w-80 h-80 bg-black/5 rounded-full blur-3xl animate-pulse" style="animation-delay: 1s" />
    <div class="absolute top-1/2 left-1/2 w-64 h-64 bg-yellow-400/10 rounded-full blur-3xl animate-pulse" style="animation-delay: 2s" />
    
    <div class="relative z-10 max-w-5xl mx-auto p-6">
      <!-- Header Moderno -->
      <div class="mb-12">
        <div class="flex items-center justify-between">
          <!-- Botão Voltar Elegante -->
          <button 
            @click="$emit('voltar-home')"
            class="group flex items-center px-6 py-3 bg-white hover:bg-gray-100 text-gray-700 hover:text-red-600 border-2 border-gray-200 hover:border-red-300 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 font-medium"
          >
            <ArrowLeftIcon class="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
            <span>Voltar ao Início</span>
          </button>



          <!-- Status Badge -->
          <div class="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full text-sm font-semibold border-2 border-yellow-200">
            ✨ Nova Reserva
          </div>
        </div>



        <!-- Título Principal -->
        <div class="text-center mt-8 mb-6">
          <div class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-red-500 to-red-700 rounded-full shadow-2xl mb-6">
            <CalendarIcon class="w-10 h-10 text-white" />
          </div>
          <h1 class="text-5xl font-black text-gray-900 mb-4">
            Nova <span class="text-red-600">Reserva</span>
          </h1>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Preencha os dados abaixo para agendar sua sala com segurança e praticidade
          </p>
        </div>
      </div>

      <!-- Formulário Principal -->
      <form @submit.prevent="handleSubmit" class="bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden">
        
        
        <!-- Header do Formulário -->
        <div class="bg-gradient-to-r from-red-600 via-red-700 to-red-800 text-white px-8 py-6 relative overflow-hidden">
          <div class="absolute inset-0 bg-black/10"></div>
          <div class="relative z-10">
            <h2 class="text-2xl font-bold flex items-center">
              <div class="bg-white/20 p-3 rounded-full mr-4">
                <PlusIcon class="w-6 h-6" />
              </div>
              Informações da Reserva
            </h2>
            <p class="text-red-100 mt-2">Todos os campos marcados com * são obrigatórios</p>
          </div>



          <!-- Elementos decorativos -->
          <div class="absolute top-2 right-4 w-16 h-16 bg-white/5 rounded-full"></div>
          <div class="absolute bottom-2 right-12 w-8 h-8 bg-white/10 rounded-full"></div>
        </div>

        <div class="p-8 space-y-10">



          <!-- Seção 1: Informações Pessoais -->
          <div class="space-y-6">
            <div class="flex items-center mb-6">
              <div class="bg-red-100 p-3 rounded-full mr-4">
                <UserIcon class="w-5 h-5 text-red-600" />
              </div>
              <h3 class="text-xl font-bold text-gray-900">👤 Informações Pessoais</h3>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">



              <!-- Nome do Responsável -->
              <div class="space-y-2">
                <label class="block text-sm font-bold text-gray-800 mb-2">
                  Nome do Responsável *
                </label>
                <div class="relative">
                  <input 
                    v-model="formData.responsibleName"
                    type="text"
                    required
                    placeholder="Digite seu nome completo"
                    class="w-full px-6 py-4 border-2 border-solid border-gray-500 rounded-2xl focus:border-red-600 focus:outline-none transition-all duration-300 text-gray-800 font-medium pl-12">
                  <UserIcon class="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
              </div>



              <!-- Título da Reserva -->
              <div class="space-y-2">
                <label class="block text-sm font-bold text-gray-800 mb-2">
                  Título da Reserva *
                </label>
                <div class="relative">
                  <input 
                    v-model="formData.title"
                    type="text"
                    required
                    placeholder="Ex: Reunião da Equipe de Marketing"
                    class="w-full px-6 py-4 border-2 border-solid border-gray-500 rounded-2xl focus:border-red-500 focus:outline-none transition-all duration-300 text-gray-800 font-medium pl-12"
                  />
                  <FileTextIcon class="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
              </div>
            </div>
          </div>


          <!-- Seção 2: Local e Data -->
          <div class="space-y-6">
            <div class="flex items-center mb-6">
              <div class="bg-black/10 p-3 rounded-full mr-4">
                <MapPinIcon class="w-5 h-5 text-black" />
              </div>
              <h3 class="text-xl border-solid text-gray-900">🏛️ Local e Data</h3>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">



              <!-- Sala -->
              <div class="space-y-2">
    <label class="block text-sm font-bold text-gray-800 mb-2">
      Selecionar Sala *
    </label>
    <div class="relative">
      <Menu as="div" class="relative w-full">
        <MenuButton 
          class="w-full px-6 py-4 border-2 border-solid border-gray-500 rounded-2xl focus:border-red-500 focus:outline-none transition-all duration-300 text-gray-800 font-medium pl-12 bg-white text-left inline-flex items-center justify-between"
          :class="{ 'text-gray-400': !formData.room }"
        >
          <span>{{ formData.room || 'Selecione uma sala disponível' }}</span>
          <ChevronDownIcon class="w-5 h-5 text-gray-400" />
        </MenuButton>
        
        <BuildingIcon class="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
        
        <transition 
          enter-active-class="transition ease-out duration-100" 
          enter-from-class="transform opacity-0 scale-95" 
          enter-to-class="transform opacity-100 scale-100" 
          leave-active-class="transition ease-in duration-75" 
          leave-from-class="transform opacity-100 scale-100" 
          leave-to-class="transform opacity-0 scale-95"
        >
          <MenuItems class="absolute z-10 mt-1 w-full origin-top rounded-2xl bg-white border-2 border-gray-200 shadow-lg max-h-60 overflow-auto">
            <div class="py-1">
              <!-- Opção para limpar seleção -->
              <Menu v-slot="{ active }">
                <button
                  @click="formData.room = ''"
                  :class="[
                    active ? 'bg-red-50 text-red-600' : 'text-gray-500',
                    'block w-full px-6 py-3 text-left text-sm font-medium transition-colors duration-150'
                  ]"
                >
                  Limpar seleção
                </button>
              </Menu>
              
              <!-- Divisor -->
              <div class="border-t border-gray-100 my-1"></div>
              
              <!-- Opções das salas -->
              <Menu v-for="room in rooms" :key="room" v-slot="{ active }">
                <button
                  @click="formData.room = room"
                  :class="[
                    active ? 'bg-red-50 text-red-600' : 'text-gray-800',
                    formData.room === room ? 'bg-red-100 text-red-700 font-semibold' : '',
                    'block w-full px-6 py-3 text-left text-sm font-medium transition-colors duration-150 relative'
                  ]"
                >
                  {{ room }}
                  <!-- Ícone de check para item selecionado -->
                  <CheckIcon 
                    v-if="formData.room === room"
                    class="absolute right-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-red-600"
                  />
                </button>
              </Menu>
            </div>
          </MenuItems>
        </transition>
      </Menu>
    </div>
  </div>


              
              <!-- Data -->
              <div class="space-y-2">
                <label class="block text-sm font-bold text-gray-800 mb-2">
                  Data da Reserva *
                </label>
                <div class="relative">
                  <input 
                    v-model="formData.date"
                    type="date"
                    required
                    :min="minDate"
                    class="w-full px-6 py-4 border-2 border-solid border-gray-500 rounded-2xl focus:border-red-500 focus:outline-none transition-all duration-300 text-gray-800 font-medium pl-12"
                  />
                  <CalendarIcon class="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
              </div>
            </div>
          </div>

          <!-- Seção 3: Horários -->
          <div class="space-y-6">
            <div class="flex items-center mb-6">
              <div class="bg-yellow-100 p-3 rounded-full mr-4">
                <ClockIcon class="w-5 h-5 text-yellow-600" />
              </div>
              <h3 class="text-xl font-bold text-gray-900">⏰ Horários</h3>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
              <!-- Horário de Início -->
              <div class="space-y-2">
                <label class="block text-sm font-bold text-gray-800 mb-2">
                  Horário de Início *
                </label>
                <div class="relative">
                  <input 
                    v-model="formData.start"
                    type="time"
                    required
                    class="w-full px-6 py-4 border-2 border-solid border-gray-500 rounded-2xl focus:border-red-500 focus:outline-none transition-all duration-300 text-gray-800 font-medium pl-12"
                  />
                  <ClockIcon class="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
              </div>

              <!-- Horário de Fim -->
              <div class="space-y-2">
                <label class="block text-sm font-bold text-gray-800 mb-2">
                  Horário de Fim *
                </label>
                <div class="relative">
                  <input 
                    v-model="formData.end"
                    type="time"
                    required
                    class="w-full px-6 py-4 border-2 border-solid border-gray-500 rounded-2xl focus:border-red-500 focus:outline-none transition-all duration-300 text-gray-800 font-medium pl-12"
                  />
                  <ClockIcon class="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
              </div>
            </div>
          </div>

          <!-- Seção 4: Detalhes do Evento -->
          <div class="space-y-6">
            <div class="flex items-center mb-6">
              <div class="bg-red-100 p-3 rounded-full mr-4">
                <UsersIcon class="w-5 h-5 text-red-600" />
              </div>
              <h3 class="text-xl font-bold text-gray-900">👥 Detalhes do Evento</h3>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
              <!-- Tipo de Evento -->
              <div class="space-y-2">
                <label class="block text-sm font-bold text-gray-800 mb-2">
                  Tipo de Evento/Atividade
                </label>
                <div class="relative">
                  <select 
                    v-model="formData.eventType"
                    class="w-full px-6 py-4 border-2 border-solid border-gray-500 rounded-2xl focus:border-red-500 focus:outline-none transition-all duration-300 text-gray-800 font-medium pl-12 appearance-none bg-white"
                  >
                    <option value="">Selecione o tipo de evento</option>
                    <option v-for="type in eventTypes" :key="type" :value="type" class="py-2">
                      {{ type }}
                    </option>
                  </select>
                  <TagIcon class="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <ChevronDownIcon class="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
              </div>

              <!-- Tipo de Participantes -->
              <div class="space-y-2">
                <label class="block text-sm font-bold text-gray-800 mb-2">
                  Tipo de Participantes
                </label>
                <div class="relative">
                  <select 
                    v-model="formData.participants"
                    class="w-full px-6 py-4 border-2 border-solid border-gray-500 rounded-2xl focus:border-red-500 focus:outline-none transition-all duration-300 text-gray-800 font-medium pl-12 appearance-none bg-white"
                  >
                    <option value="">Selecione o tipo de participantes</option>
                    <option v-for="participant in participantTypes" :key="participant" :value="participant" class="py-2">
                      {{ participant }}
                    </option>
                  </select>
                  <UsersIcon class="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <ChevronDownIcon class="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
              </div>

              <!-- Número de Participantes -->
              <div class="space-y-2">
                <label class="block text-sm font-bold text-gray-800 mb-2">
                  Número de Participantes
                </label>
                <div class="relative">
                  <input 
                    v-model="formData.participantCount"
                    type="number"
                    min="1"
                    max="100"
                    placeholder="Ex: 10 pessoas"
                    class="w-full px-6 py-4 border-2 border-solid border-gray-500 rounded-2xl focus:border-red-500 focus:outline-none transition-all duration-300 text-gray-800 font-medium pl-12"
                  />
                  <HashIcon class="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
              </div>

              <!-- Café -->
              <div class="space-y-2">
                <label class="block text-sm font-bold text-gray-800 mb-2">
                  Precisa de Café?
                </label>
                <div class="flex items-center space-x-8 pt-2">
                  <label class="flex items-center space-x-3 cursor-pointer group">
                    <input 
                      v-model="formData.needsCoffee"
                      type="radio"
                      :value="true"
                      name="coffee"
                      class="w-5 h-5 text-red-600 border-gray-500 focus:ring-red-600"
                    />
                    <span class="text-gray-700 font-medium group-hover:text-red-600 transition-colors duration-200">☕ Sim, por favor</span>
                  </label>
                  <label class="flex items-center space-x-3 cursor-pointer group">
                    <input 
                      v-model="formData.needsCoffee"
                      type="radio"
                      :value="false"
                      name="coffee"
                      class="w-5 h-5 text-red-600 border-gray-300 focus:ring-red-600"
                    />
                    <span class="text-gray-700 font-medium group-hover:text-gray-900 transition-colors duration-200">❌ Não precisa</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <!-- Observações -->
          <div class="space-y-6">
            <div class="flex items-center mb-6">
              <div class="bg-yellow-100 p-3 rounded-full mr-4">
                <MessageSquareIcon class="w-5 h-5 text-yellow-600" />
              </div>
              <h3 class="text-xl font-bold text-gray-900">📝 Observações</h3>
            </div>
            
            <div class="relative">
              <textarea 
                v-model="formData.notes"
                rows="4"
                placeholder="Digite aqui observações, instruções especiais ou requisitos adicionais para a reserva..."
                class="w-full px-6 py-4 border-2 border-solid border-gray-500 rounded-2xl focus:border-red-500 focus:outline-none resize-none transition-all duration-300 text-gray-800 font-medium pl-12"
              ></textarea>
              <MessageSquareIcon class="absolute left-4 top-6 w-5 h-5 text-gray-400" />
            </div>
          </div>

          <!-- Verificação de Conflitos -->
          <div v-if="conflictMessage" class="bg-gradient-to-r from-red-50 to-red-100 border-2 border-red-200 rounded-2xl p-6 shadow-lg">
            <div class="flex items-start">
              <div class="bg-red-200 p-3 rounded-full mr-4 flex-shrink-0">
                <AlertTriangleIcon class="w-6 h-6 text-red-700" />
              </div>
              <div>
                <h4 class="font-bold text-red-800 text-lg mb-2">⚠️ Conflito de Horário Detectado</h4>
                <p class="text-red-700 leading-relaxed">{{ conflictMessage }}</p>
                <p class="text-red-600 text-sm mt-2 font-medium">Por favor, escolha um horário diferente ou outra sala.</p>
              </div>
            </div>
          </div>

          <!-- Botões de Ação -->
          <div class="flex flex-col sm:flex-row gap-6 pt-8 border-t-2 border-gray-100">
            <button 
              type="button"
              @click="$emit('voltar-home')"
              class="flex-1 group px-8 py-6 bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-gray-900 rounded-2xl font-bold transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-xl border-2 border-gray-200 hover:border-gray-300"
            >
              <ArrowLeftIcon class="w-5 h-5 mr-3 group-hover:-translate-x-1 transition-transform duration-300" />
              Cancelar
            </button>
            
            <button 
              type="submit"
              :disabled="!isFormValid || !!conflictMessage"
              :class="`flex-1 group px-8 py-6 rounded-2xl font-bold transition-all duration-500 flex items-center justify-center shadow-lg hover:shadow-2xl ${
                !isFormValid || !!conflictMessage
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed border-2 border-gray-200'
                  : 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white hover:scale-105 border-2 border-red-600 hover:border-red-700'
              }`"
            >
              <CheckIcon class="w-5 h-5 mr-3 group-hover:scale-110 transition-transform duration-300" />
              {{ !isFormValid ? 'Preencha os campos obrigatórios' : 'Confirmar Reserva' }}
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'

import { 
  Plus as PlusIcon, 
  ArrowLeft as ArrowLeftIcon, 
  AlertTriangle as AlertTriangleIcon,
  Calendar as CalendarIcon,
  Clock as ClockIcon,
  User as UserIcon,
  Users as UsersIcon,
  MapPin as MapPinIcon,
  FileText as FileTextIcon,
  Building as BuildingIcon,
  ChevronDown as ChevronDownIcon,
  Tag as TagIcon,
  Hash as HashIcon,
  MessageSquare as MessageSquareIcon,
  Check as CheckIcon
} from 'lucide-vue-next'

const emit = defineEmits(['voltar-home', 'reserva-criada'])

// Dados do formulário
const formData = ref({
  responsibleName: '',
  title: '',
  room: '',
  date: '',
  start: '',
  end: '',
  eventType: '',
  participants: '',
  participantCount: '',
  needsCoffee: false,
  notes: ''
})

// Data mínima (hoje)
const minDate = new Date().toISOString().split('T')[0]

// Lista de salas
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

// Tipos de evento
const eventTypes = [
  'Reunião de Equipe',
  'Apresentação para Cliente',
  'Apresentação',
  'Treinamento',
  'Reunião - A3',
  'Workshop',
  'Conferência',
  'Entrevista',
  'Sessão de Brainstorm',
  'Review de Projeto',
  'Planning',
  'Retrospectiva',
  'Demo de Produto',
  'Call com Fornecedor/Corporativo',
  'Reunião de Gerentes',
  'Outros'
]

// Tipos de participantes
const participantTypes = [
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

// Estado de conflito
const conflictMessage = ref('')

// Validação do formulário
const isFormValid = computed(() => {
  return formData.value.responsibleName.trim() !== '' &&
         formData.value.title.trim() !== '' &&
         formData.value.room !== '' &&
         formData.value.date !== '' &&
         formData.value.start !== '' &&
         formData.value.end !== '' &&
         formData.value.start < formData.value.end
})

// Verificar conflitos de horário
const checkConflicts = () => {
  if (!formData.value.room || !formData.value.date || !formData.value.start || !formData.value.end) {
    conflictMessage.value = ''
    return
  }

  // Simulação de verificação de conflitos - você pode conectar com localStorage aqui
  const existingBookings = JSON.parse(localStorage.getItem('reservas_salas') || '[]')
  
  const conflicts = existingBookings.filter(booking => {
    return booking.sala === formData.value.room &&
           booking.data === formData.value.date &&
           (
             (formData.value.start >= booking.horaInicio && formData.value.start < booking.horaFinal) ||
             (formData.value.end > booking.horaInicio && formData.value.end <= booking.horaFinal) ||
             (formData.value.start <= booking.horaInicio && formData.value.end >= booking.horaFinal)
           )
  })

  if (conflicts.length > 0) {
    const conflict = conflicts[0]
    conflictMessage.value = `A sala "${formData.value.room}" já está reservada das ${conflict.horaInicio} às ${conflict.horaFinal} para "${conflict.tipoevento}"`
  } else {
    conflictMessage.value = ''
  }
}

// Watch para verificar conflitos
watch([
  () => formData.value.room,
  () => formData.value.date,
  () => formData.value.start,
  () => formData.value.end
], () => {
  checkConflicts()
})

// Submissão do formulário
const handleSubmit = () => {
  if (!isFormValid.value || conflictMessage.value) {
    return
  }

  const reservaData = {
    id: Date.now(),
    sala: formData.value.room,
    responsavel: formData.value.responsibleName,
    tipoevento: formData.value.eventType || formData.value.title,
    data: formData.value.date,
    horaInicio: formData.value.start,
    horaFinal: formData.value.end,
    participantes: formData.value.participants,
    quantidade: formData.value.participantCount || 0,
    cafe: formData.value.needsCoffee ? 'Sim' : 'Não',
    observacoes: formData.value.notes
  }

  // Salvar no localStorage
  const reservasExistentes = JSON.parse(localStorage.getItem('reservas_salas') || '[]')
  reservasExistentes.push(reservaData)
  localStorage.setItem('reservas_salas', JSON.stringify(reservasExistentes))

  // Emitir eventos
  window.dispatchEvent(new CustomEvent('reserva-adicionada'))
  emit('reserva-criada', reservaData)
}
</script>

<style scoped>
/* Animações customizadas */
@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Efeitos de hover personalizados */
.hover-lift:hover {
  transform: translateY(-2px);
}

/* Estilização dos inputs */
input:focus,
select:focus,
textarea:focus {
  transform: translateY(-1px);
  box-shadow: 0 10px 25px -5px rgba(239, 68, 68, 0.2);
}

/* Animação dos ícones */
.icon-bounce:hover {
  animation: bounce 0.5s ease-in-out;
}

@keyframes bounce {
  0%, 20%, 53%, 80%, 100% {
    transform: translate3d(0, 0, 0);
  }
  40%, 43% {
    transform: translate3d(0, -8px, 0);
  }
  70% {
    transform: translate3d(0, -4px, 0);
  }
  90% {
    transform: translate3d(0, -2px, 0);
  }
}

/* Personalização dos radio buttons */
input[type="radio"]:checked {
  background-color: #dc2626;
  border-color: #dc2626;
}

/* Gradiente no botão principal */
.gradient-button {
  background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
}

.gradient-button:hover {
  background: linear-gradient(135deg, #b91c1c 0%, #991b1b 100%);
}
</style>