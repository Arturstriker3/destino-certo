
<template>
    <section class="form-container">
        <div class="container">
            <header>Login</header>
            <form action="#" class="form">

                <div class="input-box">
                    <label>Usuário</label>
                    <input type="text" placeholder="Usuário" required>
                </div>

                <div class="input-box">
                    <label>Senha</label>
                    <input type="password" placeholder="Senha" ref="password" required>
                    <ion-icon name="eye" class="eye-icon" @click="togglePasswordVisibility"></ion-icon>
                </div>

                <div class="input-box-register">
                    <label>Registrar-me</label>
                </div>

                <div class="btn-center">
                    <button class="form-send">Acessar</button>
                </div>
            </form>
        </div>
    </section>
</template>

<script>

export default {
  name: 'AutenticationView',

  methods: {
    togglePasswordVisibility() {
      const passwordInput = this.$refs.password;
      if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
      } else {
        passwordInput.type = 'password';
      }
    },

    
  }
}
</script>

<style lang="scss" src="./style.scss"></style>