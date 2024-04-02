import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../stores/piniaStore';

const routes = [
  {
    path: '/',
    name: 'Autentication',
    component: () => import('../views/Autentication/AutenticationView.vue'),
    meta: { requiresGuest: true }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register/RegisterView.vue'),
    meta: { requiresGuest: true }
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('../views/Dashboard/DashboardView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/newPerson',
    name: 'newPersonForm',
    component: () => import('../views/Person Form/newPersonView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/newVehicle',
    name: 'newVehicleForm',
    component: () => import('../views/Vehicle Form/newVehicleView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/newTravel',
    name: 'newTravelForm',
    component: () => import('../views/Travel Form/newTravelView.vue'),
    meta: { requiresAuth: true }
  },
  
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// Guarda de navegação para verificar se o usuário está autenticado ou não
router.beforeEach((to, from, next) => {
  const auth = useAuthStore();
  if (to.meta.requiresAuth && !auth.token) {
    // Se a rota requer autenticação e não há token, redireciona para a página de login
    console.log('Você não está autenticado');
    next({ name: 'Autentication' });
  } else if (to.meta.requiresGuest && auth.token) {
    // Se a rota requer um usuário não autenticado e há um token, redireciona para o dashboard
    console.log('Você já está autenticado');
    next({ name: 'dashboard' });
  } else {
    // Caso contrário, permite o acesso à rota
    next();
  }
});

export default router;