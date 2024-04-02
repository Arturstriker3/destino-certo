<template>
    <HomeView>
      <template v-slot:slot-pages>
        <div class="cardBox">
            <div class="card" v-for="(vehicle, index) in vehicleData" :key="index">
                <div>
                    <div class="number">{{ vehicle.count }}</div>
                    <div class="number">{{ 'R$ ' + vehicle.totalAmount.toFixed(2) }}</div>
                    <div class="cardName">{{ vehicle.vehicleType }}</div>
                </div>
                <div class="iconBx">
                    <ion-icon :name="getIconName(vehicle.vehicleType)"></ion-icon>
                </div>
            </div>
            <!-- Card para o total de viagens -->
            <div class="card">
                <div>
                    <div class="number">{{ totalTravels }}</div>
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
                    <h2>Viagens</h2>
                    <!-- <a href="#" class="btn">Ver Mais</a> -->
                </div>
                <table>
                    <thead>
                        <tr>
                            <td>Viagem</td>
                            <td>Placa</td>
                            <td>Cpf Passageiro</td>
                            <td>Total</td>
                        </tr>
                    </thead>
                    <input type="text" placeholder="Data Start">
                    <input type="text" placeholder="Data End">
                    <button >Filtrar</button>
                    <tbody>
                        <tr v-for="(trip, index) in historyData" :key="index">
                            <td>{{ 'Viagem ' + (index + 1) }}</td>
                            <td>{{ trip.vehiclePlate }}</td>
                            <td>{{ trip.passengerCpf }}</td>
                            
                            <td><span class="status delivered">{{ 'R$ ' + trip.value }}</span></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

      </template>
    </HomeView>
</template>

<script>
import HomeView from '../Home/HomeView.vue';
import axios from 'axios';

export default {
    name: 'DashboardView',

    components: {
    HomeView,
    },

    data() {
        return {
            showAlert: false,
            token: '',
            totalTravels: 0,
            historyData: {},
            vehicleData: {},
            startDate: '1885-01-01',
            endDate: '2030-01-01',
        };
    },

    mounted() {
        this.token = this.getTokenFromLocalStorage();
        this.fetchHistory(); // chame a função para buscar o histórico
        this.fetchVehicleHistory(); // Chama a função para buscar o histórico de veículos
    },

    methods: {
        getTokenFromLocalStorage() {
            return localStorage.getItem('token');
        },

        totalTravelsCount() {
            for (const vehicle of this.vehicleData) {
                this.totalTravels += vehicle.count;
            }
            return totalTravels;
        },

        getIconName(vehicleType) {
            switch (vehicleType) {
                case 'Car':
                    return 'people-outline';
                case 'Van':
                    return 'man-outline';
                case 'Bus':
                    return 'car-outline';
                // Adicione mais casos conforme necessário
                default:
                    return 'help-outline'; // Ícone padrão caso o tipo de veículo não seja reconhecido
            }
        },

        async fetchVehicleHistory() {
            try {
                const response = await axios.get('https://destinocerto.azurewebsites.net/api/History/reports', {
                    params: {
                        Start: this.startDate,
                        End: this.endDate
                    },
                    headers: {
                        Authorization: `Bearer ${this.token}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (response.status === 200) {
                    this.vehicleData = response.data;
                    console.log('Dados de histórico de veículo recebidos:', this.vehicleData);

                    this.totalTravelsCount();
                } else {
                    console.error('Erro ao buscar histórico de veículo:', response.statusText);
                }
            } catch (error) {
                console.error('Erro ao buscar histórico de veículo:', error);
                // Trate os erros de acordo com a necessidade do seu aplicativo
            }
        },

        async fetchHistory() {
            try {
                const response = await axios.get('https://destinocerto.azurewebsites.net/api/History/all', {
                    params: {
                        Start: this.startDate,
                        End: this.endDate
                    },
                    headers: {
                        Authorization: `Bearer ${this.token}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (response.status === 200) {
                    this.historyData = response.data;
                    console.log('Dados recebidos:', this.historyData);
                } else {
                    console.error('Erro ao buscar histórico:', response.statusText);
                }
            } catch (error) {
                console.error('Erro ao buscar histórico:', error);
                // Trate os erros de acordo com a necessidade do seu aplicativo
            }
        },


    },
}
</script>

<style lang="scss" src="./style.scss"></style>