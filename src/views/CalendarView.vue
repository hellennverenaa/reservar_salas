<template>
  <div class="calendar-view">
    <h2>Agenda de Reservas</h2>
    <FullCalendar
      :options="calendarOptions"
      style="max-width: 900px; margin: 0 auto; background: #535151; border-radius: 8px; box-shadow: 0 2px 8px #0001;"
    />
  </div> 
</template>

<script>
import FullCalendar from '@fullcalendar/vue3';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

export default {
  name: 'CalendarView',
  components: { FullCalendar },
  data() {
    return {
      calendarOptions: {
        plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
        initialView: 'dayGridMonth',
        headerToolbar: {
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        events: this.getReservas(),
        locale: 'pt-br',
        selectable: true,
        selectMirror: true,
        select: this.handleDateSelect,
        eventClick: this.handleEventClick,
      }
    }
  },
  mounted() {
    this.atualizarEventos();
    window.addEventListener('storage', this.atualizarEventos);
  },
  beforeUnmount() {
    window.removeEventListener('storage', this.atualizarEventos);
  },
  methods: {
    getReservas() {
      const reservas = JSON.parse(localStorage.getItem('reservas') || '[]');
      // Converte reservas para eventos do FullCalendar
      return reservas.map(r => ({
        title: `${r.sala} - ${r.responsavel}`,
        start: `${r.data}T${r.hora}`,
        end: r.horaFim ? `${r.data}T${r.horaFim}` : undefined,
        allDay: false,
        extendedProps: {
          participantes: r.participantes,
          quantidade: r.quantidade
        }
      }));
    },
    atualizarEventos() {
      // Força atualização do calendário
      this.calendarOptions = {
        ...this.calendarOptions,
        events: this.getReservas()
      };
    },
    handleDateSelect(info) {
      // Apenas exibe a data selecionada
      alert(`Selecionado: ${info.startStr}`);
    },
    handleEventClick(info) {
      const participantes = info.event.extendedProps.participantes;
      const quantidade = info.event.extendedProps.quantidade;
      let msg = `Reserva: ${info.event.title}\n`;
      if (quantidade) msg += `Pessoas: ${quantidade}\n`;
      if (participantes) msg += `Participantes: ${participantes}`;
      alert(msg);
    }
  }
}
</script>

<style scoped>
.calendar-view {
  padding: 32px 0;
  min-height: 80vh;
  background: #535151;
}
.calendar-view h2 {
  text-align: center;
  margin-bottom: 24px;
}
</style>
