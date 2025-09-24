<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

    <!-- Header -->
    <div class="text-center mb-10">
      <div class="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
        <CoffeeIcon class="w-8 h-8 text-white" />
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
        </div>

        <!-- Lista de Pedidos -->
        <div>
          <h3 class="text-lg font-semibold mb-4">
            Pedidos para {{ formatDate(filterDate) }}
            <span class="text-gray-500 font-normal">({{ todayOrders.length }} pedidos)</span>
          </h3>

          <div v-if="todayOrders.length === 0" class="bg-white shadow-md rounded-xl p-10 text-center">
            <CoffeeIcon class="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p class="text-gray-600">Nenhum pedido encontrado para esta data</p>
          </div>

          <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div v-for="order in todayOrders" :key="order.id" class="bg-white shadow-md rounded-xl p-4 flex flex-col justify-between">
              <!-- Header -->
              <div class="flex justify-between items-start mb-3">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                    <CoffeeIcon class="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <div class="font-semibold">{{ order.room }}</div>
                    <div class="flex items-center text-sm text-gray-500 gap-1">
                      <UserIcon class="w-3 h-3" /> {{ order.requester }}
                    </div>
                  </div>
                </div>
                <span :class="['px-2 py-1 rounded-full text-xs font-medium', statusBadgeColors[order.status]]">{{ order.status }}</span>
              </div>

              <!-- Info -->
              <div class="grid grid-cols-2 gap-3 text-sm mb-2">
                <div class="flex items-center gap-2"><CalendarIcon class="w-4 h-4 text-gray-500" /> {{ formatDate(order.date) }}</div>
                <div class="flex items-center gap-2"><ClockIcon class="w-4 h-4 text-gray-500" /> {{ order.startTime }} - {{ order.endTime }}</div>
                <div class="flex items-center gap-2"><UsersIcon class="w-4 h-4 text-gray-500" /> {{ order.participants }} pessoas</div>
                <div class="flex items-center gap-2"><PackageIcon class="w-4 h-4 text-gray-500" /> {{ order.serviceType }}</div>
              </div>

              <!-- Observações -->
              <div v-if="order.observations" class="bg-gray-50 rounded-md p-3 mb-2">
                <div class="flex items-start gap-2 text-sm text-gray-600">
                  <FileTextIcon class="w-4 h-4 mt-0.5" />
                  {{ order.observations }}
                </div>
              </div>

              <!-- Ações -->
              <div class="flex flex-wrap gap-2 mt-2">
                <button
                  v-if="nextStatus(order.status)"
                  @click="changeStatus(order.id, nextStatus(order.status))"
                  class="flex-1 bg-red-600 text-white py-1 px-3 rounded-md text-sm hover:bg-red-700 transition"
                >
                  {{ nextStatusLabel(order.status) }}
                </button>
                <button
                  v-if="order.status !== 'cancelado' && order.status !== 'entregue'"
                  @click="changeStatus(order.id, 'cancelado')"
                  class="flex-1 border border-red-600 text-red-600 py-1 px-3 rounded-md text-sm hover:bg-red-50 transition"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Histórico Tab -->
      <div v-show="activeTab === 'historico'" class="space-y-6">
        <div class="bg-white shadow-md rounded-xl p-4 space-y-4">
          <h3 class="font-semibold text-lg">Histórico de Pedidos</h3>
          <p class="text-gray-500 text-sm">Visualize o histórico completo de coffee breaks já realizados</p>

          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-gray-50 p-4 rounded-lg text-center">
            <div>
              <div class="text-xl font-semibold">{{ historicalOrders.length }}</div>
              <div class="text-sm text-gray-600">Total de Pedidos</div>
            </div>
            <div>
              <div class="text-xl font-semibold">{{ historicalOrders.filter(o => o.status === 'entregue').length }}</div>
              <div class="text-sm text-gray-600">Entregues</div>
            </div>
            <div>
              <div class="text-xl font-semibold">{{ totalParticipants }}</div>
              <div class="text-sm text-gray-600">Pessoas Atendidas</div>
            </div>
          </div>

          <div v-if="historicalOrders.length > 0" class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div v-for="order in historicalOrders.slice(0,6)" :key="order.id" class="bg-white shadow-md rounded-xl p-4">
              <div class="font-semibold">{{ order.room }} ({{ order.participants }} pessoas)</div>
              <div class="text-sm text-gray-500">{{ order.date }} - {{ order.serviceType }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import {
  Coffee as CoffeeIcon,
  Calendar as CalendarIcon,
  Clock as ClockIcon,
  User as UserIcon,
  Users as UsersIcon,
  FileText as FileTextIcon,
  Package as PackageIcon,
  History as HistoryIcon
} from 'lucide-vue-next';

const statusLabels = {
  solicitado: 'Solicitados',
  confirmado: 'Confirmados',
  'em-preparo': 'Em Preparo',
  entregue: 'Entregues',
  cancelado: 'Cancelados'
};

const statusColors = {
  solicitado: 'text-yellow-600',
  confirmado: 'text-blue-600',
  'em-preparo': 'text-purple-600',
  entregue: 'text-green-600',
  cancelado: 'text-red-600'
};

const statusBadgeColors = {
  solicitado: 'bg-yellow-100 text-yellow-800',
  confirmado: 'bg-blue-100 text-blue-800',
  'em-preparo': 'bg-purple-100 text-purple-800',
  entregue: 'bg-green-100 text-green-800',
  cancelado: 'bg-red-100 text-red-800'
};

const mockOrders = [
  { id: '1', date: '2025-01-23', startTime: '09:00', endTime: '10:30', room: 'Sala Paixão', requester: 'Maria Silva', participants: 8, serviceType: 'Café Simples', status: 'solicitado', observations: 'Sem açúcar, incluir chá' },
  { id: '2', date: '2025-01-23', startTime: '14:00', endTime: '16:00', room: 'Auditório F1', requester: 'João Santos', participants: 25, serviceType: 'Completo', status: 'confirmado', observations: 'Incluir opções vegetarianas' },
  { id: '3', date: '2025-01-23', startTime: '11:00', endTime: '12:00', room: 'Hoshin', requester: 'Ana Costa', participants: 6, serviceType: 'Lanche', status: 'em-preparo' },
  { id: '4', date: '2025-01-22', startTime: '15:30', endTime: '17:00', room: 'Auditório F2', requester: 'Pedro Lima', participants: 12, serviceType: 'Completo', status: 'entregue' }
];

const orders = ref(mockOrders);
const filterDate = ref(new Date().toISOString().split('T')[0]);
const filterStatus = ref('all');
const activeTab = ref('agenda');

const todayOrders = computed(() =>
  orders.value
    .filter(order => order.date === filterDate.value && (filterStatus.value === 'all' || order.status === filterStatus.value))
    .sort((a,b) => a.startTime.localeCompare(b.startTime))
);

const historicalOrders = computed(() => orders.value.filter(order => order.date < filterDate.value));

const statusCounts = computed(() => ({
  solicitado: orders.value.filter(o => o.status === 'solicitado' && o.date === filterDate.value).length,
  confirmado: orders.value.filter(o => o.status === 'confirmado' && o.date === filterDate.value).length,
  'em-preparo': orders.value.filter(o => o.status === 'em-preparo' && o.date === filterDate.value).length,
  entregue: orders.value.filter(o => o.status === 'entregue' && o.date === filterDate.value).length
}));

const totalParticipants = computed(() => historicalOrders.value.reduce((acc, order) => acc + order.participants, 0));

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('pt-BR');
}

function nextStatus(current) {
  const map = {
    solicitado: 'confirmado',
    confirmado: 'em-preparo',
    'em-preparo': 'entregue'
  };
  return map[current] || null;
}

function nextStatusLabel(current) {
  const map = {
    solicitado: 'Confirmar',
    confirmado: 'Iniciar Preparo',
    'em-preparo': 'Entregar'
  };
  return map[current] || '';
}

function changeStatus(id, status) {
  const order = orders.value.find(o => o.id === id);
  if (order) order.status = status;
}
</script>
