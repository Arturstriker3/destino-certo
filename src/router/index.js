import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'Autentication',
    component: () => import('../views/Autentication/AutenticationView.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register/RegisterView.vue')
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('../views/Dashboard/DashboardView.vue')
  },
  {
    path: '/newPassenger',
    name: 'newPassengerForm',
    component: () => import('../views/Passenger Form/newPassengerView.vue')
  },
  {
    path: '/newDriver',
    name: 'newDriverForm',
    component: () => import('../views/Driver Form/newDriverView.vue')
  },
  {
    path: '/newVehicle',
    name: 'newVehicleForm',
    component: () => import('../views/Vehicle Form/newVehicleView.vue')
  },
  {
    path: '/newTravel',
    name: 'newTravelForm',
    component: () => import('../views/Travel Form/newTravelView.vue')
  },
  
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;