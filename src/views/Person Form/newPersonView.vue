<template>
    <HomeView>
      <template v-slot:slot-pages>
        <section class="form-container">
          <div class="container">
            <header>Cadastro de Pessoa</header>
            <form action="#" class="form">
              <div class="input-box">
                <label>Nome Completo</label>
                <input type="text" placeholder="Nome Completo" required>
              </div>

              <div class="column">
                <div class="input-box">
                  <label>CPF</label>
                  <input type="text" placeholder="CPF" required v-model="cpfUser" @input="formatCpf" @blur="validateCpf" onkeypress="return event.charCode >= 48 && event.charCode <= 57" maxlength="14">
                </div>

                <div class="input-box">
                  <label>Data de Nascimento</label>
                  <input type="date" class="input-date" placeholder="Data de Nascimento" required @input="preventFutureDate">

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

              <button class="form-send">Salvar</button>
            </form>
          </div>
        </section>
      </template>
    </HomeView>
</template>

<script>
import HomeView from '../Home/HomeView.vue';
import axios from 'axios'

export default {
  name: 'newPersonForm',

  components: {
    HomeView,
  },

  data() {
    return {
      cepUser: '',
      cepNumbers: '',
      cpfUser: '',
      cpfNumbers: '',
      uf: '',
      localidade: '',
      logradouro: '',
      showAlert: false,
      addressData: {
        logradouro: '',
        uf: '',
        localidade: '',
      },

    };
  },

  methods: {

    formatCep() {
      this.cepUser = this.cepUser.replace(/\D/g, '').replace(/^(\d{5})(\d)/, '$1-$2');
      this.cepNumbers = this.cepUser.replace(/\D/g, '');
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
    

  },
}
</script>

<style lang="scss" src="./style.scss"></style>