<template>
  <div class="min-h-screen bg-gray-50 p-4 sm:p-6">

    <!-- Toast -->
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 translate-y-2"
    >
      <div
        v-if="toast.visivel"
        class="fixed top-4 right-4 z-[60] flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg border text-sm font-medium"
        :class="toast.tipo === 'sucesso'
          ? 'bg-green-50 border-green-200 text-green-800'
          : 'bg-rose-50 border-rose-200 text-rose-800'"
      >
        <svg v-if="toast.tipo === 'sucesso'" class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
        </svg>
        <svg v-else class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
        {{ toast.mensagem }}
      </div>
    </Transition>

    <!-- Header da página -->
    <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-6">
      <h2 class="text-xl sm:text-3xl font-bold text-gray-900">Agenda de Reservas</h2>
      <div class="flex gap-2 sm:gap-3">
        <button
          @click="irParaHoje"
          class="flex items-center gap-1.5 bg-red-600 hover:bg-red-700 text-white px-3 sm:px-4 py-2 rounded-xl text-sm font-medium shadow-sm transition-all duration-200"
        >
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          Hoje
        </button>
        <button
          @click="atualizarEventos"
          class="flex items-center gap-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 sm:px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200"
        >
          <svg class="w-3.5 h-3.5 transition-transform duration-700" :class="{ 'animate-spin': atualizando }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Atualizar
        </button>
      </div>
    </div>

    <!-- Container do calendário -->
    <div class="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6">
      <FullCalendar :options="calendarOptions" ref="fullCalendar" />
    </div>

    <!-- Modal de detalhes da reserva -->
    <Transition
      enter-active-class="transition-all duration-200 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-all duration-150 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="modalAberto" class="modal-backdrop-blur" @click="fecharModal">
        <Transition
          enter-active-class="transition-all duration-200 ease-out"
          enter-from-class="opacity-0 scale-95"
          enter-to-class="opacity-100 scale-100"
          leave-active-class="transition-all duration-150 ease-in"
          leave-from-class="opacity-100 scale-100"
          leave-to-class="opacity-0 scale-95"
        >
          <div
            v-if="modalAberto"
            class="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
            @click.stop
          >
            <!-- Header do modal -->
            <div class="flex justify-between items-center px-6 py-4 border-b border-gray-100 bg-gray-50 rounded-t-2xl">
              <h3 class="text-lg font-semibold text-gray-900">Detalhes da Reserva</h3>
              <button
                @click="fecharModal"
                class="text-gray-400 hover:text-gray-600 hover:bg-gray-200 rounded-lg p-1.5 transition-colors duration-200"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <!-- Corpo do modal -->
            <div class="p-6" v-if="reservaSelecionada">
              <div class="grid grid-cols-2 gap-3">
                <div class="col-span-2 bg-gray-50 rounded-xl p-3 border-l-4 border-red-500">
                  <span class="text-xs font-medium text-gray-500 uppercase tracking-wide">Sala</span>
                  <p class="text-sm font-semibold text-gray-900 mt-1">{{ reservaSelecionada.sala }}</p>
                </div>

                <div class="bg-gray-50 rounded-xl p-3">
                  <span class="text-xs font-medium text-gray-500 uppercase tracking-wide">Responsável</span>
                  <p class="text-sm font-semibold text-gray-900 mt-1">{{ reservaSelecionada.responsavel }}</p>
                </div>

                <div class="bg-gray-50 rounded-xl p-3">
                  <span class="text-xs font-medium text-gray-500 uppercase tracking-wide">Evento</span>
                  <p class="text-sm font-semibold text-gray-900 mt-1">{{ reservaSelecionada.tipoevento }}</p>
                </div>

                <div class="bg-gray-50 rounded-xl p-3">
                  <span class="text-xs font-medium text-gray-500 uppercase tracking-wide">Data</span>
                  <p class="text-sm font-semibold text-gray-900 mt-1">{{ formatarDataBrasil(reservaSelecionada.data) }}</p>
                </div>

                <div class="bg-gray-50 rounded-xl p-3">
                  <span class="text-xs font-medium text-gray-500 uppercase tracking-wide">Horário</span>
                  <p class="text-sm font-semibold text-gray-900 mt-1">{{ reservaSelecionada.horaInicio }} às {{ reservaSelecionada.horaFinal }}</p>
                </div>

                <div class="bg-gray-50 rounded-xl p-3">
                  <span class="text-xs font-medium text-gray-500 uppercase tracking-wide">Quantidade</span>
                  <p class="text-sm font-semibold text-gray-900 mt-1">{{ reservaSelecionada.quantidade }} pessoas</p>
                </div>

                <div v-if="reservaSelecionada.cafe" class="bg-gray-50 rounded-xl p-3">
                  <span class="text-xs font-medium text-gray-500 uppercase tracking-wide">Café</span>
                  <p class="text-sm font-semibold text-gray-900 mt-1">{{ reservaSelecionada.cafe }}</p>
                </div>

                <div class="col-span-2 bg-gray-50 rounded-xl p-3">
                  <span class="text-xs font-medium text-gray-500 uppercase tracking-wide">Participantes</span>
                  <p class="text-sm font-semibold text-gray-900 mt-1">{{ reservaSelecionada.participantes }}</p>
                </div>
              </div>
            </div>

            <!-- Footer do modal -->
            <div class="flex gap-2 px-6 py-4 border-t border-gray-100 justify-end">
              <button
                @click="fecharModal"
                class="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-xl transition-colors duration-200"
              >
                Fechar
              </button>
              <button
                @click="excluirReserva"
                class="px-4 py-2 text-sm font-medium border border-rose-300 text-rose-600 hover:bg-rose-50 rounded-xl transition-colors duration-200"
              >
                Excluir
              </button>
              <button
                @click="editarReserva"
                class="px-4 py-2 text-sm font-medium bg-red-600 hover:bg-red-700 text-white rounded-xl shadow-sm transition-all duration-200"
              >
                Editar
              </button>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>

    <!-- Modal de confirmação de exclusão -->
    <Transition
      enter-active-class="transition-all duration-200 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-all duration-150 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="modalExclusao"
        class="fixed inset-0 flex items-center justify-center z-[55] p-4"
        style="background-color: rgba(0,0,0,0.5); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);"
        @click="cancelarExclusao"
      >
        <Transition
          enter-active-class="transition-all duration-200 ease-out"
          enter-from-class="opacity-0 scale-95"
          enter-to-class="opacity-100 scale-100"
        >
          <div
            v-if="modalExclusao"
            class="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6"
            @click.stop
          >
            <div class="text-center">
              <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-rose-100 mb-4">
                <svg class="h-6 w-6 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h3 class="text-lg font-semibold text-gray-900 mb-2">Confirmar Exclusão</h3>
              <p class="text-sm text-gray-500 mb-6">Tem certeza que deseja excluir esta reserva? Esta ação não pode ser desfeita.</p>

              <div class="flex gap-3 justify-center">
                <button
                  @click="cancelarExclusao"
                  class="px-5 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-xl transition-colors duration-200"
                >
                  Cancelar
                </button>
                <button
                  @click="confirmarExclusao"
                  class="px-5 py-2 text-sm font-medium bg-rose-600 hover:bg-rose-700 text-white rounded-xl shadow-sm transition-all duration-200"
                >
                  Sim, Excluir
                </button>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onBeforeUnmount, nextTick } from 'vue'
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import ptBrLocale from '@fullcalendar/core/locales/pt-br'

const emit = defineEmits(['booking-start', 'edit-booking', 'delete-booking'])

const fullCalendar = ref(null)
const atualizando = ref(false)
const modalAberto = ref(false)
const modalExclusao = ref(false)
const reservaSelecionada = ref(null)

const toast = reactive({ visivel: false, mensagem: '', tipo: 'sucesso' })

let toastTimer = null

function mostrarToast(mensagem, tipo = 'sucesso') {
  if (toastTimer) clearTimeout(toastTimer)
  toast.mensagem = mensagem
  toast.tipo = tipo
  toast.visivel = true
  toastTimer = setTimeout(() => { toast.visivel = false }, 3000)
}

const isMobile = window.innerWidth < 640

const calendarOptions = reactive({
  plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
  initialView: isMobile ? 'timeGridDay' : 'dayGridMonth',
  locale: ptBrLocale,
  height: 'auto',
  headerToolbar: {
    left: 'prev,next today',
    center: 'title',
    right: 'dayGridMonth,timeGridWeek,timeGridDay'
  },
  buttonText: {
    today: 'Hoje',
    month: 'Mês',
    week: 'Semana',
    day: 'Dia'
  },
  events: [],
  selectable: true,
  selectMirror: true,
  dayMaxEvents: isMobile ? 2 : 3,
  moreLinkClick: 'popover',
  eventDisplay: 'block',
  eventColor: '#4F46E5',
  eventTextColor: '#ffffff',
  aspectRatio: isMobile ? 1.2 : 1.8,
  contentHeight: isMobile ? 'auto' : 650,
  select: handleDateSelect,
  eventClick: handleEventClick,
  eventDidMount: customizeEvent,
})

function getCorPorSala(sala) {
  const cores = {
    'Sala Paixão':      '#E11D48',
    'Respeito':         '#F97316',
    'Auditório F1':     '#EAB308',
    'Auditório F2':     '#22C55E',
    'Auditório F3':     '#06B6D4',
    'Hoshin':           '#A855F7',
    'Sala ADM':         '#6B7280',
    'Sala RH':          '#8B5CF6',
    'Sala Manutenção':  '#3B82F6',
    'Sala NIKE':        '#1E293B',
    'Sala do BIP':      '#BE123C',
    'Sala Compromisso': '#CA8A04',
  }
  if (cores[sala]) return cores[sala]
  const isWarm = Math.random() > 0.5
  return isWarm
    ? `hsl(${Math.floor(Math.random() * 60)}, 80%, 45%)`
    : `hsl(220, 60%, ${35 + Math.floor(Math.random() * 25)}%)`
}

function getReservas() {
  try {
    const reservas = JSON.parse(localStorage.getItem('reservas_salas') || '[]')
    return reservas.map(reserva => {
      const cor = getCorPorSala(reserva.sala)
      return {
        id: reserva.id,
        title: reserva.sala,
        start: `${reserva.data}T${reserva.horaInicio}:00`,
        end: `${reserva.data}T${reserva.horaFinal}:00`,
        allDay: false,
        backgroundColor: cor,
        borderColor: cor,
        textColor: '#ffffff',
        extendedProps: { reserva }
      }
    })
  } catch (error) {
    console.error('Erro ao carregar reservas:', error)
    return []
  }
}

function seedReservasSeVazio() {
  const chave = 'reservas_salas'
  const atual = JSON.parse(localStorage.getItem(chave) || '[]')
  if (atual.length > 0) return

  const agora = new Date()
  const hoje = `${agora.getFullYear()}-${String(agora.getMonth() + 1).padStart(2, '0')}-${String(agora.getDate()).padStart(2, '0')}`

  const exemploReservas = [
    {
      id: Date.now() + 1,
      sala: 'Sala Paixão',
      responsavel: 'João Silva',
      tipoevento: 'Reunião de Equipe',
      data: hoje,
      horaInicio: '09:00',
      horaFinal: '10:30',
      participantes: 'Equipe de Desenvolvimento',
      quantidade: 8,
      cafe: 'Sim'
    },
    {
      id: Date.now() + 2,
      sala: 'Auditório F1',
      responsavel: 'Maria Santos',
      tipoevento: 'Apresentação Cliente',
      data: hoje,
      horaInicio: '14:00',
      horaFinal: '16:00',
      participantes: 'Equipe Comercial + Cliente ABC',
      quantidade: 15,
      cafe: 'Sim'
    }
  ]
  localStorage.setItem(chave, JSON.stringify(exemploReservas))
}

function customizeEvent(info) {
  const reserva = info.event.extendedProps.reserva
  info.el.title = `${reserva.responsavel} - ${reserva.tipoevento}\n${reserva.horaInicio} às ${reserva.horaFinal}`
  info.el.classList.add('evento-reserva', 'cursor-pointer')
}

function atualizarEventos() {
  atualizando.value = true
  const eventos = getReservas()
  calendarOptions.events = eventos
  nextTick(() => {
    if (fullCalendar.value) {
      const api = fullCalendar.value.getApi()
      api.removeAllEvents()
      api.addEventSource(eventos)
      api.refetchEvents()
    }
    setTimeout(() => { atualizando.value = false }, 600)
  })
}

function onStorageChange(event) {
  if (event.key === 'reservas_salas') atualizarEventos()
}

function handleDateSelect(info) {
  const data = info.startStr.split('T')[0]
  emit('booking-start', { date: data })
}

function handleEventClick(info) {
  reservaSelecionada.value = info.event.extendedProps.reserva
  modalAberto.value = true
}

function fecharModal() {
  modalAberto.value = false
  reservaSelecionada.value = null
}

function editarReserva() {
  if (reservaSelecionada.value) {
    emit('edit-booking', reservaSelecionada.value.id)
    fecharModal()
  }
}

function excluirReserva() {
  modalExclusao.value = true
}

function confirmarExclusao() {
  if (!reservaSelecionada.value) return
  try {
    const reservas = JSON.parse(localStorage.getItem('reservas_salas') || '[]')
    const novasReservas = reservas.filter(r => r.id !== reservaSelecionada.value.id)
    localStorage.setItem('reservas_salas', JSON.stringify(novasReservas))
    window.dispatchEvent(new CustomEvent('reserva-removida'))
    atualizarEventos()
    modalExclusao.value = false
    modalAberto.value = false
    reservaSelecionada.value = null
    mostrarToast('Reserva excluída com sucesso!')
  } catch (error) {
    console.error('Erro ao excluir reserva:', error)
    mostrarToast('Erro ao excluir reserva: ' + error.message, 'erro')
  }
}

function cancelarExclusao() {
  modalExclusao.value = false
}

function irParaHoje() {
  if (fullCalendar.value) fullCalendar.value.getApi().today()
}

function formatarDataBrasil(data) {
  return new Date(data + 'T00:00:00').toLocaleDateString('pt-BR')
}

onMounted(() => {
  seedReservasSeVazio()
  atualizarEventos()
  window.addEventListener('storage', onStorageChange)
  window.removeEventListener('reserva-adicionada', atualizarEventos)
  window.removeEventListener('reserva-removida', atualizarEventos)
  window.addEventListener('reserva-adicionada', atualizarEventos)
  window.addEventListener('reserva-removida', atualizarEventos)
})

onBeforeUnmount(() => {
  window.removeEventListener('storage', onStorageChange)
  window.removeEventListener('reserva-adicionada', atualizarEventos)
  window.removeEventListener('reserva-removida', atualizarEventos)
  if (toastTimer) clearTimeout(toastTimer)
})
</script>

<style scoped>
:deep(.fc-toolbar) {
  @apply mb-6;
}

:deep(.fc-button-primary) {
  @apply bg-red-600 border-red-600 hover:bg-red-700 hover:border-red-700
         text-sm font-medium px-3 py-2 rounded-xl transition-all duration-200 shadow-sm;
}

:deep(.fc-button-primary:not(:disabled):active),
:deep(.fc-button-primary:not(:disabled).fc-button-active) {
  @apply bg-red-800 border-red-800;
}

:deep(.fc-toolbar-title) {
  @apply text-gray-900 text-lg font-semibold;
}

:deep(.fc-col-header-cell-cushion) {
  @apply text-gray-600 font-medium text-xs uppercase tracking-wider py-3;
}

:deep(.fc-daygrid-day-number) {
  @apply text-gray-700 text-sm font-medium p-2;
}

:deep(.fc-day-today) {
  background-color: rgba(99, 102, 241, 0.05) !important;
}

:deep(.fc-event) {
  @apply rounded-lg text-xs font-medium py-1.5 px-2.5 my-0.5 shadow-sm border-0 border-l-4 cursor-pointer;
}

:deep(.fc-daygrid-event-dot) {
  @apply hidden;
}

:deep(.fc-timegrid-event) {
  @apply rounded-lg;
}

:deep(.fc-daygrid-day:hover) {
  @apply bg-gray-50 cursor-pointer;
}

:deep(.evento-reserva:hover) {
  @apply shadow-md transition-shadow duration-200;
}

@media (max-width: 640px) {
  :deep(.fc-toolbar) {
    @apply flex-col gap-3;
  }

  :deep(.fc-toolbar-chunk) {
    @apply flex justify-center;
  }

  :deep(.fc-button-group) {
    @apply flex-wrap gap-1;
  }

  :deep(.fc-toolbar-title) {
    @apply text-base;
  }
}

.modal-backdrop-blur {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
  padding: 1rem;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}
</style>
