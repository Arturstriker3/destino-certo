<template>
  <HomeView>
    <template v-slot:slot-pages>
      <section class="form-container">
        <div class="container">
          <header>Cadastro de Veículo</header>
          <form action="#" class="form">

            <div class="column">
              <div class="input-box">
                <label>Nome Motorista</label>
                <div class="select-box">
                  <select required>
                    <option hidden>Nomes</option>
                    <option>Artur</option>
                    <option>Alex</option>
                    <option>Gustavo</option>
                  </select>
                </div>
              </div>

              <div class="input-box">
                <label>CPF Motorista</label>
                <input type="text" placeholder="CPF" required v-model="cpfUser" @input="formatCpf" @blur="validateCpf" @keypress.enter="validateCpf" onkeypress="return event.charCode >= 48 && event.charCode <= 57" maxlength="14">
              </div>
            </div>

            

            <div class="column">
              <div class="input-box">
                <label>Placa</label>
                <input type="text" placeholder="Placa do Veículo" v-model="plateUser" @blur="validatePlate" @keydown.enter="validatePlate" maxlength="8" required>
              </div>

              <div class="input-box">
                <label>Ano</label>
                <input type="number" class="input-date" placeholder="Ano do Veículo" required @blur="validateYear" @keydown.enter="validateYear">
              </div>
            </div>

            <div class="column">
              <div class="input-box">
                <label>Marca</label>
                <input type="text" placeholder="Marca do Veículo" required>
              </div>

              <div class="input-box">
                <label>Modelo</label>
                <input type="text" class="input-date" placeholder="Modelo do Veículo" required>
              </div>

              <div class="input-box">
                <label>Capacidade</label>
                <input type="number" class="input-date" placeholder="Modelo do Veículo" required>
              </div>
            </div>

            <div class="gender-box">
              <h3>Tipo</h3>
              <div class="gender-option">
                <div class="gender">
                  <input type="radio" id="check-car" name="vehicleType">
                  <label for="check-car">Carro</label>
                </div>
                <div class="gender">
                  <input type="radio" id="check-bus" name="vehicleType">
                  <label for="check-bus">Ônibus</label>
                </div>
                <div class="gender">
                  <input type="radio" id="check-van" name="vehicleType">
                  <label for="check-van">Van</label>
                </div>
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

export default {
  name: 'newUserForm',

  data() {
    return {
      cpfUser: '',
      cpfNumbers: '',
      plateUser: '',
      plateNumbers: '',
    };
  },

  methods: {
      formatCpf() {
        this.cpfUser = this.cpfUser.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
        this.cpfNumbers = this.cpfUser.replace(/\D/g, '');
      },

    validateYear() {
      const keyCode = event.keyCode;
      if (keyCode === 13 || event.type === 'blur') {
        const currentYear = new Date().getFullYear();
        const inputYear = parseInt(event.target.value, 10);
          if (inputYear < 1885 || inputYear > currentYear) {
            event.target.value = '';
            window.alert('Por favor, insira um ano válido entre 1885 e o ano atual.');
          }
      }
    },

    validatePlate() {
      const plateRegex = /^[A-Za-z]{3}-\d{4}$/;
      const plateValue = event.target.value.toUpperCase();
      if (!plateRegex.test(plateValue)) {
        event.target.value = '';
        window.alert('Por favor, insira uma placa válida no formato AAA-0000.');
      } else {
        this.plateNumbers = plateValue.replace('-', ''); // Remove o hífen da placa e armazena em plateNumbers
      }
    },

    validateCpf(event) {
      if (this.cpfUser.length !== 14) {
        window.alert('Por favor, insira um CPF válido com 11 dígitos.');
        this.cpfUser = ''; // Limpa o valor do input
      }
    },
  },

  components: {
    HomeView,
  }
}
</script>

<style lang="scss" src="./style.scss"></style>