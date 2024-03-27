<template>
    <HomeView>
      <template v-slot:slot-pages>
        <div>
            <h1>Dashboard Slot</h1>
            <p>Dashboard Slot</p>
        </div>
      </template>
    </HomeView>
</template>

<script>
import HomeView from '../Home/HomeView.vue';

export default {
  name: 'DashboardView',

  components: {
    HomeView,
  }
}
</script>