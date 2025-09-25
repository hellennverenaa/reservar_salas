<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

    <!-- Header -->
    <div class="text-center mb-10">
      <div class="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
        <Coffee class="w-8 h-8 text-white" />
      </div>
      <h2 class="text-3xl font-semibold mb-2">Painel de Controle</h2>
      <p class="text-gray-600">Gestão e coordenação do serviço de Coffee Break</p>
    </div>

    <!-- Status Overview -->
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      <div v-for="(count, status) in statusCounts" :key="status" class="bg-white shadow-md rounded-xl p-5 flex flex-col items-center justify-center">
        <div :class="['text-2xl font-semibold mb-1', statusColors[status]]">{{ count }}</div>
        <div class="text-sm text-gray-600">{{ statusLabels[status] }}</div>
      </div>
    </div>

    <!-- Tabs -->
    <div>
      <div class="flex border-b border-gray-200 mb-6">
        <button
          @click="activeTab = 'agenda'"
          :class="['px-4 py-2 font-medium', activeTab === 'agenda' ? 'border-b-2 border-red-600 text-red-600' : 'text-gray-500']"
        >
          <CalendarIcon class="w-4 h-4 inline mr-1" /> Agenda do Dia
        </button>
        <button
          @click="activeTab = 'historico'"
          :class="['px-4 py-2 font-medium', activeTab === 'historico' ? 'border-b-2 border-red-600 text-red-600' : 'text-gray-500']"
        >
          <HistoryIcon class="w-4 h-4 inline mr-1" /> Histórico
        </button>
      </div>

      <!-- Agenda Tab -->
      <div v-show="activeTab === 'agenda'" class="space-y-6">
        <!-- Filtros -->
        <div class="bg-white shadow-md rounded-xl p-4 flex flex-col sm:flex-row gap-4">
          <div class="flex-1">
            <label class="text-sm font-medium block mb-1">Data</label>
            <input type="date" v-model="filterDate" class="w-full border rounded-md px-3 py-2 focus:ring-1 focus:ring-red-600 focus:outline-none" />
          </div>
          <div class="flex-1">
            <label class="text-sm font-medium block mb-1">Status</label>
            <select v-model="filterStatus" class="w-full border rounded-md px-3 py-2 focus:ring-1 focus:ring-red-600 focus:outline-none">
              <option value="all">Todos os status</option>
              <option value="solicitado">Solicitado</option>
              <option value="confirmado">Confirmado</option>
              <option value="em-preparo">Em Preparo</option>
              <option value="entregue">Entregue</option>
              <option value="cancelado">Cancelado</option>
            </select>
          </div>
          <div class="flex-1">
            <label class="text-sm font-medium block mb-1">Tipo de Café</label>
            <select v-model="filterCoffeeType" class="w-full border rounded-md px-3 py-2 focus:ring-1 focus:ring-red-600 focus:outline-none">
              <option value="all">Todos os tipos</option>
              <option value="simples">Coffee Break Simples</option>
              <option value="completo">Coffee Break Completo</option>
              <option value="premium">Coffee Break Premium</option>
              <option value="saudavel">Coffee Break Saudável</option>
              <option value="cafe-apenas">Apenas Café</option>
              <option value="personalizado">Personalizado</option>
            </select>
          </div>
        </div>

        <!-- Lista de Pedidos -->
        <div>
          <h3 class="text-lg font-semibold mb-4">
            Pedidos para {{ formatDate(filterDate) }}
            <span class="text-gray-500 font-normal">({{ todayOrders.length }} pedidos)</span>
          </h3>

          <div v-if="todayOrders.length === 0" class="bg-white shadow-md rounded-xl p-10 text-center">
            <Coffee class="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p class="text-gray-600">Nenhum pedido encontrado para esta data</p>
          </div>

          <div v-else class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div v-for="order in todayOrders" :key="order.id" class="bg-white shadow-md rounded-xl overflow-hidden">
              
              <!-- Header do Card -->
              <div class="bg-gradient-to-r from-red-50 to-amber-50 px-6 py-4 border-b">
                <div class="flex justify-between items-start">
                  <div class="flex items-center gap-3">
                    <div :class="['w-12 h-12 rounded-full flex items-center justify-center', getCoffeeTypeColor(order.coffeeBreak?.tipo)]">
                      <Coffee class="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div class="font-bold text-gray-800 text-lg">{{ order.sala }}</div>
                      <div class="flex items-center text-sm text-gray-600 gap-1">
                        <UserIcon class="w-4 h-4" /> {{ order.responsavel }}
                      </div>
                    </div>
                  </div>
                  <span :class="['px-3 py-1 rounded-full text-xs font-semibold', statusBadgeColors[order.coffeeStatus]]">
                    {{ statusLabels[order.coffeeStatus] }}
                  </span>
                </div>
              </div>

              <!-- Corpo do Card -->
              <div class="p-6">
                <!-- Informações da Reunião -->
                <div class="grid grid-cols-2 gap-3 text-sm mb-4">
                  <div class="flex items-center gap-2">
                    <CalendarIcon class="w-4 h-4 text-gray-500" /> 
                    {{ formatDate(order.data) }}
                  </div>
                  <div class="flex items-center gap-2">
                    <ClockIcon class="w-4 h-4 text-gray-500" /> 
                    {{ order.horaInicio }} - {{ order.horaFinal }}
                  </div>
                  <div class="flex items-center gap-2">
                    <UsersIcon class="w-4 h-4 text-gray-500" /> 
                    {{ order.quantidade || 'N/A' }} pessoas
                  </div>
                  <div class="flex items-center gap-2">
                    <PackageIcon class="w-4 h-4 text-gray-500" /> 
                    {{ order.tipoevento }}
                  </div>
                </div>

                <!-- Informações do Coffee Break -->
                <div v-if="order.coffeeBreak" class="bg-amber-50 rounded-lg p-4 mb-4 border-l-4 border-amber-400">
                  <div class="flex items-center gap-2 mb-3">
                    <Coffee class="w-5 h-5 text-amber-600" />
                    <h4 class="font-semibold text-amber-800">Detalhes do Coffee Break</h4>
                  </div>
                  
                  <div class="grid grid-cols-1 gap-3 text-sm">
                    <div class="flex justify-between">
                      <span class="text-gray-600 font-medium">Tipo:</span>
                      <span class="text-gray-800 font-semibold">{{ order.coffeeBreak.tipoTexto }}</span>
                    </div>
                    
                    <div class="flex justify-between">
                      <span class="text-gray-600 font-medium">Horário:</span>
                      <span class="text-gray-800">{{ order.coffeeBreak.horario }}</span>
                    </div>
                    
                    <div v-if="order.coffeeBreak.observacoes && order.coffeeBreak.observacoes !== 'Nenhuma'" class="pt-2 border-t border-amber-200">
                      <span class="text-gray-600 font-medium block mb-1">Observações:</span>
                      <p class="text-gray-700 text-xs bg-white rounded px-2 py-1">{{ order.coffeeBreak.observacoes }}</p>
                    </div>
                  </div>
                </div>

                <!-- Observações Gerais -->
                <div v-if="order.observacoes" class="bg-gray-50 rounded-md p-3 mb-4">
                  <div class="flex items-start gap-2 text-sm text-gray-600">
                    <FileTextIcon class="w-4 h-4 mt-0.5" />
                    <div>
                      <span class="font-medium">Observações da reunião:</span>
                      <p class="mt-1">{{ order.observacoes }}</p>
                    </div>
                  </div>
                </div>

                <!-- Ações -->
                <div class="flex flex-col gap-2">
                  <div class="flex gap-2">
                    <button
                      v-if="nextStatus(order.coffeeStatus)"
                      @click="changeStatus(order.id, nextStatus(order.coffeeStatus))"
                      class="flex-1 bg-red-600 text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-red-700 transition flex items-center justify-center gap-2"
                    >
                      <component :is="getStatusIcon(nextStatus(order.coffeeStatus))" class="w-4 h-4" />
                      {{ nextStatusLabel(order.coffeeStatus) }}
                    </button>
                    
                    <button
                      v-if="order.coffeeStatus !== 'cancelado' && order.coffeeStatus !== 'entregue'"
                      @click="changeStatus(order.id, 'cancelado')"
                      class="flex-1 border border-red-600 text-red-600 py-2 px-4 rounded-md text-sm font-medium hover:bg-red-50 transition flex items-center justify-center gap-2"
                    >
                      <XIcon class="w-4 h-4" />
                      Cancelar
                    </button>
                  </div>
                  
                  <!-- Botão de detalhes -->
                  <button
                    @click="toggleDetails(order.id)"
                    class="w-full text-gray-500 hover:text-gray-700 py-1 text-xs font-medium transition flex items-center justify-center gap-1"
                  >
                    <EyeIcon class="w-3 h-3" />
                    {{ expandedOrders.includes(order.id) ? 'Menos detalhes' : 'Mais detalhes' }}
                  </button>
                </div>

                <!-- Detalhes Expandidos -->
                <div v-if="expandedOrders.includes(order.id)" class="mt-4 pt-4 border-t border-gray-200">
                  <div class="grid grid-cols-2 gap-4 text-xs text-gray-600">
                    <div>
                      <span class="font-medium">ID da Reserva:</span>
                      <p>#{{ order.id }}</p>
                    </div>
                    <div>
                      <span class="font-medium">Participantes:</span>
                      <p>{{ order.participantes || 'Não especificado' }}</p>
                    </div>
                    <div>
                      <span class="font-medium">Criado em:</span>
                      <p>{{ formatDateTime(order.id) }}</p>
                    </div>
                    <div>
                      <span class="font-medium">Café solicitado:</span>
                      <p>{{ order.cafe }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Histórico Tab -->
      <div v-show="activeTab === 'historico'" class="space-y-6">
        <div class="bg-white shadow-md rounded-xl p-6 space-y-6">
          <h3 class="font-semibold text-xl">Histórico de Coffee Breaks</h3>
          <p class="text-gray-500">Visualize o histórico completo de coffee breaks já realizados</p>

          <div class="grid grid-cols-1 sm:grid-cols-4 gap-4 bg-gradient-to-r from-gray-50 to-gray-100 p-6 rounded-lg">
            <div class="text-center">
              <div class="text-2xl font-bold text-gray-800">{{ historicalOrders.length }}</div>
              <div class="text-sm text-gray-600">Total de Pedidos</div>
            </div>
            <div class="text-center">
              <div class="text-2xl font-bold text-green-600">{{ historicalOrders.filter(o => o.coffeeStatus === 'entregue').length }}</div>
              <div class="text-sm text-gray-600">Entregues</div>
            </div>
            <div class="text-center">
              <div class="text-2xl font-bold text-blue-600">{{ totalParticipants }}</div>
              <div class="text-sm text-gray-600">Pessoas Atendidas</div>
            </div>
            <div class="text-center">
              <div class="text-2xl font-bold text-amber-600">{{ coffeeTypeStats.length }}</div>
              <div class="text-sm text-gray-600">Tipos Diferentes</div>
            </div>
          </div>

          <!-- Estatísticas por tipo de café -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div v-for="(stat, type) in coffeeTypeStats" :key="type" class="bg-white border rounded-lg p-4">
              <div class="flex items-center gap-3">
                <div :class="['w-10 h-10 rounded-full flex items-center justify-center', getCoffeeTypeColor(type)]">
                  <Coffee class="w-5 h-5 text-white" />
                </div>
                <div>
                  <div class="font-semibold text-gray-800">{{ getCoffeeTypeName(type) }}</div>
                  <div class="text-sm text-gray-600">{{ stat }} pedidos</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Lista do histórico -->
          <div v-if="historicalOrders.length > 0" class="space-y-4">
            <h4 class="font-semibold text-lg">Últimos Coffee Breaks</h4>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div v-for="order in historicalOrders.slice(0, 6)" :key="order.id" class="bg-white border rounded-lg p-4 hover:shadow-md transition">
                <div class="flex items-start justify-between">
                  <div>
                    <div class="font-semibold text-gray-800">{{ order.sala }}</div>
                    <div class="text-sm text-gray-600">{{ order.quantidade }} pessoas</div>
                    <div class="text-xs text-gray-500">{{ formatDate(order.data) }}</div>
                  </div>
                  <div class="text-right">
                    <div class="text-sm font-medium text-amber-600">{{ order.coffeeBreak?.tipoTexto || 'N/A' }}</div>
                    <span :class="['px-2 py-1 rounded-full text-xs', statusBadgeColors[order.coffeeStatus]]">
                      {{ statusLabels[order.coffeeStatus] }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import {
  Coffee,
  Calendar as CalendarIcon,
  Clock as ClockIcon,
  User as UserIcon,
  Users as UsersIcon,
  FileText as FileTextIcon,
  Package as PackageIcon,
  History as HistoryIcon,
  Eye as EyeIcon,
  X as XIcon,
  Check as CheckIcon,
  Play as PlayIcon,
  Truck as TruckIcon
} from 'lucide-vue-next';

// --- DADOS E CONFIGURAÇÕES ---

// Mapeia os valores internos dos status para textos amigáveis
const statusLabels = {
  solicitado: 'Solicitado',
  confirmado: 'Confirmado',
  'em-preparo': 'Em Preparo',
  entregue: 'Entregue',
  cancelado: 'Cancelado'
};

// Cores para os textos dos contadores
const statusColors = {
  solicitado: 'text-yellow-600',
  confirmado: 'text-blue-600',
  'em-preparo': 'text-purple-600',
  entregue: 'text-green-600',
  cancelado: 'text-red-600'
};

// Cores para os badges de status nos cards
const statusBadgeColors = {
  solicitado: 'bg-yellow-100 text-yellow-800',
  confirmado: 'bg-blue-100 text-blue-800',
  'em-preparo': 'bg-purple-100 text-purple-800',
  entregue: 'bg-green-100 text-green-800',
  cancelado: 'bg-red-100 text-red-800'
};

// --- ESTADO REATIVO DO COMPONENTE ---
const allOrders = ref([]);
const filterDate = ref(new Date().toISOString().split('T')[0]);
const filterStatus = ref('all');
const filterCoffeeType = ref('all');
const activeTab = ref('agenda');
const expandedOrders = ref([]);

// --- CARREGAMENTO E MANIPULAÇÃO DE DADOS ---

// Carrega e transforma os dados do localStorage quando o componente é montado
onMounted(() => {
  loadReservations();
  window.addEventListener('reserva-adicionada', loadReservations);
});

function loadReservations() {
  const reservas = JSON.parse(localStorage.getItem('reservas_salas') || '[]');
  
  allOrders.value = reservas
    // 1. Filtra apenas reservas que solicitaram café
    .filter(reserva => reserva.cafe === true)
    // 2. Mapeia e transforma os dados para o formato que o template espera
    .map(reserva => ({
      ...reserva,
      // Garante um status padrão, caso não exista
      coffeeStatus: reserva.coffeeStatus || 'solicitado',
      // Cria o objeto 'coffeeBreak' que o template usa, a partir de 'cafeDetalhes'
      coffeeBreak: {
        tipo: reserva.cafeDetalhes?.type?.value || 'personalizado',
        tipoTexto: reserva.cafeDetalhes?.type?.text || reserva.cafeDetalhes?.type || 'Não especificado',
        horario: reserva.horaInicio, // Você pode ajustar se tiver um campo de horário específico para o café
        observacoes: reserva.cafeDetalhes?.observation || 'Nenhuma'
      }
    }));
}

// --- PROPRIEDADES COMPUTADAS PARA FILTRAGEM E EXIBIÇÃO ---

// Filtra os pedidos para a "Agenda do Dia" com base nos filtros selecionados
const todayOrders = computed(() => {
  return allOrders.value
    .filter(order => {
      const dateMatch = order.data === filterDate.value;
      const statusMatch = filterStatus.value === 'all' || order.coffeeStatus === filterStatus.value;
      const typeMatch = filterCoffeeType.value === 'all' || order.coffeeBreak?.tipo === filterCoffeeType.value;
      return dateMatch && statusMatch && typeMatch;
    })
    .sort((a, b) => a.horaInicio.localeCompare(b.horaInicio)); // Ordena por horário
});

// Filtra os pedidos para o "Histórico" (pedidos de datas anteriores)
const historicalOrders = computed(() => {
    const today = new Date().toISOString().split('T')[0];
    return allOrders.value
        .filter(order => order.data < today)
        .sort((a, b) => new Date(b.data) - new Date(a.data)); // Ordena do mais recente para o mais antigo
});

// Calcula a contagem de pedidos para cada status na data selecionada
const statusCounts = computed(() => {
    const counts = { solicitado: 0, confirmado: 0, 'em-preparo': 0, entregue: 0 };
    todayOrders.value.forEach(order => {
        if (counts.hasOwnProperty(order.coffeeStatus)) {
            counts[order.coffeeStatus]++;
        }
    });
    return counts;
});

// Calcula o total de participantes atendidos no histórico
const totalParticipants = computed(() => 
  historicalOrders.value.reduce((acc, order) => acc + (parseInt(order.quantidade) || 0), 0)
);

// Calcula estatísticas de pedidos por tipo de café no histórico
const coffeeTypeStats = computed(() => {
  const stats = {};
  historicalOrders.value.forEach(order => {
    const tipo = order.coffeeBreak?.tipo;
    if (tipo) {
      stats[tipo] = (stats[tipo] || 0) + 1;
    }
  });
  return stats;
});

// --- FUNÇÕES DE LÓGICA E FORMATAÇÃO ---

// Formata a data para o padrão brasileiro (dd/mm/aaaa)
function formatDate(dateStr) {
  if (!dateStr) return '';
  const [year, month, day] = dateStr.split('-');
  return `${day}/${month}/${year}`;
}

// Formata o timestamp de criação da reserva
function formatDateTime(timestamp) {
  if (!timestamp) return '';
  return new Date(parseInt(timestamp)).toLocaleString('pt-BR');
}

// Retorna o próximo status na sequência lógica
function nextStatus(current) {
  const sequence = {
    solicitado: 'confirmado',
    confirmado: 'em-preparo',
    'em-preparo': 'entregue'
  };
  return sequence[current] || null;
}

// Retorna o texto para o botão de avançar status
function nextStatusLabel(current) {
  const labels = {
    solicitado: 'Confirmar Pedido',
    confirmado: 'Iniciar Preparo',
    'em-preparo': 'Marcar como Entregue'
  };
  return labels[current] || '';
}

// Retorna o ícone correspondente ao status
function getStatusIcon(status) {
  const icons = {
    confirmado: CheckIcon,
    'em-preparo': PlayIcon,
    entregue: TruckIcon
  };
  return icons[status] || CheckIcon;
}

// Funções para estilização dinâmica (cores e nomes)
function getCoffeeTypeColor(type) {
  const colors = {
    'cafe-simples': 'bg-amber-500',
    'lanche': 'bg-orange-600',
    'completo': 'bg-red-600',
    'personalizado': 'bg-purple-600'
  };
  return colors[type] || 'bg-gray-500';
}

function getCoffeeTypeName(type) {
    const names = {
    'cafe-simples': 'Café Simples',
    'lanche': 'Lanche',
    'completo': 'Completo',
    'personalizado': 'Personalizado'
  };
  return names[type] || type;
}

// --- AÇÕES DO USUÁRIO ---

// Altera o status de um pedido e salva a alteração no localStorage
function changeStatus(orderId, newStatus) {
  const order = allOrders.value.find(o => o.id === orderId);
  if (order) {
    order.coffeeStatus = newStatus;
    
    // Atualiza a informação no localStorage para persistir os dados
    const reservas = JSON.parse(localStorage.getItem('reservas_salas') || '[]');
    const reservaIndex = reservas.findIndex(r => r.id === orderId);
    if (reservaIndex !== -1) {
      reservas[reservaIndex].coffeeStatus = newStatus;
      localStorage.setItem('reservas_salas', JSON.stringify(reservas));
    }
  }
}

// Mostra ou esconde a seção de mais detalhes de um card
function toggleDetails(orderId) {
  const index = expandedOrders.value.indexOf(orderId);
  if (index > -1) {
    expandedOrders.value.splice(index, 1);
  } else {
    expandedOrders.value.push(orderId);
  }
}
</script>