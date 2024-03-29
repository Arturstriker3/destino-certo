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
                  <input type="text" placeholder="Placa do Carro" required>
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
                  <input type="number" placeholder="CPF do Passageiro" required>
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

  components: {
    HomeView,
  }
}
</script>

<style lang="scss" src="./style.scss"></style>