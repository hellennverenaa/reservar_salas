
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/reserva',
      name: 'reserva',
      component: () => import('../views/ReservaView.vue'),
    },
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/calendario',
      name: 'calendario',
      component: () => import('../views/CalendarView.vue'),
    },

  ],
})

export default router
