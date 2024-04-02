<template>
    <HomeView>
      <template v-slot:slot-pages>
        <section class="form-container">
          <div class="container">
            <header>Cadastro de Viagem</header>
            <form action="#" class="form">

              <div class="column">
                <div class="input-box">
                  <label>Selecionar Placa</label>
                  <div class="select-box">
                    <select required>
                      <option hidden>Placas</option>
                      <option>AHP-6969</option>
                      <option>AHP-6969</option>
                      <option>BWB5F69</option>
                    </select>
                  </div>
                </div>

                <div class="input-box">
                  <label>Digitar Placa</label>
                  <input type="text" placeholder="Placa do Veículo" v-model="plateUser" @blur="validatePlate" maxlength="8" required>
                </div>
              </div>

              <div class="column">
                <div class="input-box">
                  <label>Selecionar Passageiro</label>
                  <div class="select-box">
                    <select required>
                      <option hidden>Passageiro</option>
                      <option>Marcos Felipe</option>
                      <option>Laise</option>
                      <option>Alex Lobo</option>
                    </select>
                  </div>
                </div>

                <div class="input-box">
                  <label>CPF Passageiro</label>
                  <input type="text" placeholder="CPF do Passageiro" required v-model="cpfUser" @input="formatCpf" @blur="validateCpf" onkeypress="return event.charCode >= 48 && event.charCode <= 57" maxlength="14">
                </div>
              </div>
              

              <div class="column">
                <div class="input-box">
                  <label>Horário</label>
                  <input type="number" placeholder="Horário do Transporte" required>
                </div>

                <div class="input-box">
                  <label>Data</label>
                  <input type="date" class="input-date" placeholder="Data de Nascimento do Usuário" required>
                </div>
              </div>

              <div class="column">
                <div class="input-box">
                  <label>Quantidade de KMs</label>
                  <input type="number" placeholder="Quantidade de KMs Rodados " required>
                </div>

                <div class="input-box">
                  <label>Valor Cobrado</label>
                  <input type="number" class="input-date" placeholder="Valor Padrão R$ 0.40">
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
  },

  components: {
    HomeView,
  }
}
</script>

<style lang="scss" src="./style.scss"></style>