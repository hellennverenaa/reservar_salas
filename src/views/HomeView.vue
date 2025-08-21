<template>
  <div class="min-h-screen relative overflow-hidden bg-white">
    <div class="absolute top-0 right-0 w-[600px] h-[600px] bg-red-600/20 rounded-full blur-3xl animate-pulse" />
    <div class="absolute bottom-0 left-0 w-[500px] h-[500px] bg-black/15 rounded-full blur-3xl animate-pulse" :style="{animationDelay: '1s'}" />
    <div class="absolute top-1/3 left-1/3 w-[400px] h-[400px] bg-red-700/15 rounded-full blur-3xl animate-pulse" :style="{animationDelay: '2s'}" />
    <div class="absolute bottom-1/3 right-1/3 w-[300px] h-[300px] bg-gray-900/10 rounded-full blur-3xl animate-pulse" :style="{animationDelay: '3s'}" />
    
    <div class="relative z-10 flex items-center justify-center min-h-screen p-4">
      <div class="text-center max-w-4xl mx-auto">
        <div class="mb-16">
          <div class="flex justify-center mb-8">
            <div class="relative group">
              <div class="bg-white p-10 rounded-3xl shadow-2xl border-2 border-red-600/20 backdrop-blur-sm transform transition-all duration-700 group-hover:scale-110 group-hover:rotate-3 hover:shadow-red-600/25 hover:border-red-600/40">
                <Calendar class="w-24 h-24 text-black animate-pulse" />
              </div>
              <div class="absolute -top-3 -right-3 w-8 h-8 bg-red-600 rounded-full animate-bounce shadow-lg"></div>
              <div class="absolute -bottom-3 -left-3 w-6 h-6 bg-black rounded-full animate-ping shadow-lg"></div>
              <div class="absolute top-1/2 -left-6 w-4 h-4 bg-red-700 rounded-full animate-pulse"></div>
              <div class="absolute top-1/4 -right-4 w-3 h-3 bg-gray-800 rounded-full animate-bounce" :style="{animationDelay: '0.5s'}"></div>
            </div>
          </div>
          
          <div class="space-y-8 mb-16">
            <h1 class="text-black max-w-3xl mx-auto leading-tight">
              Reserve Salas de Reunião com 
              <span class="text-red-600 ml-3 font-bold">
                Excelência
              </span>
            </h1>
            <p class="text-gray-700 max-w-2xl mx-auto leading-relaxed text-xl">
              🏢 Gerencie reservas de salas de forma profissional e eficiente. 
              ⚡ Sistema empresarial robusto para controle total de recursos.
            </p>
          </div>

          <div class="mb-20">
            <Button 
              size="lg" 
              class="group relative px-20 py-10 text-2xl rounded-3xl shadow-2xl transition-all duration-500 hover:scale-110 bg-black hover:bg-red-600 border-0 hover:shadow-red-600/25 overflow-hidden text-white font-bold"
              @click="handleBookingStart"
            >
              <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
             <router-link to="/reserva">  
              <div class="relative flex items-center justify-center">
                <Calendar class="w-8 h-8 mr-4 group-hover:rotate-12 transition-transform duration-300" />
                Reserve sua sala
              </div>
              </router-link>
    
              <div class="absolute top-2 left-4 w-2 h-2 bg-white/60 rounded-full animate-ping"></div>
              <div class="absolute bottom-2 right-6 w-1.5 h-1.5 bg-white/60 rounded-full animate-ping" :style="{animationDelay: '0.5s'}"></div>
              <div class="absolute top-1/2 right-4 w-1 h-1 bg-white/60 rounded-full animate-pulse" :style="{animationDelay: '1s'}"></div>
            </Button>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-10 mb-16">
          <div class="group bg-white backdrop-blur-sm p-10 rounded-3xl shadow-2xl border-2 border-red-600/20 hover:border-red-600/40 hover:shadow-3xl transition-all duration-700 hover:scale-110 hover:-translate-y-6 hover:rotate-1">
            <div class="bg-red-600 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:bg-red-700 transition-all duration-500 shadow-xl group-hover:scale-110 group-hover:rotate-12">
              <Calendar class="w-10 h-10 text-white" />
            </div>
            <h3 class="text-black mb-4 text-xl font-bold">📅 Agenda Integrada</h3>
            <p class="text-gray-700 leading-relaxed text-lg">
              Visualize disponibilidade em tempo real com nosso calendário profissional
            </p>
          </div>

          <div class="group bg-white backdrop-blur-sm p-10 rounded-3xl shadow-2xl border-2 border-black/20 hover:border-black/40 hover:shadow-3xl transition-all duration-700 hover:scale-110 hover:-translate-y-6 hover:-rotate-1" :style="{animationDelay: '0.2s'}">
            <div class="bg-black w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:bg-gray-800 transition-all duration-500 shadow-xl group-hover:scale-110 group-hover:-rotate-12">
              <Clock class="w-10 h-10 text-white" />
            </div>
            <h3 class="text-black mb-4 text-xl font-bold">⚡ Reserva Rápida</h3>
            <p class="text-gray-700 leading-relaxed text-lg">
              Agende reuniões em poucos cliques com nosso sistema eficiente
            </p>
          </div>

          <div class="group bg-white backdrop-blur-sm p-10 rounded-3xl shadow-2xl border-2 border-red-700/20 hover:border-red-700/40 hover:shadow-3xl transition-all duration-700 hover:scale-110 hover:-translate-y-6 hover:rotate-1" :style="{animationDelay: '0.4s'}">
            <div class="bg-red-700 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:bg-red-800 transition-all duration-500 shadow-xl group-hover:scale-110 group-hover:rotate-12">
              <Users class="w-10 h-10 text-white" />
            </div>
            <h3 class="text-black mb-4 text-xl font-bold">👥 Controle Total</h3>
            <p class="text-gray-700 leading-relaxed text-lg">
              Gestão completa de participantes e recursos corporativos
            </p>
          </div>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-3 gap-6 text-center">
          <div class="flex items-center justify-center space-x-3 text-gray-700 hover:text-red-600 transition-colors duration-300 group p-4 rounded-2xl hover:bg-red-50">
            <MapPin class="w-5 h-5 group-hover:text-red-600 group-hover:scale-125 transition-all duration-300" />
            <span class="font-semibold">🏢 11 Salas Disponíveis</span>
          </div>
          <div class="flex items-center justify-center space-x-3 text-gray-700 hover:text-black transition-colors duration-300 group p-4 rounded-2xl hover:bg-gray-50">
            <Coffee class="w-5 h-5 group-hover:text-black group-hover:scale-125 transition-all duration-300" />
            <span class="font-semibold">☕ Serviços Executivos</span>
          </div>
          <div class="flex items-center justify-center space-x-3 text-gray-700 hover:text-red-700 transition-colors duration-300 group p-4 rounded-2xl hover:bg-red-50">
            <Shield class="w-5 h-5 group-hover:text-red-700 group-hover:scale-125 transition-all duration-300" />
            <span class="font-semibold">🛡️ 100% Seguro</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Calendar, Clock, Users, MapPin, Coffee, Shield } from "lucide-vue-next";
// Assumindo que você tenha um componente de botão. 
// Ajuste o caminho se necessário.


// Define os eventos que este componente pode emitir para o componente pai
const emit = defineEmits(['bookingStart']);

// Função que será chamada quando o botão for clicado
function handleBookingStart() {
  emit('bookingStart');
}
</script>

<style scoped>
/* Seu CSS continua igual e está correto */
.home-view {
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(120deg, #773a08 0%, #2a135b 100%);
}
.home-card {
  background: #fff;
  padding: 48px 36px 36px 36px;
  border-radius: 18px;
  box-shadow: 0 4px 24px rgba(192, 3, 3, 0.133);
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
  box-shadow: 0 2px 8px rgba(199, 25, 25, 0.067);
}
.btn-reservar:hover {
  background: #b91111;
}

</style>