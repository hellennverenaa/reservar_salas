
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LiberarReserva from '@/views/LiberarReserva.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/reserva',
      name: 'reservar',
      component: () => import('../views/ReservaView.vue'),
    },
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/calendario',
      name: 'Calendario',
      component: () => import('../views/CalendarView.vue'),
    },
{
      path: '/LiberarReserva',
      name: 'LiberarReserva',
      component: () => import('../views/LiberarReserva.vue'),
    },

    
  ],
})

export default router
