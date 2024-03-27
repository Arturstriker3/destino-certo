<template>
    <HomeView>
      <template v-slot:slot-pages>
        <h1>
            Clientes
        </h1>
      </template>
    </HomeView>
</template>

<script>
import HomeView from '../Home/HomeView.vue';

export default {
  name: 'ClientesView',

  components: {
    HomeView,
  }
}
</script>