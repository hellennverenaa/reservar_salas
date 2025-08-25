<template>
  <div class="min-h-screen bg-gradient-to-br from-violet-100 via-pink-50 to-cyan-100 p-4">
    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <div class="flex items-center mb-8">
        <button 
          @click="$emit('back')"
          class="mr-4 px-4 py-2 rounded-xl bg-white/80 hover:bg-white transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl border border-white/30"
        >
          <ArrowLeft class="w-4 h-4 mr-2 inline" />
          Voltar
        </button>
        <div>
          <h1 class="text-foreground">Nova Reserva</h1>
          <p class="text-muted-foreground">Preencha os dados para reservar uma sala</p>
        </div>
      </div>

       <div class="grid grid-cols-1 xl:grid-cols-2 gap-8"></div>

       <!-- Formulário -->

         <div class="space-y-6">
          <div class="bg-gradient-to-br from-white/95 via-white/90 to-white/95 backdrop-blur-lg p-8 rounded-3xl shadow-2xl border border-white/30 hover:shadow-3xl transition-all duration-500">
            <div class="flex items-center mb-6">
              <div class="w-12 h-12 bg-gradient-to-r from-violet-500 to-pink-500 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                <Users class="w-6 h-6 text-white" />
              </div>
              <h2 class="text-xl font-semibold text-foreground">Dados da Reserva</h2>
            </div>
          </div>
         </div>

      <form @submit.prevent="handleSubmit" class="space-y-6">
   <!-- Responsável -->
   <div class="space-y-2">
   <div class="form-group">
      <label class="block text-sm font-medium text-foreground">Responsável</label>
        <div class="flex gap-3">
        <input 
        v-model="form.responsavel" id="responsavel" 
        required placeholder="Nome do responsável"
        class="flex-1 px-4 py-3 bg-gradient-to-r from-white/70 to-white/50 border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-300 backdrop-blur-sm"/>
        <button 
          type="button" 
          @click="handleBadgeRead"
          class="px-4 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105">
        <CreditCard class="w-4 h-4 mr-2 inline" />
          Bipar
        </button>
        </div>
        </div>
        </div>
       <!-- Tipo de Evento -->

        <div class="form-group">
          <div class="space-y-2"></div>
          <label class="block text-sm font-medium text-foreground">Qual será o tipo de evento/atividade? (Reunião, treinamento, apresentação, entrevista,
            etc.)</label>
            <textarea
            v-model="form.tipoevento" 
          id="tipoevento" required placeholder="Título" 
          rows="3"
          class="flex-1 px-3 bg-gradient-to-r from-white/70 to-white/50 border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-300 backdrop-blur-sm resize-none"
          ></textarea>
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

import { Camera } from 'lucide-vue-next';
export default {
  name: 'ReservaView',
  data() {
    return {
      form: {
        responsavel: 'hellen',
        tipoevento: 'festa',
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
    },

    handleSubmit() {
      console.log('Iniciando handleSubmit...');
      try {
        if (!this.validarFormulario()) {
          console.log('Validação falhou');
          return;
        }
        console.log('Validação passou');

        this.carregando = true;

        const chave = 'reservas_salas'
        const lista = JSON.parse(localStorage.getItem(chave) || '[]')

        const reserva = {
          ...this.form,
          criadoEm: new Date().toISOString()
        };

        if (!reserva.id) reserva.id = crypto.randomUUID();

        const idx = lista.findIndex(r => r.id === reserva.id);
        if (idx >= 0) {
          console.warn("Reserva ja existente, subtituindo...");

          lista[idx] = reserva;
        } else {
          lista.push(reserva);
        }

        localStorage.setItem(chave, JSON.stringify(lista));


        // avisa o calendário
        window.dispatchEvent(new CustomEvent('reserva-adicionada'));
      } catch (error) {
        console.error('Erro capturado no handleSubmit:', error);
        this.mostrarMensagem('Erro: ' + error.message, 'erro');
        this.carregando = false;
      }
    },
  },
}

</script>

<style scoped>
.reserva-view {
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(120deg, #d22d36 0%, #2a135b 100%);
}

.reserva-card {
  background: rgb(27, 27, 27)313;
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
  color: rgb(31, 30, 30)a0a;
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
  background-color: #181616;
  border-left: 4px solid #d32f2f;
}

.mensagem.sucesso {
  color: #2e7d32;
  background-color: rgb(14, 15, 14);
  border-left: 4px solid #2e7d32;
}
</style>