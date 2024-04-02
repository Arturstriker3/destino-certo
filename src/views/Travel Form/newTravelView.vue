<template>
    <HomeView>
      <template v-slot:slot-pages>
        <section class="form-container">
          <div class="container">
            <header>Cadastro de Viagem</header>
            <form action="#" class="form">

              <div class="column">
                <div class="input-box">
                  <label>Selecionar Motorista</label>
                  <div class="select-box">
                    <select required @change="handleSelectChangeDriver($event.target.value)">
                      <option hidden>Motoristas</option>
                      <option v-for="driver in drivers" :key="driver.cpf" :value="driver.name">{{ driver.name }}</option>
                    </select>
                  </div>
                </div>

                <div class="input-box">
                  <label>Veiculos por Placas</label>
                  <div class="select-box">
                    <select required @change="handleSelectChangePlate($event.target.value)">
                      <option hidden>Veiculos</option>
                      <option v-for="vehicle in driverVeiculos" :key="vehicle.plate" :value="vehicle.plate">
                        {{ vehicle.plate }}
                      </option>
                    </select>
                  </div>
                </div>
              </div>

              <div class="column">
                <div class="input-box">
                  <label>Selecionar Passageiro</label>
                  <div class="select-box">
                    <select required @change="handleSelectChangePerson($event.target.value)">
                      <option hidden>Passageiros</option>
                      <option v-for="person in people" :key="person.cpf" :value="person.name">{{ person.name }}</option>
                    </select>
                  </div>
                </div>

                <div class="input-box">
                  <label>CPF Passageiro</label>
                  <input type="text" placeholder="CPF" v-model="cpfNumbers" readonly>
                </div>
              </div>
              

              <div class="column">
                <div class="input-box">
                  <label>Horário</label>
                  <input type="text" placeholder="Horário do Transporte" v-model="timeUser" @blur="validateHours" maxlength="5">
                </div>

                <div class="input-box">
                  <label>Data</label>
                  <input type="date" class="input-date" placeholder="Data de Nascimento do Usuário" required>
                </div>
              </div>

                <div class="input-box">
                  <label>Quantidade de KMs</label>
                  <input type="number" placeholder="Quantidade de KMs Rodados " v-model="kilometersUser" @blur="validateKilometers" required>
                  
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
      cpfUser: '',
      cpfNumbers: '',
      plateUser: '',
      plateNumbers: '',
      timeUser: '',
      timeNumbers: '',
      kilometersUser: '',
      showAlert: false,
      people: [],
      drivers: [],
      driverCPF: '',
      driverVeiculos: [],
    };
  },

  mounted() {
    this.token = this.getTokenFromLocalStorage();
    this.getPeople();
    this.getDrivers();
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
              this.driverCPF = selectedDriver.cpf;
              this.getVehicles(this.driverCPF);
          }
      },

      handleSelectChangePlate(selectedPlate) {
        // Definir a placa selecionada como plateNumbers
        this.plateNumbers = selectedPlate;
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

      getVehicles(driverCpf) {
        axios.get(`https://destinocerto.azurewebsites.net/api/Vehicle?driverCpf=${driverCpf}`, {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        })
        .then(response => {
          this.driverVeiculos = response.data; // Armazena os veículos do motorista na variável driverVeiculos
        })
        .catch(error => {
          console.error('Erro ao obter a lista de veículos do motorista:', error);
        });
      },

    formatCpf() {
      this.cpfUser = this.cpfUser.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
      this.cpfNumbers = this.cpfUser.replace(/\D/g, '');
    },

    getTokenFromLocalStorage() {
        return localStorage.getItem('token');
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

    validateKilometers() {
      // Converte a entrada em um número
      const kilometers = parseFloat(this.kilometersUser);

      // Verifica se a entrada não é um número válido ou se é menor ou igual a zero
      if (isNaN(kilometers) || kilometers <= 0) {
        // Verifica se o alerta já está sendo mostrado
        if (!this.showAlert) {
          // Define showAlert como true para indicar que o alerta está sendo mostrado
          this.showAlert = true;
          // Mostra o alerta
          window.alert('Por favor, insira uma quantidade de quilômetros válida e maior que zero.');
          // Limpa o valor do input
          this.kilometersUser = '';
          // Define showAlert como false após o alerta ser fechado
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

    validateHours() {
      // Regex para validar o formato do horário (HH:MM)
      const timeRegex = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;

      // Verifica se o horário não corresponde ao formato HH:MM
      if (!timeRegex.test(this.timeUser)) {
        // Verifica se o alerta já está sendo mostrado
        if (!this.showAlert) {
          // Define showAlert como true para indicar que o alerta está sendo mostrado
          this.showAlert = true;
          // Mostra o alerta
          window.alert('Por favor, insira o horário no formato HH:MM e dentro do intervalo correto.');
          // Limpa o valor do input
          this.timeUser = '';
          // Define showAlert como false após o alerta ser fechado
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