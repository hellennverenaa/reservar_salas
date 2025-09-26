import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/reserva",
      name: "reservar",
      component: () => import("../views/ReservaView.vue"),
    },
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/calendario",
      name: "Calendario",
      component: () => import("../views/CalendarView.vue"),
    },
    {
      path: "/LiberarCoffee",
      name: "LiberarCoffee",
      component: () => import("../views/LiberarCoffee.vue"),
    },
    {
      path: "/reserva-sala",
      name: "ReservaView",
      component: () => import("../views/ReservaView.vue"),
    },
  ],
});

export default router;
