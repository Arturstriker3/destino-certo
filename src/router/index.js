import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home/HomeView.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  // Adicione outras rotas aqui conforme necessário
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;