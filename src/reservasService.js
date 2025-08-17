// services/reservasService.js
export const reservasService = {
  // Chave para armazenar no localStorage
  STORAGE_KEY: 'reservas_salas',

  // Buscar todas as reservas
  getReservas() {
    try {
      const reservas = localStorage.getItem(this.STORAGE_KEY);
      return reservas ? JSON.parse(reservas) : [];
    } catch (error) {
      console.error('Erro ao buscar reservas:', error);
      return [];
    }
  },

  // Salvar uma nova reserva
  salvarReserva(reserva) {
    try {
      const reservas = this.getReservas();
      
      
      const novaReserva = {
        ...reserva,
        id: this.gerarId(),
        criadoEm: new Date().toISOString()
      };

      reservas.push(novaReserva);
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(reservas));
      
      return { sucesso: true, reserva: novaReserva };
    } catch (error) {
      console.error('Erro ao salvar reserva:', error);
      return { sucesso: false, erro: error.message };
    }
  },

  // Verificar se sala está disponível
  verificarDisponibilidade(data, horaInicio, horaFinal, sala, idExcluir = null) {
    const reservas = this.getReservas();
    
    return !reservas.some(reserva => {
      if (reserva.id === idExcluir) return false; // Ignorar na edição
      if (reserva.data !== data || reserva.sala !== sala) return false;
      
      // Verificar sobreposição de horários
      return this.horariosSesobrepem(
        horaInicio, horaFinal,
        reserva.horaInicio, reserva.horaFinal
      );
    });
  },

  // Verificar sobreposição de horários
  horariosSesobrepem(inicio1, fim1, inicio2, fim2) {
    return inicio1 < fim2 && fim1 > inicio2;
  },

  // Buscar reservas por data
  getReservasPorData(data) {
    return this.getReservas().filter(reserva => reserva.data === data);
  },

  // Buscar reservas por mês (para o calendário)
  getReservasPorMes(ano, mes) {
    const reservas = this.getReservas();
    return reservas.filter(reserva => {
      const dataReserva = new Date(reserva.data);
      return dataReserva.getFullYear() === ano && dataReserva.getMonth() === mes - 1;
    });
  },

  // Deletar reserva
  deletarReserva(id) {
    try {
      const reservas = this.getReservas();
      const novasReservas = reservas.filter(reserva => reserva.id !== id);
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(novasReservas));
      return { sucesso: true };
    } catch (error) {
      return { sucesso: false, erro: error.message };
    }
  },

  
  gerarId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }
};