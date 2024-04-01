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
                  <input type="number" placeholder="CPF" required>
                </div>

                <div class="input-box">
                  <label>Data de Nascimento</label>
                  <input type="date" class="input-date" placeholder="Data de Nascimento" required>
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
      uf: '',
      localidade: '',
      logradouro: '',
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

    async fetchAddress() {
      if (this.cepUser.length === 9) {
        try {
          const response = await axios.get(`https://viacep.com.br/ws/${this.cepNumbers}/json/`);
          const { logradouro, uf, localidade } = response.data;
          this.addressData = { logradouro, uf, localidade };
          this.uf = uf; 
          this.logradouro = logradouro;
          this.localidade = localidade;
          console.log(this.addressData);
        } catch (error) {
          window.alert('Erro ao buscar CEP: ' + error);
        }
      } else {
        window.alert('CEP inválido' + error)
      }
    },

  },
}
</script>

<style lang="scss" src="./style.scss"></style>