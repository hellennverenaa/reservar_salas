<template>
  <div class="min-h-screen relative overflow-hidden bg-white">
    <!-- Background com mais vermelho e preto -->
    <div class="absolute top-0 right-0 w-[500px] h-[800px] bg-red-700/30 rounded-full blur-3xl animate-pulse" />
    <div class="absolute bottom-0 left-0 w-[500px] h-[500px] bg-black/20 rounded-full blur-3xl animate-pulse"
      style="animation-delay: 1s" />
    <div class="absolute top-1/3 left-1/3 w-[400px] h-[400px] bg-red-700/15 rounded-full blur-3xl animate-pulse"
      style="animation-delay: 2s" />
    <div class="absolute bottom-1/3 right-1/3 w-[300px] h-[800px] bg-gray-900/10 rounded-full blur-3xl animate-pulse"
      style="animation-delay: 3s" />

    <div class="relative z-10 flex justify-between items-center p-6">
      <div class="flex items-center space-x-2">
        <CalendarIcon class="w-8 h-8 text-red-600" />
        <span class="text-xl font-bold text-black">Sistema de Reservas DASS</span>
      </div>

      <!-- Navegação se estiver em outra página -->
      <div v-if="paginaAtual !== 'home'" class="flex items-center space-x-4">
        <button @click="voltarHome"
          class="flex items-center space-x-2  py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors duration-200">
          <ArrowLeftIcon class="w-4 h-4" />
          <span>Voltar</span>
        </button>

        <div class="text-sm text-gray-600">
          {{ titulosPagina[paginaAtual] }}
        </div>
      </div>
    </div>

    <!-- Home Page -->
    <div v-if="paginaAtual === 'home'"
      class="relative z-7 flex items-center justify-center min-h-screen p-0 fade-in-up">
      <div class="text-center max-w-7xl mx-auto">
        <!-- Hero Section com mais preto e vermelho -->
        <div class="mb-0 space-y-6">
          <div class="flex justify-center -mt-1">
            <div class="relative group">
              <div
                class="bg-white p-10 rounded-3xl shadow-2xl border-2 border-red-600/20 backdrop-blur-sm transform transition-all duration-700 group-hover:scale-110 group-hover:rotate-3 hover:shadow-red-600/25 hover:border-red-600/40">
                <CalendarIcon class="w-14 h-14 text-black animate-pulse" />
              </div>
              <!-- Elementos decorativos vermelhos e pretos -->
              <div class="absolute -top-4 -right-9 w-8 h-8 bg-red-600 rounded-full animate-bounce shadow-lg"></div>
              <div class="absolute -bottom-3 -left-3 w-6 h-6 bg-black rounded-full animate-ping shadow-lg"></div>
              <div class="absolute top-1/2 -left-6 w-4 h-4 bg-red-700 rounded-full animate-pulse"></div>
              <div class="absolute top-1/4 -right-4 w-3 h-3 bg-gray-800 rounded-full animate-bounce"
                style="animation-delay: 0.5s"></div>
            </div>
          </div>

          <div class="space-y-2 mb-2">
            <h1 class="text-black max-w-5xl mx-auto leading-tight text-4xl font-black">
              Reserve Salas de Reunião com
              <span class="text-red-600 ml-1 font-regular">
                Excelência
              </span>
            </h1>
            <p class="text-gray-700 max-w-xl mx-auto leading-relaxed text-1xl">
              🏢 Gerencie reservas de salas de forma profissional e eficiente.
              ⚡ Sistema empresarial robusto para controle total de recursos.
            </p>
          </div>

          <!-- Botões Principais -->
          <div class="flex flex-col sm:flex-row gap-3 justify-center items-center mb-16">
            <!-- CTA Button Nova Reserva - Preto que fica Vermelho -->
            <button @click="irParaReserva"
              class="group relative px-9 py-6 text-xl rounded-3xl shadow-6xl transition-all duration-500 hover:scale-110 bg-black hover:bg-red-600 border-0 hover:shadow-red-600/25 overflow-hidden text-white font-bold">
              <!-- Efeito shimmer -->
              <div
                class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000">
              </div>

              <div class="relative flex items-center justify-center">
                <PlusIcon class="w-2 h-6 mr-1 group-hover:rotate-12 transition-transform duration-300" />
                Nova Reserva
              </div>

              <!-- Partículas decorativas -->
              <div class="absolute top-2 left-4 w-2 h-2 bg-white/60 rounded-full animate-ping"></div>
              <div class="absolute bottom-2 right-6 w-1.5 h-1.5 bg-white/60 rounded-full animate-ping"
                style="animation-delay: 0.5s"></div>
              <div class="absolute top-1/2 right-4 w-1 h-1 bg-white/60 rounded-full animate-pulse"
                style="animation-delay: 1s"></div>
            </button>

            <!-- Botão Ver Calendário - Vermelho que fica Preto -->
            <button @click="irParaCalendario"
              class="group relative px-9 py-6 text-xl rounded-3xl shadow-2xl transition-all duration-500 hover:scale-110 bg-red-600 hover:bg-black border-0 hover:shadow-black/25 overflow-hidden text-white font-bold">
              <!-- Efeito shimmer -->
              <div
                class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000">
              </div>

              <div class="relative flex items-center justify-center">
                <CalendarIcon class="w-6 h-6 mr-3 group-hover:rotate-12 transition-transform duration-300" />
                Ver Calendário
              </div>

              <!-- Partículas decorativas -->
              <div class="absolute top-2 left-4 w-2 h-2 bg-white/60 rounded-full animate-ping"></div>
              <div class="absolute bottom-2 right-6 w-1.5 h-1.5 bg-white/60 rounded-full animate-ping"
                style="animation-delay: 0.5s"></div>
              <div class="absolute top-1/2 right-4 w-1 h-1 bg-white/60 rounded-full animate-pulse"
                style="animation-delay: 1s"></div>
            </button>
          </div>
        </div>

        <!-- Feature Cards com mais vermelho e preto -->
        <div class="flex justify-center mb-2 sm:-mt-12">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 px-6 md:px-0 max-w-5xl w-full">
            <div
              class="group bg-white items-start pt-2 backdrop-blur-sm p-6 rounded-xl shadow-lg border-2 border-red-800/20 hover:border-red-600/30 transition-all duration-700 hover:scale-105 hover:-translate-y-2 hover:rotate-1">

              <div
                class="bg-red-600 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:bg-red-700 transition-all duration-500 shadow-md group-hover:scale-105 group-hover:rotate-6">
                <CalendarIcon class="w-6 h-6 text-white" />
              </div>

              <h3 class="text-black mb-3 text-base font-bold">📅 Agenda Integrada</h3>
              <p class="text-gray-700 leading-tight text-sm">
                Visualize disponibilidade em tempo real com nosso calendário profissional
              </p>
            </div>
                
            <div
              class="group bg-white items-start pt-2 backdrop-blur-sm p-6 rounded-xl shadow-lg border-2 border-black/20 hover:border-black/30 transition-all duration-700 hover:scale-105 hover:-translate-y-2 hover:-rotate-1"
              style="animation-delay: 0.2s">
              <div
                class="bg-black w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:bg-gray-800 transition-all duration-500 shadow-md group-hover:scale-105 group-hover:-rotate-6">
                <ClockIcon class="w-6 h-6 text-white" />
              </div>
              <h3 class="text-black mb-3 text-base font-bold">⚡ Reserva Rápida</h3>
              <p class="text-gray-700 leading-tight text-sm">
                Agende reuniões em poucos cliques com nosso sistema eficiente
              </p>
            </div>
          
            <div
              class="group bg-white items-start pt-2 backdrop-blur-sm p-6 rounded-xl shadow-lg border-2 border-red-700/20 hover:border-red-700/30 transition-all duration-700 hover:scale-105 hover:-translate-y-2 hover:rotate-1"
              style="animation-delay: 0.4s">
              <div
                class="bg-red-700 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:bg-red-800 transition-all duration-500 shadow-md group-hover:scale-105 group-hover:rotate-6">
                <UsersIcon class="w-6 h-6 text-white" />
              </div>
              <h3 class="text-black mb-3 text-base font-bold">👥 Controle Total</h3>
              <p class="text-gray-700 leading-tight text-sm">
                Gestão completa de participantes e recursos corporativos
              </p>
            </div>
          </div>
        </div>

        <!-- Additional Features com cores sólidas -->
        <div class="grid grid-cols-2 md:grid-cols-3 gap-6 text-center">
          <div
            class="flex items-center justify-center space-x-3 text-gray-700 hover:text-red-600 transition-colors duration-300 group p-4 rounded-2xl hover:bg-red-50">
            <MapPinIcon class="w-5 h-5 group-hover:text-red-600 group-hover:scale-125 transition-all duration-300" />
            <span class="font-semibold">🏢 11 Salas Disponíveis</span>
          </div>
          <div
            class="flex items-center justify-center space-x-3 text-gray-700 hover:text-black transition-colors duration-300 group p-4 rounded-2xl hover:bg-gray-50">
            <DatabaseIcon class="w-5 h-5 group-hover:text-black group-hover:scale-125 transition-all duration-300" />
            <span class="font-semibold">💾 Dados Salvos Localmente</span>
          </div>
          <div
            class="flex items-center justify-center space-x-3 text-gray-700 hover:text-red-700 transition-colors duration-300 group p-4 rounded-2xl hover:bg-red-50">
            <ShieldIcon class="w-5 h-5 group-hover:text-red-700 group-hover:scale-125 transition-all duration-300" />
            <span class="font-semibold">🛡️ 100% Seguro</span>
          </div>
        </div>
      </div>
    </div>



    <!-- Notificação de Sucesso -->
    <div v-if="mostrarNotificacao"
      class="fixed top-4 right-4 z-50 bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg transform transition-all duration-500"
      :class="{ 'translate-x-full opacity-0': !mostrarNotificacao }">
      <div class="flex items-center space-x-2">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
        </svg>
        <span>{{ mensagemNotificacao }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import {
  Calendar as CalendarIcon,
  Clock as ClockIcon,
  Users as UsersIcon,
  MapPin as MapPinIcon,
  Shield as ShieldIcon,
  Plus as PlusIcon,
  Database as DatabaseIcon,
  ArrowLeft as ArrowLeftIcon
} from 'lucide-vue-next'

const router = useRouter()

import ReservaView from "./ReservaView.vue"

// Estados da aplicação
const paginaAtual = ref('home')
const mostrarNotificacao = ref(false)
const mensagemNotificacao = ref('')

// Títulos das páginas
const titulosPagina = {
  home: 'Página Inicial',
  reserva: 'Nova Reserva',
  calendario: 'Calendário de Reservas'
}

// Métodos de navegação
const irParaReserva = () => {
  router.push("reserva-sala")
}

const irParaCalendario = () => {
  paginaAtual.value = 'calendario'
}

const voltarHome = () => {
  paginaAtual.value = 'home'
}

// Método para lidar com reserva criada
const aoReservaCriada = (dadosReserva) => {
  mensagemNotificacao.value = `Reserva criada com sucesso para ${dadosReserva.sala}!`
  mostrarNotificacao.value = true

  // Esconder notificação após 3 segundos
  setTimeout(() => {
    mostrarNotificacao.value = false
  }, 3000)

  // Voltar para home após um pequeno delay
  setTimeout(() => {
    voltarHome()
  }, 1500)
}

// Escutar eventos de navegação dos componentes filhos
const handleNavigation = (pagina) => {
  paginaAtual.value = pagina
}
</script>

<style scoped>
/* Animações personalizadas */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-in-up {
  animation: fadeInUp 0.6s ease-out;
}

/* Transições suaves entre páginas */
.page-transition {
  transition: all 0.3s ease-in-out;
}

/* Efeito de hover nos cards */
.card-hover {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.card-hover:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 25px 50px -2px rgba(135, 91, 91, 0.25);
}
</style>