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
                    <ion-icon name="people-outline"></ion-icon>
                </div>
            </div>
            <div class="card">
                <div>
                    <div class="number">80</div>
                    <div class="cardName">Motoristas</div>
                </div>
                <div class="iconBx">
                    <ion-icon name="man-outline"></ion-icon>
                </div>
            </div>
            <div class="card">
                <div>
                    <div class="number">201</div>
                    <div class="cardName">Veículos</div>
                </div>
                <div class="iconBx">
                    <ion-icon name="car-outline"></ion-icon>
                </div>
            </div>
            <div class="card">
                <div>
                    <div class="number">25</div>
                    <div class="cardName">Viagens</div>
                </div>
                <div class="iconBx">
                    <ion-icon name="map-outline"></ion-icon>
                </div>
            </div>
        </div>

        <div class="details">
            <div class="recentOrders">
                <div class="cardHeader">
                    <h2>Viagens Recentes</h2>
                    <a href="#" class="btn">Ver Mais</a>
                </div>
                <table>
                    <thead>
                        <tr>
                            <td>Viagem</td>
                            <td>Motorista</td>
                            <td>Placa</td>
                            <td>Total</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Viagem 1</td>
                            <td>Gustavo</td>
                            <td>AHP-6969</td>
                            <td><span class="status delivered">R$ 2500</span></td>
                        </tr>
                        <tr>
                            <td>Viagem 2</td>
                            <td>Alex Brito</td>
                            <td>AHP-6969</td>
                            <td><span class="status delivered">R$ 2500</span></td>
                        </tr>
                        <tr>
                            <td>Viagem 3</td>
                            <td>Marcos Felipe</td>
                            <td>AHP-6969</td>
                            <td><span class="status delivered">R$ 2500</span></td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="recentCustomers">
                <div class="cardHeader">
                    <h2>Motorista Recentes</h2>
                </div>
                <table>
                    <tr>
                        <td width="64px"><div class="imgBx"><img src="/admIMG.jpg" alt=""></div></td>
                        <td><h4>Alex Brito</h4></td>
                    </tr>
                    <tr>
                        <td width="64px"><div class="imgBx"><img src="/admIMG.jpg" alt=""></div></td>
                        <td><h4>Marcos Felipe</h4></td>
                    </tr>
                    <tr>
                        <td width="64px"><div class="imgBx"><img src="/admIMG.jpg" alt=""></div></td>
                        <td><h4>Gustavo Lobo</h4></td>
                    </tr>
                    <tr>
                        <td width="64px"><div class="imgBx"><img src="/admIMG.jpg" alt=""></div></td>
                        <td><h4>Artur Daniel</h4></td>
                    </tr>
                </table>
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