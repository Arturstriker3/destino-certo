<template>
  <HomeView>
    <template v-slot:slot-pages>
      <section class="form-container">
        <div class="container">
          <header>Cadastro de Veículo</header>
          <form action="#" class="form">

            <div class="gender-box">
              <h3>Adicionar Veículo:</h3>
              <div class="gender-option">
                <div class="gender">
                  <input type="radio" id="check-newDriver" name="driverType" value="newDriver" @change="handleDriverTypeChange('newDriver')" checked>
                  <label for="check-newDriver">Motorista Novo</label>
                </div>
                <div class="gender">
                  <input type="radio" id="check-oldDriver" name="driverType" value="oldDriver" @change="handleDriverTypeChange('oldDriver')">
                  <label for="check-oldDriver">Motorista Existente</label>
                </div>
              </div>
            </div>

            

            <div class="column" v-show="isNewDriver">
              <div class="input-box">
                  <label>Nome Motorista Novo</label>
                  <div class="select-box">
                      <select required @change="handleSelectChangePerson($event.target.value)">
                          <option hidden>Nomes</option>
                          <option v-for="person in people" :key="person.cpf" :value="person.name">{{ person.name }}</option>
                      </select>
                  </div>
              </div>

              <div class="input-box">
                  <label>CPF Motorista Novo</label>
                  <input type="text" placeholder="CPF" v-model="cpfNumbers" readonly>
              </div>
          </div>

          <div class="column" v-show="!isNewDriver">
              <div class="input-box">
                  <label>Nome Motorista Existente</label>
                  <div class="select-box">
                      <select required @change="handleSelectChangeDriver($event.target.value)">
                          <option hidden>Nomes</option>
                          <option v-for="driver in drivers" :key="driver.cpf" :value="driver.name">{{ driver.name }}</option>
                      </select>
                  </div>
              </div>

              <div class="input-box">
                  <label>CPF Motorista Existente</label>
                  <input type="text" placeholder="CPF" v-model="cpfNumbers" readonly>
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
import axios from 'axios'

export default {
  name: 'newUserForm',

  data() {
    return {
      isNewDriver: true,
      cpfUser: '',
      cpfNumbers: '',
      plateUser: '',
      plateNumbers: '',
      showAlert: false,
      token: '',
      drivers: [],
      people: [],
    };
  },

  mounted() {
    this.token = this.getTokenFromLocalStorage();
    this.getDrivers();
    this.getPeople();
  },

  methods: {

      handleSelectChangePerson(selectedName) {
          // Encontrar o CPF correspondente ao nome selecionado
          const selectedPerson = this.people.find(person => person.name === selectedName);
          if (selectedPerson) {
              this.cpfNumbers = selectedPerson.cpf;
          }
      },

      handleSelectChangeDriver(selectedName) {
          // Encontrar o CPF correspondente ao nome selecionado
          const selectedDriver = this.drivers.find(driver => driver.name === selectedName);
          if (selectedDriver) {
              this.cpfNumbers = selectedDriver.cpf;
          }
      },

      handleDriverTypeChange(driverType) {
          this.isNewDriver = (driverType === 'newDriver');
          const selectElements = document.querySelectorAll('select');
          selectElements.forEach(select => {
              const options = select.querySelectorAll('option');
              options.forEach(option => {
                  if (option.hidden) {
                      option.selected = true;
                  }
              });
          });
          this.cpfNumbers = '';
      },

      getDrivers() {
        axios.get('https://destinocerto.azurewebsites.net/api/Person/drivers', {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        })
        .then(response => {
          this.drivers = response.data; // Armazena os motoristas na variável drivers
        })
        .catch(error => {
          console.error('Erro ao obter a lista de motoristas:', error);
        });
      },

      getPeople() {
        axios.get('https://destinocerto.azurewebsites.net/api/Person/passengers', {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        })
        .then(response => {
          this.people = response.data; // Armazena as pessoas que não são motoristas na variável people
        })
        .catch(error => {
          console.error('Erro ao obter a lista de pessoas:', error);
        });
      },

      getTokenFromLocalStorage() {
        return localStorage.getItem('token');
      },

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