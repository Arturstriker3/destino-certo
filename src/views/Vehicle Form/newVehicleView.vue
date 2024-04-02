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
                <input type="text" placeholder="CPF" required v-model="cpfUser" @input="formatCpf" @blur="validateCpf" onkeypress="return event.charCode >= 48 && event.charCode <= 57" maxlength="14">
              </div>
            </div>

            

            <div class="column">
              <div class="input-box">
                <label>Placa</label>
                <input type="text" placeholder="Placa do Veículo" v-model="plateUser" @blur="validatePlate" maxlength="8" required>
              </div>

              <div class="input-box">
                <label>Ano</label>
                <input type="number" class="input-date" placeholder="Ano do Veículo" maxlength="4" required @blur="validateYear">
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
                <input type="number" class="input-date" placeholder="Capacidade do Veículo" required @blur="validateCapacity">
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
      showAlert: false,
    };
  },

  methods: {
      formatCpf() {
        this.cpfUser = this.cpfUser.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
        this.cpfNumbers = this.cpfUser.replace(/\D/g, '');
      },

      validateYear() {
        const currentYear = new Date().getFullYear();
        const inputYear = parseInt(event.target.value, 10);
        if (inputYear < 1885 || inputYear > currentYear) {
          if (!this.showAlert) {
            this.showAlert = true;
            event.target.value = '';
            window.alert('Por favor, insira um ano válido entre 1885 e o ano atual.');
            setTimeout(() => {
              this.showAlert = false;
            }, 100);
          }
        }
      },

      validatePlate() {
        const plateRegex = /^[A-Za-z]{3}-\d{4}$/;
        const plateValue = event.target.value.toUpperCase();
        if (!plateRegex.test(plateValue)) {
          if (!this.showAlert) {
            this.showAlert = true;
            event.target.value = '';
            window.alert('Por favor, insira uma placa válida no formato AAA-0000.');
            this.plateUser = '';
            setTimeout(() => {
              this.showAlert = false;
            }, 100);
          }
        } else {
          this.plateNumbers = plateValue.replace('-', '');
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

      validateCapacity() {
        const capacityValue = parseInt(event.target.value, 10);
        if (capacityValue < 2 || capacityValue > 300) {
          if (!this.showAlert) {
            this.showAlert = true;
            event.target.value = '';
            window.alert('Por favor, insira uma capacidade válida entre 2 e 300.');
            setTimeout(() => {
              this.showAlert = false;
            }, 100);
          }
        }
      },
  },

  components: {
    HomeView,
  }
}
</script>

<style lang="scss" src="./style.scss"></style>