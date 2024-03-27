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
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;