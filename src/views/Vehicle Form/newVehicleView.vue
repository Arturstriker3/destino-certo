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
                <input type="number" placeholder="CPF do Motorista" required>
              </div>
            </div>

            

            <div class="column">
              <div class="input-box">
                <label>Placa</label>
                <input type="text" placeholder="Placa do Veículo" required>
              </div>

              <div class="input-box">
                <label>Ano</label>
                <input type="number" class="input-date" placeholder="Ano do Veículo" required>
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

components: {
  HomeView,
}
}
</script>

<style lang="scss" src="./style.scss"></style>