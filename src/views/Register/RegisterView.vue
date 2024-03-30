
<template>
    <section class="form-container">
        <div class="container">
            <header>Registro</header>
            <form action="#" class="form">

                <div class="input-box">
                    <label>Nome Completo</label>
                    <input type="text" placeholder="Nome Completo do Usuário" required>
                </div>

                <div class="column">
                    <div class="input-box">
                        <label>CPF</label>
                        <input type="number" placeholder="CPF" required>
                    </div>

                    <div class="input-box">
                        <label>Data de Nascimento</label>
                        <input type="date" class="input-date" placeholder="Data de Nascimento do Usuário" required>
                    </div>
                </div>

                <div class="input-box adress">
                <label>Endereço</label>

                <div class="column">
                  <input type="number" placeholder="CEP" required>
                  <input type="number" placeholder="Número" required>
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
                  <input type="text" placeholder="Cidade" required>
                </div>

                <input type="text" placeholder="Endereço" required>
              </div>

                <div class="input-box">
                    <label>Usuário</label>
                    <input type="text" placeholder="Usuário" required>
                </div>

                <div class="input-box">
                    <label>Senha</label>
                    <div class="key-show">
                        <input type="text" placeholder="Senha" required>
                        <ion-icon name="eye" class="eye-icon-1"></ion-icon>
                    </div>
                </div>

                <div class="input-box">
                    <label>Confirmar Senha</label>
                    <div class="key-show">
                        <input type="text" placeholder="Senha" required>
                        <ion-icon name="eye" class="eye-icon-2"></ion-icon>
                    </div>
                </div>

                <div class="input-box-register">
                    <label>Logar-me</label>
                </div>

                <div class="btn-center">
                    <button class="form-send">Registrar</button>
                </div>
            </form>
        </div>
    </section>
</template>

<script>

export default {
  name: 'RegisterView',

  components: {
    
  }
}
</script>

<style lang="scss" src="./style.scss"></style>