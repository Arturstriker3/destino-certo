<template>
    <HomeView>
      <template v-slot:slot-pages>
        <section class="form-container">
          <div class="container">
            <header>Cadastro de Motorista</header>
            <form action="#" class="form">
              <div class="input-box">
                <label>Nome Completo</label>
                <input type="text" placeholder="Nome Completo do Usuário" required>
              </div>

              <div class="column">
                <div class="input-box">
                  <label>CPF</label>
                  <input type="number" placeholder="CPF do Usuário" required>
                </div>

                <div class="input-box">
                  <label>Data de Nascimento</label>
                  <input type="date" class="input-date" placeholder="Data de Nascimento do Usuário" required>
                </div>
              </div>

              <div class="input-box adress">
                <label>Endereço</label>

                <div class="column">
                  <input type="number" placeholder="CEP do Usuário" required>
                  <input type="number" placeholder="Número residencial do Usuário" required>
                </div>
                

                <div class="column">
                  <div class="select-box">
                    <select required>
                      <option hidden>Estado</option>
                      <option>Sergipe</option>
                      <option>São Paulo</option>
                      <option>Rio de Janeiro</option>
                    </select>
                  </div>
                  <input type="text" placeholder="Cidade do Usuário" required>
                </div>

                <input type="text" placeholder="Endereço do Usuário" required>
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