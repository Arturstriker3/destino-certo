// piniaStore.js

import { defineStore } from 'pinia';

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    token: localStorage.getItem('token') || null, // Verifica se há um token armazenado no localStorage
  }),
  actions: {
    setToken(token) {
      this.token = token;
      localStorage.setItem('token', token); // Armazena o token no localStorage
    },
    clearToken() {
      this.token = null;
      localStorage.removeItem('token'); // Remove o token do localStorage
    },
  },
});