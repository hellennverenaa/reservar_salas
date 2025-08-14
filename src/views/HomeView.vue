
<template>
  <div class="home-view">
    <div class="home-card">
      <h1>Bem-vindo! Reserve sua Sala</h1>
      <p>Organize suas reuniões e eventos de forma fácil e rápida.</p>
      <router-link to="/reserva">
        <button class="btn-reservar">Reserve sua sala</button>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
};
</script>

<style scoped>
.home-view {
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(120deg, #6d3acb 0%, #2a135b 100%);
}
.home-card {
  background: #fff;
  padding: 48px 36px 36px 36px;
  border-radius: 18px;
  box-shadow: 0 4px 24px #0002;
  min-width: 340px;
  max-width: 400px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.home-card h1 {
  margin-bottom: 18px;
  color: #362d8b;
  text-align: center;
}
.home-card p {
  margin-bottom: 28px;
  color: #454545;
  text-align: center;
  font-size: 1.1rem;
}
.btn-reservar {
  padding: 14px 36px;
  background: #1b0f74;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 1.15rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
  box-shadow: 0 2px 8px #0001;
}
.btn-reservar:hover {
  background: #130439;
}
</style>

