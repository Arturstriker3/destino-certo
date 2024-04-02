
<template>
    <section class="form-container">
        <div class="container">
            <header>Registro</header>
            <form @submit.prevent="sendForm" class="form">

                <div class="input-box">
                    <label>Nome Completo</label>
                    <input type="text" placeholder="Nome Completo do Usuário" required>
                </div>

                <div class="column">
                    <div class="input-box">
                        <label>CPF</label>
                        <input type="text" placeholder="CPF" required v-model="cpfUser" @input="formatCpf" @blur="validateCpf" onkeypress="return event.charCode >= 48 && event.charCode <= 57" maxlength="14">
                    </div>

                    <div class="input-box">
                        <label>Data de Nascimento</label>
                        <input type="date" class="input-date" v-model="dateOfBirth" placeholder="Data de Nascimento" required @input="preventFutureDate">
                    </div>
                </div>

                <div class="input-box adress">
                <label>Endereço</label>

                <div class="column">
                  <input type="text" v-model="cepUser" @blur="fetchAddress" @input="formatCep" placeholder="CEP" maxlength="9" required>
                  <input type="text" placeholder="UF" required readonly v-model="uf">
                </div>
                

                <div class="column">
                  
                  <input type="text" placeholder="Cidade" required readonly v-model="localidade">
                  <input type="text" placeholder="Endereço" required readonly v-model="logradouro">
                </div>
              </div>

                <div class="input-box">
                    <label>Email</label>
                    <input type="text" v-model="email" placeholder="Email" @blur="validateEmail" required>
                </div>

                <div class="input-box">
                    <label>Senha</label>
                    <div class="key-show">
                        <input type="text" placeholder="Senha" v-model="password1" ref="password1" required>
                        <ion-icon name="eye" class="eye-icon-1" @click="togglePasswordVisibility1"></ion-icon>
                    </div>
                </div>

                <div class="input-box">
                    <label>Confirmar Senha</label>
                    <div class="key-show">
                        <input type="text" placeholder="Senha" v-model="password2" ref="password2" @blur="samePassword" required>
                        <ion-icon name="eye" class="eye-icon-2" @click="togglePasswordVisibility2"></ion-icon>
                    </div>
                </div>

                <div class="input-box-register" @click="goToLogin">
                    <label>Logar-me</label>
                </div>

                <div class="btn-center">
                    <button class="form-send">Registrar</button>
                </div>
            </form>
        </div>
    </section>
</template>

<script>
import axios from 'axios';

export default {
  name: 'RegisterView',

  data() {
    return {
      cepUser: '',
      cepNumbers: '',
      cpfUser: '',
      cpfNumbers: '',
      name: '',
      dateOfBirth: '',
      uf: '',
      localidade: '',
      logradouro: '',
      showAlert: false,
      email: '',
      password1: '',
      password2: '',
      addressData: {
        logradouro: '',
        uf: '',
        localidade: '',
      },
      token: '',

    };
  },

  mounted() {
    this.token = this.getTokenFromRemote();
  },

  methods: {

    async getTokenFromRemote() {
      try {
        const response = await axios.post('https://destinocerto.azurewebsites.net/api/Authentication/login', {
          email: 'artur.daniel@souunit.com.br',
          password: '123456',
        });

        if (response.status === 200) {
          const token = response.data;
          console.log('Login efetuado com sucesso:', token);
          return token;
        } else {
          console.error('Falha ao efetuar login:', response.statusText);
          return null;
        }
      } catch (error) {
        console.error('Erro ao efetuar login:', error);
        return null;
      }
    },

    async sendForm() {
      try {
        const response = await axios.post('https://destinocerto.azurewebsites.net/api/Authentication/register', {
          name: this.name,
          cpf: this.cpfNumbers,
          dateOfBirth: this.dateOfBirth,
          email: this.email,
          password: this.password1,
          cep: this.cepNumbers,
        }, {
          headers: {
            Authorization: `Bearer ${this.token}`
          }
        });

        if (response.status === 201) {
          this.$router.push({ name: 'Autentication' });
          window.alert('Usuário cadastrado com sucesso!');
        }
      } catch (error) {
        window.alert('Erro ao registrar usuário: ' + error);
      }
    },

    formatCpf() {
      this.cpfUser = this.cpfUser.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
      this.cpfNumbers = this.cpfUser.replace(/\D/g, '');
    },

    preventFutureDate() {
      const selectedDate = new Date(event.target.value);
      const currentDate = new Date();
      if (selectedDate > currentDate) {
        event.target.value = '';
        window.alert('Por favor, selecione uma data válida.');
      }
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

    validateCpf() {
      if (this.cpfUser.length !== 14) {
        if (!this.showAlert) {
          this.showAlert = true;
          window.alert('Por favor, insira um CPF válido com 11 dígitos.');
          this.cpfUser = '';
          setTimeout(() => {
            this.showAlert = false;
          }, 100);
        }
      }
    },

    async fetchAddress() {
      if (this.cepUser.length === 9) {
        try {
          const response = await axios.get(`https://viacep.com.br/ws/${this.cepNumbers}/json/`);
          if (!response.data.erro) {
            const { logradouro, uf, localidade } = response.data;
            this.addressData = { logradouro, uf, localidade };
            this.uf = uf; 
            this.logradouro = logradouro;
            this.localidade = localidade;
            console.log(this.addressData);
          } else {
            if (!this.showAlert) {
              this.showAlert = true;
              window.alert('CEP não encontrado.');
              this.cepUser = '';
              setTimeout(() => {
                this.showAlert = false;
              }, 100);
            }
          }
        } catch (error) {
          if (!this.showAlert) {
            this.showAlert = true;
            window.alert('Erro ao buscar CEP: ' + error);
            this.cepUser = '';
            setTimeout(() => {
              this.showAlert = false;
            }, 100);
          }
        }
      } else if (this.cepUser.length > 0) {
        if (!this.showAlert) {
          this.showAlert = true;
          window.alert('Por favor, insira um CEP válido no formato 00000-000.');
          this.cepUser = '';
          setTimeout(() => {
            this.showAlert = false;
          }, 100);
        }
      }
    },

    formatCep() {
      this.cepUser = this.cepUser.replace(/\D/g, '').replace(/^(\d{5})(\d)/, '$1-$2');
      this.cepNumbers = this.cepUser.replace(/\D/g, '');
    },

    samePassword() {
      if (this.password1 !== this.password2) {
        if (!this.showAlert) {
          this.showAlert = true;
          window.alert('As senhas não coincidem. Por favor, insira senhas iguais.');
          this.password1 = '';
          this.password2 = '';
          setTimeout(() => {
            this.showAlert = false;
          }, 100);
        }
      }
    },

    togglePasswordVisibility1() {
      const passwordInput = this.$refs.password1;
      if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
      } else {
        passwordInput.type = 'password';
      }
    },

    togglePasswordVisibility2() {
      const passwordInput = this.$refs.password2;
      if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
      } else {
        passwordInput.type = 'password';
      }
    },

    goToLogin() {
      this.$router.push({ name: 'Autentication' });
    },


  }
}
</script>

<style lang="scss" src="./style.scss"></style>