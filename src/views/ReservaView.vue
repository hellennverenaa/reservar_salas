<template>
  <div class="reserva-view">
    <div class="reserva-card">
      <h2>Reserve sua Sala</h2>

      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="responsavel">Responsável</label>
          <input v-model="form.responsavel" id="responsavel" required placeholder="Nome do responsável" />
        </div>
        <div class="form-group">
          <label for="Qual">Qual será o tipo de evento/atividade? (Reunião, treinamento, apresentação, entrevista,
            etc.)</label>
          <input v-model="form.tipoevento" id="tipoevento" required placeholder="Título" />
        </div>
        <div class="form-group">
          <label for="data">Data</label>
          <input v-model="form.data" id="data" type="date" required />
        </div>

        <div class="form-group">
          <label for="horaInicio">Hora de Início</label>
          <input v-model="form.horaInicio" id="horaInicio" type="time" required />
        </div>

        <div class="form-group">
          <label for="horaFinal">Hora Final</label>
          <input v-model="form.horaFinal" id="horaFinal" type="time" required />
        </div>

        <div class="form-group">

          <label for="participantes">Quem serão os participantes?</label>
          <select v-model="form.participantes" id="participantes" required>
            <option disabled value="">Selecione os participantes</option>
            <option v-for="participante in participantesList" :key="participante" :value="participante">
              {{ participante }}
            </option>
          </select>
        </div>
        <div class="form-group">
          <label for="quantidade">Número de Participantes</label>
          <input v-model.number="form.quantidade" id="quantidade" type="number" min="1" required />
        </div>

        <div class="form-group">
          <label for="sala">Sala</label>
          <select v-model="form.sala" id="sala" required>
            <option disabled value="">Selecione uma sala</option>
            <option v-for="sala in salas" :key="sala" :value="sala">{{ sala }}</option>
          </select>
        </div>

        <div class="form-group">
          <label for="cafe">Deseja Café?</label>
          <select v-model="form.cafe" id="cafe" required>
            <option disabled value="">Selecione</option>
            <option v-for="opcao in cafeOpcoes" :key="opcao" :value="opcao">{{ opcao }}</option>
          </select>
        </div>

        <button class="btn-reservar" type="submit" :disabled="carregando">
          {{ carregando ? 'Salvando...' : 'Reservar' }}
        </button>
      </form>

      <div v-if="mensagem" :class="['mensagem', tipoMensagem]">
        {{ mensagem }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ReservaView',
  data() {
    return {
      form: {
        responsavel: '',
        tipoevento: '',
        data: '',
        horaInicio: '',
        horaFinal: '',
        participantes: '',
        quantidade: 1,
        sala: '',
        cafe: ''
      },
      salas: [
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
      ],
      participantesList: [
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
      ],
      cafeOpcoes: [
        'Sim',
        'Não'
      ],
      reservas: [
        {
          "responsavel": "Ana Souza",
          "tipoevento": "Treinamento",
          "data": "2025-08-20",
          "horaInicio": "09:00",
          "horaFinal": "12:00",
          "participantes": "Equipe de Vendas",
          "quantidade": 15,
          "sala": "Sala Paixão",
          "cafe": "Sim"
        },
        {
          "responsavel": "Carlos Lima",
          "tipoevento": "Reunião de Diretoria",
          "data": "2025-08-21",
          "horaInicio": "14:00",
          "horaFinal": "16:00",
          "participantes": "Diretoria Executiva",
          "quantidade": 8,
          "sala": "Auditório F1",
          "cafe": "Não"
        },
        {
          "responsavel": "Fernanda Oliveira",
          "tipoevento": "Workshop de Inovação",
          "data": "2025-08-22",
          "horaInicio": "10:30",
          "horaFinal": "13:30",
          "participantes": "TI + Marketing",
          "quantidade": 25,
          "sala": "Auditório F2",
          "cafe": "Sim"
        },
        {
          "responsavel": "Ricardo Martins",
          "tipoevento": "Apresentação de Projeto",
          "data": "2025-08-23",
          "horaInicio": "15:00",
          "horaFinal": "17:00",
          "participantes": "Equipe de Desenvolvimento",
          "quantidade": 12,
          "sala": "Respeito",
          "cafe": "Não"
        },
        {
          "responsavel": "Juliana Costa",
          "tipoevento": "Palestra Motivacional",
          "data": "2025-08-24",
          "horaInicio": "08:00",
          "horaFinal": "11:00",
          "participantes": "Todos os Colaboradores",
          "quantidade": 50,
          "sala": "Auditório F3",
          "cafe": "Sim"
        }
      ],
      mensagem: '',
      tipoMensagem: 'sucesso',
      carregando: false
    }
  },

  methods: {
    handleSubmit() {
      console.log('Iniciando handleSubmit...');

      try {
        if (!this.validarFormulario()) {
          console.log('Validação falhou');
          return;
        }
        console.log('Validação passou');

        this.carregando = true;

        const dadosParaSalvar = {
          id: Date.now().toString(),
          ...this.form,
          criadoEm: new Date().toISOString()
        };

        console.log('Dados que seriam salvos:', dadosParaSalvar);

        // Por enquanto, vamos apenas simular o sucesso
        // setTimeout(() => {
        //   this.mostrarMensagem(
        //     `Reserva feita para ${this.form.sala} em ${this.formatarData(this.form.data)}!`,
        //     'sucesso'
        //   );
        //   this.limparFormulario();
        //   this.carregando = false;
        // }, 1000);

      } catch (error) {
        console.error('Erro capturado no handleSubmit:', error);
        this.mostrarMensagem('Erro: ' + error.message, 'erro');
        this.carregando = false;
      }
    },

    validarFormulario() {
      console.log('Iniciando validação...');

      try {
        const camposObrigatorios = ['responsavel', 'tipoevento', 'data', 'horaInicio', 'horaFinal', 'sala'];

        for (let campo of camposObrigatorios) {
          if (!this.form[campo]) {
            this.mostrarMensagem(`Campo obrigatório não preenchido: ${campo}`, 'erro');
            console.log(`Campo vazio: ${campo}`);
            return false;
          }
        }

        if (this.form.horaFinal <= this.form.horaInicio) {
          this.mostrarMensagem('Hora final deve ser maior que hora inicial!', 'erro');
          console.log('Erro de validação: horário inválido');
          return false;
        }

        console.log('Validação OK');
        return true;

      } catch (error) {
        console.error('Erro na validação:', error);
        return false;
      }
    },

    mostrarMensagem(texto, tipo = 'sucesso') {
      console.log(`Mostrando mensagem (${tipo}): ${texto}`);

      try {
        this.mensagem = texto;
        this.tipoMensagem = tipo;
        setTimeout(() => {
          this.mensagem = '';
          console.log('Mensagem limpa');
        }, 5000);
      } catch (error) {
        console.error('Erro ao mostrar mensagem:', error);
      }
    },

    limparFormulario() {
      this.form = {
        responsavel: '',
        tipoevento: '',
        data: '',
        horaInicio: '',
        horaFinal: '',
        participantes: '',
        quantidade: 1,
        sala: '',
        cafe: ''
      };
    },

    formatarData(data) {
      return new Date(data + 'T00:00:00').toLocaleDateString('pt-BR');
    }
  }


}

</script>

<style scoped>
.reserva-view {
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(120deg, #6d3acb 0%, #2a135b 100%);
}

.reserva-card {
  background: #fff;
  padding: 40px 32px 32px 32px;
  border-radius: 16px;
  box-shadow: 0 4px 24px #0002;
  min-width: 340px;
  max-width: 400px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.reserva-card h2 {
  margin-bottom: 24px;
  color: #362d8b;
}

.form-group {
  width: 100%;
  margin-bottom: 18px;
  display: flex;
  flex-direction: column;
}

.form-group label {
  margin-bottom: 6px;
  font-weight: 500;
  color: #333;
}

.form-group input,
.form-group select {
  padding: 10px 12px;
  border: 1px solid #d0d0d0;
  border-radius: 6px;
  font-size: 1rem;
  outline: none;
  transition: border 0.2s;
}

.form-group input:focus,
.form-group select:focus {
  border: 1.5px solid #25065f;
}

.btn-reservar {
  width: 100%;
  padding: 12px;
  background: #25065f;
  color: #fff;
  border: none;
  border-radius: 6px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  margin-top: 10px;
  transition: background 0.2s;
}

.btn-reservar:hover {
  background: #14165f;
}

.btn-reservar:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.mensagem {
  margin-top: 18px;
  font-weight: 600;
  text-align: center;
  padding: 10px;
  border-radius: 4px;
}

.mensagem.erro {
  color: #d32f2f;
  background-color: #ffebee;
  border-left: 4px solid #d32f2f;
}

.mensagem.sucesso {
  color: #2e7d32;
  background-color: #e8f5e8;
  border-left: 4px solid #2e7d32;
}
</style>