<template>
  <div></div>
  <div class="reserva-view">
    <div class="reserva-card">
      <h2>Reserve sua Sala</h2>
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="responsavel">Responsável</label>
          <input v-model="form.responsavel" id="responsavel" required placeholder="Nome do responsável" />
        </div>
        <div class="form-group">
          <label for="data">Data</label>
          <input v-model="form.data" id="data" type="date" required />
        </div>
        <div class="form-group">
          <label for="hora">Hora</label>
          <input v-model="form.hora" id="hora" type="time" required />
        </div>
        <div class="form-group">
          <label for="quantidade">Quantidade de Pessoas</label>
          <input v-model.number="form.quantidade" id="quantidade" type="number" min="1" required />
        </div>
        <div class="form-group">
          <label for="sala">Sala</label>
          <select v-model="form.sala" id="sala" required>
            <option disabled value="">Selecione uma sala</option>
            <option v-for="sala in salas" :key="sala" :value="sala">{{ sala }}</option>
          </select>
        </div>
        <button class="btn-reservar" type="submit">Reservar</button>
      </form>
      <div v-if="mensagem" class="mensagem">{{ mensagem }}</div>
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
        data: '',
        hora: '',
        quantidade: 1,
        sala: ''
      },
      salas: ['Sala 1', 'Sala 2', 'Sala 3', 'Sala de Reunião'],
      mensagem: ''
    }
  },
  methods: {
    handleSubmit() {
      // Aqui você pode salvar a reserva em um backend ou localStorage
      this.mensagem = `Reserva feita para ${this.form.sala} em ${this.form.data} às ${this.form.hora}!`;
      // Limpa o formulário após reservar
      this.form = {
        responsavel: '',
        data: '',
        hora: '',
        quantidade: 1,
        sala: ''
      };
      setTimeout(() => this.mensagem = '', 4000);
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
.mensagem {
  margin-top: 18px;
  color: #150267;
  font-weight: 600;
  text-align: center;
}
</style>
