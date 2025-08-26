<template>
  <div class="calendar-view">
    <div class="calendario-header">
      <h2>Agenda de Reservas</h2>
      <div class="controles-calendario">
        <button @click="irParaHoje" class="btn-hoje">Hoje</button>
        <button @click="atualizarEventos" class="btn-atualizar">
          🔄 Atualizar
        </button>
      </div>
    </div>

    <!-- FullCalendar -->
    <FullCalendar :options="calendarOptions" ref="fullCalendar" />

    <!-- Modal de Detalhes da Reserva -->
    <div v-if="modalAberto" class="modal-overlay" @click="fecharModal">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h3>Detalhes da Reserva</h3>
          <button @click="fecharModal" class="btn-fechar-modal">×</button>
        </div>

        <div class="reserva-detalhes" v-if="reservaSelecionada">
          <div class="detalhe-item">
            <strong>Sala:</strong> {{ reservaSelecionada.sala }}
          </div>
          <div class="detalhe-item">
            <strong>Responsável:</strong> {{ reservaSelecionada.responsavel }}
          </div>
          <div class="detalhe-item">
            <strong>Evento:</strong> {{ reservaSelecionada.tipoevento }}
          </div>
          <div class="detalhe-item">
            <strong>Data:</strong> {{ formatarDataBrasil(reservaSelecionada.data) }}
          </div>
          <div class="detalhe-item">
            <strong>Horário:</strong> {{ reservaSelecionada.horaInicio }} às {{ reservaSelecionada.horaFinal }}
          </div>
          <div class="detalhe-item">
            <strong>Participantes:</strong> {{ reservaSelecionada.participantes }}
          </div>
          <div class="detalhe-item">
            <strong>Quantidade:</strong> {{ reservaSelecionada.quantidade }} pessoas
          </div>
          <div class="detalhe-item" v-if="reservaSelecionada.cafe">
            <strong>Café:</strong> {{ reservaSelecionada.cafe }}
          </div>
        </div>

        <div class="modal-acoes">
          <button @click="editarReserva" class="btn-editar">Editar</button>
          <button @click="excluirReserva" class="btn-excluir">Excluir</button>
          <button @click="fecharModal" class="btn-cancelar">Fechar</button>
        </div>
      </div>
    </div>

    <!-- Modal de Confirmação de Exclusão -->
    <div v-if="modalExclusao" class="modal-overlay" @click="cancelarExclusao">
      <div class="modal-content modal-pequeno" @click.stop>
        <h3>Confirmar Exclusão</h3>
        <p>Tem certeza que deseja excluir esta reserva?</p>
        <div class="modal-acoes">
          <button @click="confirmarExclusao" class="btn-confirmar">Sim, Excluir</button>
          <button @click="cancelarExclusao" class="btn-cancelar">Cancelar</button>
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
          left: 'prev,next',
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
        eventColor: '#25065f',
        eventTextColor: '#ffffff',
        // Personalização dos eventos
        eventDidMount: this.customizeEvent
      }
    }
  },

  mounted() {
    console.log('Calendar montado, carregando eventos...');
    this.seedReservasSeVazio();
    this.atualizarEventos();

    // Escutar mudanças no localStorage (quando outra aba adiciona/remove reservas)
    window.addEventListener('storage', this.onStorageChange);

    // Escutar eventos customizados (quando a própria aba adiciona reservas)
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

          // Calcular duração do evento
          const inicio = new Date(`${reserva.data}T${reserva.horaInicio}`);
          const fim = new Date(`${reserva.data}T${reserva.horaFinal}`);

          
          return {
            id: reserva.id,
            title: `${reserva.sala}`,
            start: startStr, // <-- sem toISOString()
            end: endStr,     // <-- sem toISOString()
            allDay: false,
            backgroundColor: this.getCorPorSala(reserva.sala),
            borderColor: this.getCorPorSala(reserva.sala),
            textColor: '#ffffff',
            extendedProps: {
              reserva: reserva // Armazenar toda a reserva
            }
          };
        });
      } catch (error) {
        console.error('Erro ao carregar reservas:', error);
        return [];
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

      getCorPorSala(sala)
      // Cores diferentes para cada sala
      const cores = {
        'Sala Paixão': '#e91e63',
        'Respeito': '#9c27b0',
        'Auditório F1': '#3f51b5',
        'Auditório F2': '#2196f3',
        'Auditório F3': '#00bcd4',
        'Hoshin': '#009688',
        'Sala ADM': '#4caf50',
        'Sala RH': '#8bc34a',
        'Sala Manutenção': '#cddc39',
        'Sala NIKE': '#ffeb3b',
        'Sala do BIP': '#ff9800'
      };

      localStorage.setItem(chave, JSON.stringify(exemplo));
      return cores[sala] || '#25065f';
    },

    customizeEvent(info) {
      // Adicionar informações extras ao evento no calendário
      const reserva = info.event.extendedProps.reserva;

      // Adicionar tooltip
      info.el.title = `${reserva.responsavel} - ${reserva.tipoevento}\n${reserva.horaInicio} às ${reserva.horaFinal}`;

      // Adicionar classe CSS personalizada se necessário
      info.el.classList.add('evento-reserva');
    },

    atualizarEventos() {
      console.log('Atualizando eventos do calendário...');

      const eventos = this.getReservas();
      console.log('Eventos para o calendário:', eventos);

      // Atualizar eventos no FullCalendar
      this.calendarOptions = {
        ...this.calendarOptions,
        events: eventos
      };

      // Forçar re-render do calendário se já estiver montado
      this.$nextTick(() => {
        if (this.$refs.fullCalendar) {
          const calendarApi = this.$refs.fullCalendar.getApi();
          calendarApi.removeAllEvents();
          calendarApi.addEventSource(eventos);
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

      // Redirecionar para página de reserva com a data pré-preenchida
      const data = info.startStr.split('T')[0]; // Pegar apenas a parte da data

      // Se você estiver usando Vue Router:
      this.$router.push({
        name: 'Reservar',
        query: { data: data }
      });

      // Ou simplesmente mostrar um alerta por enquanto:
      alert(`Criar nova reserva para ${this.formatarDataBrasil(data)}?`);
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
        // Redirecionar para página de edição
        this.$router.push({
          name: 'Reservar',
          query: {
            edit: this.reservaSelecionada.id
          }
        });
      }
    },

    excluirReserva() {
      this.modalExclusao = true;
    },

    confirmarExclusao() {
      if (this.reservaSelecionada) {
        try {
          // Remover do localStorage
          const reservas = JSON.parse(localStorage.getItem('reservas_salas') || '[]');
          const novasReservas = reservas.filter(r => r.id !== this.reservaSelecionada.id);
          localStorage.setItem('reservas_salas', JSON.stringify(novasReservas));

          // Emitir evento para outras partes da aplicação
          window.dispatchEvent(new CustomEvent('reserva-removida'));

          // Atualizar calendário
          this.atualizarEventos();

          // Fechar modais
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
  }
}
</script>

<style scoped>
.calendar-view {
  padding: 20px;
  min-height: 80vh;
  background: #f5f5f5;
}

.calendario-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding: 0 10px;
}

.calendario-header h2 {
  color: #25065f;
  margin: 0;
}

.controles-calendario {
  display: flex;
  gap: 10px;
}

.btn-hoje,
.btn-atualizar {
  background: #25065f;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: background 0.2s;
}

.btn-hoje:hover,
.btn-atualizar:hover {
  background: #14165f;
}

/* Estilos do FullCalendar customizados */
:deep(.fc-toolbar) {
  margin-bottom: 20px;
}

:deep(.fc-button-primary) {
  background-color: #25065f !important;
  border-color: #25065f !important;
}

:deep(.fc-button-primary:hover) {
  background-color: #14165f !important;
}

:deep(.fc-event) {
  border-radius: 4px;
  font-size: 12px;
  padding: 2px 4px;
  margin: 1px 0;
}

:deep(.evento-reserva) {
  cursor: pointer;
}

:deep(.fc-daygrid-event-dot) {
  display: none;
}

/* Modal styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 0;
  border-radius: 12px;
  max-width: 500px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
}

.modal-pequeno {
  max-width: 400px;
  padding: 20px;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 20px 15px 20px;
  border-bottom: 1px solid #eee;
}

.modal-header h3 {
  margin: 0;
  color: #25065f;
}

.btn-fechar-modal {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #999;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: background 0.2s;
}

.btn-fechar-modal:hover {
  background: #f5f5f5;
}

.reserva-detalhes {
  padding: 20px;
}

.detalhe-item {
  margin-bottom: 12px;
  padding: 8px 12px;
  background: #f8f9fa;
  border-radius: 6px;
  border-left: 4px solid #25065f;
}

.detalhe-item strong {
  color: #25065f;
  margin-right: 8px;
}

.modal-acoes {
  display: flex;
  gap: 10px;
  padding: 15px 20px 20px 20px;
  justify-content: flex-end;
  border-top: 1px solid #eee;
}

.btn-editar {
  background: #2196f3;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
}

.btn-excluir {
  background: #f44336;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
}

.btn-confirmar {
  background: #f44336;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  cursor: pointer;
}

.btn-cancelar {
  background: #6c757d;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
}

.btn-editar:hover {
  background: #1976d2;
}

.btn-excluir:hover,
.btn-confirmar:hover {
  background: #d32f2f;
}

.btn-cancelar:hover {
  background: #5a6268;
}
</style>