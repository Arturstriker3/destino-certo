import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home/HomeView.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/Dashboard',
    name: 'Dashboard',
    component: () => import('../views/Dashboard/DashboardView.vue')
  },
  {
    path: '/Clientes',
    name: 'Clientes',
    component: () => import('../views/Clientes/ClientesView.vue')
  }
  
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;