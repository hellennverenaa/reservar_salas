<template>
  <div class="min-h-screen bg-white p-6">
    <div class="flex justify-between items-center mb-8">
      <h2 class="text-3xl font-bold text-black">Agenda de Reservas</h2>
      <div class="flex gap-3">
        <button 
          @click="irParaHoje" 
          class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200"
        >
          Hoje
        </button>
        <button 
          @click="atualizarEventos" 
          class="bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
          </svg>
          Atualizar
        </button>
      </div>
    </div>

    <div class="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
      <FullCalendar :options="calendarOptions" ref="fullCalendar" />
    </div>

    <div 
      v-if="modalAberto" 
      class="modal-backdrop-blur"
      @click="fecharModal"
    >
      <div 
        class="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto"
        @click.stop
      >


      <!--Detalhes da reserva -->

        <div class="flex justify-between items-center p-7 border-b border-gray-500">
          <h3 class="text-xl font-bold text-gray-500">Detalhes da Reserva</h3>
          <button 
            @click="fecharModal" 
            class="text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full p-2 transition-colors duration-200"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <div class="p-6" v-if="reservaSelecionada">
          <div class="space-y-4">
            <div class="bg-gray-50 rounded-lg p-4 border-l-4 border-red-600">
              <span class="text-sm font-medium text-red-600">Sala</span>
              <p class="text-gray-900 font-semibold">{{ reservaSelecionada.sala }}</p>
            </div>

            <div class="bg-gray-50 rounded-lg p-4 border-l-4 border-black">
              <span class="text-sm font-medium text-black">Responsável</span>
              <p class="text-gray-900">{{ reservaSelecionada.responsavel }}</p>
            </div>

            <div class="bg-gray-50 rounded-lg p-4 border-l-4 border-red-700">
              <span class="text-sm font-medium text-red-700">Evento</span>
              <p class="text-gray-900">{{ reservaSelecionada.tipoevento }}</p>
            </div>

            <div class="bg-gray-50 rounded-lg p-4 border-l-4 border-gray-800">
              <span class="text-sm font-medium text-gray-800">Data</span>
              <p class="text-gray-900">{{ formatarDataBrasil(reservaSelecionada.data) }}</p>
            </div>

            <div class="bg-gray-50 rounded-lg p-4 border-l-4 border-red-500">
              <span class="text-sm font-medium text-red-500">Horário</span>
              <p class="text-gray-900">{{ reservaSelecionada.horaInicio }} às {{ reservaSelecionada.horaFinal }}</p>
            </div>

            <div class="bg-gray-50 rounded-lg p-4 border-l-4 border-black/80">
              <span class="text-sm font-medium text-black/80">Participantes</span>
              <p class="text-gray-900">{{ reservaSelecionada.participantes }}</p>
            </div>

            <div class="bg-gray-50 rounded-lg p-4 border-l-4 border-red-800">
              <span class="text-sm font-medium text-red-800">Quantidade</span>
              <p class="text-gray-900">{{ reservaSelecionada.quantidade }} pessoas</p>
            </div>

            <div v-if="reservaSelecionada.cafe" class="bg-gray-50 rounded-lg p-4 border-l-4 border-gray-900">
              <span class="text-sm font-medium text-gray-900">Café</span>
              <p class="text-gray-900">{{ reservaSelecionada.cafe }}</p>
            </div>
          </div>
        </div>

        <div class="flex gap-3 p-6 border-t border-gray-200 justify-end">
          <button 
            @click="editarReserva" 
            class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200"
          >
            Editar
          </button>
          <button 
            @click="excluirReserva" 
            class="bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200"
          >
            Excluir
          </button>
          <button 
            @click="fecharModal" 
            class="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>

    <div 
      v-if="modalExclusao" 
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      @click="cancelarExclusao"
    >
      <div 
        class="bg-white rounded-xl shadow-2xl max-w-sm w-full p-6"
        @click.stop
      >
        <div class="text-center">
          <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
            <svg class="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-gray-900 mb-2">Confirmar Exclusão</h3>
          <p class="text-gray-600 mb-6">Tem certeza que deseja excluir esta reserva? Esta ação não pode ser desfeita.</p>
          
          <div class="flex gap-3 justify-center">
            <button 
              @click="confirmarExclusao" 
              class="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200"
            >
              Sim, Excluir
            </button>
            <button 
              @click="cancelarExclusao" 
              class="bg-gray-300 hover:bg-gray-400 text-gray-700 px-6 py-2 rounded-lg font-medium transition-colors duration-200"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import ptBrLocale from '@fullcalendar/core/locales/pt-br'

export default {
  name: 'CalendarView',
  components: {
    FullCalendar
  },
  data() {
    return {
      modalAberto: false,
      modalExclusao: false,
      reservaSelecionada: null,
      calendarOptions: {
        plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
        initialView: 'dayGridMonth',
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
        dayMaxEvents: 3,
        moreLinkClick: 'popover',
        eventDisplay: 'block',
        select: this.handleDateSelect,
        eventClick: this.handleEventClick,
        // Cores padrão para eventos, podem ser sobrescritas por getCorPorSala
        eventColor: '#A80000', // Vermelho escuro padrão
        eventTextColor: '#ffffff',
        eventDidMount: this.customizeEvent,
        // Melhor responsividade
        aspectRatio: 1.8,
        contentHeight: 600
      }
    }
  },

  mounted() {
    console.log('Calendar montado, carregando eventos...');
    this.seedReservasSeVazio();
    this.atualizarEventos();

    window.addEventListener('storage', this.onStorageChange);
    // Remover e re-adicionar os listeners para Custom Events
    // para garantir que não haja duplicação se o componente for montado/desmontado várias vezes
    window.removeEventListener('reserva-adicionada', this.atualizarEventos);
    window.removeEventListener('reserva-removida', this.atualizarEventos);
    window.addEventListener('reserva-adicionada', this.atualizarEventos);
    window.addEventListener('reserva-removida', this.atualizarEventos);
  },

  beforeUnmount() {
    window.removeEventListener('storage', this.onStorageChange);
    window.removeEventListener('reserva-adicionada', this.atualizarEventos);
    window.removeEventListener('reserva-removida', this.atualizarEventos);
  },

  methods: {
    getReservas() {
      try {
        const reservas = JSON.parse(localStorage.getItem('reservas_salas') || '[]');
        console.log('Reservas carregadas:', reservas);

        return reservas.map(reserva => {
          const startStr = `${reserva.data}T${reserva.horaInicio}:00`;
          const endStr = `${reserva.data}T${reserva.horaFinal}:00`;
          
          return {
            id: reserva.id,
            title: `${reserva.sala}`,
            start: startStr,
            end: endStr,
            allDay: false,
            // A cor do evento será definida aqui para ser aleatória ou baseada na sala
            backgroundColor: this.getCorAleatoriaOuPorSala(reserva.sala), 
            borderColor: this.getCorAleatoriaOuPorSala(reserva.sala),
            textColor: '#ffffff',
            extendedProps: {
              reserva: reserva
            }
          };
        });
      } catch (error) {
        console.error('Erro ao carregar reservas:', error);
        return [];
      }
    },

    // Nova função para cores aleatórias ou por sala
    getCorAleatoriaOuPorSala(sala) {
      const coresFixas = {
        'Sala Paixão': '#CC0000', // Vermelho
        'Respeito': '#333333', // Preto
        'Auditório F1': '#990000', // Vermelho escuro
        'Auditório F2': '#000000', // Preto puro
        'Auditório F3': '#FF3333', // Vermelho mais claro
        'Hoshin': '#660000', // Vermelho muito escuro
        'Sala ADM': '#444444', // Cinza escuro
        'Sala RH': '#FF6666', // Vermelho médio
        'Sala Manutenção': '#222222', // Quase preto
        'Sala NIKE': '#FF0000', // Vermelho vibrante
        'Sala do BIP': '#770000' // Vermelho terroso
      };
      
      // Se a sala tiver uma cor fixa, use-a. Caso contrário, gere uma cor aleatória.
      // Modificado para usar cores da paleta vermelho/preto/branco ou tons próximos.
      if (coresFixas[sala]) {
        return coresFixas[sala];
      } else {
        // Gerar um tom de vermelho ou cinza para eventos não mapeados explicitamente
        const randomRedTone = Math.floor(Math.random() * 200); // 0-199
        const isRed = Math.random() > 0.5; // 50% chance de ser vermelho, 50% de ser cinza/preto

        if (isRed) {
            return `hsl(0, 100%, ${30 + Math.floor(Math.random() * 30)}%)`; // Vermelho com variação de luminosidade
        } else {
            return `hsl(0, 0%, ${10 + Math.floor(Math.random() * 40)}%)`; // Cinza/Preto com variação de luminosidade
        }
      }
    },

    seedReservasSeVazio() {
      const chave = 'reservas_salas';
      const atual = JSON.parse(localStorage.getItem(chave) || '[]');
      if (atual.length > 0) return;

      const agora = new Date();
      const yyyy = agora.getFullYear();
      const mm = String(agora.getMonth() + 1).padStart(2, '0');
      const dd = String(agora.getDate()).padStart(2, '0');
      const hoje = `${yyyy}-${mm}-${dd}`;

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
      ];

      localStorage.setItem(chave, JSON.stringify(exemploReservas));
    },

    customizeEvent(info) {
      const reserva = info.event.extendedProps.reserva;
      info.el.title = `${reserva.responsavel} - ${reserva.tipoevento}\n${reserva.horaInicio} às ${reserva.horaFinal}`;
      info.el.classList.add('evento-reserva', 'cursor-pointer', 'hover:opacity-80', 'transition-opacity');
    },

    atualizarEventos() {
      console.log('Atualizando eventos do calendário...');
      const eventos = this.getReservas();
      
      this.calendarOptions = {
        ...this.calendarOptions,
        events: eventos
      };

      this.$nextTick(() => {
        if (this.$refs.fullCalendar) {
          const calendarApi = this.$refs.fullCalendar.getApi();
          calendarApi.removeAllEvents();
          calendarApi.addEventSource(eventos);
          calendarApi.refetchEvents(); // Garante que os eventos sejam recarregados
        }
      });
    },

    onStorageChange(event) {
      if (event.key === 'reservas_salas') {
        console.log('Detectada mudança no localStorage, atualizando...');
        this.atualizarEventos();
      }
    },

    handleDateSelect(info) {
      console.log('Data selecionada:', info.startStr);
      const data = info.startStr.split('T')[0];

      // Exemplo de como emitir para o componente pai
      this.$emit('booking-start', { date: data }); // Emitir evento para iniciar uma reserva com a data selecionada
    },

    handleEventClick(info) {
      console.log('Evento clicado:', info.event);
      this.reservaSelecionada = info.event.extendedProps.reserva;
      this.modalAberto = true;
    },

    fecharModal() {
      this.modalAberto = false;
      this.reservaSelecionada = null;
    },

    editarReserva() {
      if (this.reservaSelecionada) {
        // Emitir evento para o componente pai para iniciar edição
        this.$emit('edit-booking', this.reservaSelecionada.id);
        this.fecharModal(); // Fechar o modal após emitir para edição
      }
    },

    excluirReserva() {
      this.modalExclusao = true;
    },

    confirmarExclusao() {
      if (this.reservaSelecionada) {
        try {
          const reservas = JSON.parse(localStorage.getItem('reservas_salas') || '[]');
          const novasReservas = reservas.filter(r => r.id !== this.reservaSelecionada.id);
          localStorage.setItem('reservas_salas', JSON.stringify(novasReservas));

          window.dispatchEvent(new CustomEvent('reserva-removida')); // Disparar evento global
          this.atualizarEventos();

          this.modalExclusao = false;
          this.modalAberto = false;
          this.reservaSelecionada = null;

          alert('Reserva excluída com sucesso!');
        } catch (error) {
          console.error('Erro ao excluir reserva:', error);
          alert('Erro ao excluir reserva: ' + error.message);
        }
      }
    },

    cancelarExclusao() {
      this.modalExclusao = false;
    },

    irParaHoje() {
      if (this.$refs.fullCalendar) {
        const calendarApi = this.$refs.fullCalendar.getApi();
        calendarApi.today();
      }
    },

    formatarDataBrasil(data) {
      return new Date(data + 'T00:00:00').toLocaleDateString('pt-BR');
    }
  },
  emits: ['booking-start', 'edit-booking', 'delete-booking'] // Declarar os eventos que o componente pode emitir
}
</script>

<style scoped>
/* Customização do FullCalendar com Tailwind */
:deep(.fc-toolbar) {
  @apply mb-6;
}

:deep(.fc-button-primary) {
  @apply bg-red-600 border-red-600 hover:bg-red-700 hover:border-red-700 text-sm font-medium px-3 py-2 rounded-lg transition-colors duration-200;
}

:deep(.fc-button-primary:not(:disabled):active),
:deep(.fc-button-primary:not(:disabled).fc-button-active) {
  @apply bg-black border-black; /* Botões ativos/selecionados ficam pretos */
}

:deep(.fc-toolbar-title) {
  @apply text-black; /* Título do calendário fica preto */
}

:deep(.fc-col-header-cell-cushion) {
  @apply text-black font-semibold; /* Texto dos dias da semana fica preto */
}

:deep(.fc-daygrid-day-number) {
  @apply text-gray-800; /* Números dos dias do mês */
}

:deep(.fc-day-today) {
  @apply bg-red-50; /* Dia atual com fundo vermelho claro */
}

:deep(.fc-event) {
  @apply rounded-md text-xs font-medium py-1 px-2 my-0.5 shadow-sm;
}

:deep(.fc-daygrid-event-dot) {
  @apply hidden;
}

:deep(.fc-h-event) {
  @apply border-l-4;
}

:deep(.fc-timegrid-event) {
  @apply rounded-md;
}


:deep(.fc-daygrid-day:hover) {
  @apply bg-gray-100 cursor-pointer; /* Hover nos dias fica cinza claro */
}

:deep(.evento-reserva:hover) {
  @apply transform scale-105 shadow-lg;
}

/* Responsividade */
@media (max-width: 768px) {
  :deep(.fc-toolbar) {
    @apply flex-col gap-3;
  }
  
  :deep(.fc-toolbar-chunk) {
    @apply flex justify-center;
  }
  
  :deep(.fc-button-group) {
    @apply flex-wrap gap-1;
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
  
  /* Fundo transparente */
  background-color: rgba(0, 0, 0, 0.7);
  
  /* Efeito embaçado */
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  
  /* Animação suave */
  animation: fadeInBlur 0.3s ease-out;
}

@keyframes fadeInBlur {
  from {
    opacity: 0;
    backdrop-filter: blur(0px);
  }
  to {
    opacity: 1;
    backdrop-filter: blur(8px);
  }
}
</style>