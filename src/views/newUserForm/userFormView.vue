<template>
    <HomeView>
      <template v-slot:slot-pages>
        <h1>
            Cadastro de Usuário
        </h1>
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