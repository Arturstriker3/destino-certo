<template>
    <HomeView>
      <template v-slot:slot-pages>
        <div class="cardBox">
            <div class="card">
                <div>
                    <div class="number">1,504</div>
                    <div class="cardName">Usuários</div>
                </div>
                <div class="iconBx">
                    <ion-icon name="eye-outline"></ion-icon>
                </div>
            </div>
            <div class="card">
                <div>
                    <div class="number">80</div>
                    <div class="cardName">Motoristas</div>
                </div>
                <div class="iconBx">
                    <ion-icon name="eye-outline"></ion-icon>
                </div>
            </div>
            <div class="card">
                <div>
                    <div class="number">201</div>
                    <div class="cardName">Veículos</div>
                </div>
                <div class="iconBx">
                    <ion-icon name="eye-outline"></ion-icon>
                </div>
            </div>
            <div class="card">
                <div>
                    <div class="number">25</div>
                    <div class="cardName">Viagens</div>
                </div>
                <div class="iconBx">
                    <ion-icon name="eye-outline"></ion-icon>
                </div>
            </div>
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

<style lang="scss" src="./style.scss"></style>