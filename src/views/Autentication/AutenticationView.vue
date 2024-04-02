
<template>
    <section class="form-container">
        <div class="container">
            <header>Login</header>
            <form @submit.prevent="login" class="form">

                <div class="input-box">
                    <label>Usuário</label>
                    <input type="text" v-model="email" placeholder="Email" @blur="validateEmail" required>
                </div>

                <div class="input-box">
                    <label>Senha</label>
                    <input type="password" v-model="password" placeholder="Senha" ref="password" required>
                    <ion-icon name="eye" class="eye-icon" @click="togglePasswordVisibility"></ion-icon>
                </div>

                <div class="input-box-register" @click="goToRegister">
                    <label>Registrar-me</label>
                </div>

                <div class="btn-center">
                    <button type="submit" class="form-send">Acessar</button>
                </div>
            </form>
        </div>
    </section>
</template>

<script>

import axios from 'axios';
import { useAuthStore } from '../../stores/piniaStore';

export default {
  name: 'AutenticationView',

  setup() {
    const authStore = useAuthStore();

    return {
      authStore,
    };
  },

  data() {
    return {
      email: '',
      password: '',
      showAlert: false,
    };
  },

  methods: {
    togglePasswordVisibility() {
        const passwordInput = this.$refs.password;
        const eyeIcon = document.querySelector('.eye-icon');
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            eyeIcon.setAttribute('name', 'eye-off');
        } else {
            passwordInput.type = 'password';
            eyeIcon.setAttribute('name', 'eye');
        }
    },

    goToRegister() {
      this.$router.push({ name: 'Register' });
    },

    validateEmail() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
        if (!emailRegex.test(this.email)) {
            if (!this.showAlert) {
                this.showAlert = true;
                window.alert('Por favor, insira um email válido.');
                this.email = '';
                setTimeout(() => {
                    this.showAlert = false;
                }, 100);
            }
        }
    },

    async login() {
        try {
            const response = await axios.post('https://destinocerto.azurewebsites.net/api/Authentication/login', {
            email: this.email,
            password: this.password,
            });

            if (response.status === 200) {
                const token = response.data;
                this.authStore.setToken(token);
                console.log('Login efetuado com sucesso:', token);
                setTimeout(() => {
                    this.$router.push({ name: 'dashboard' });
                }, 1000);
            } else {
            window.alert('Credenciais inválidas. Por favor, tente novamente.');
            }
        } catch (error) {
            console.error('Erro ao fazer login:', error);
            window.alert('Ocorreu um erro ao fazer login. Por favor, tente novamente mais tarde.');
        }
    },
  }
}
</script>

<style lang="scss" src="./style.scss"></style>