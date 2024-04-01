<template>
    <div class="container">
        <div class="navigation">
            <ul>
                <li>
                    <a href="#">
                        <span class="icon"><ion-icon name="car-sport-sharp"></ion-icon></span>
                        <span class="title">Destino Certo</span>
                    </a>
                </li>
                <li>
                    <router-link :to="{ name: 'dashboard' }">
                        <a href="#">
                            <span class="icon"><ion-icon name="home"></ion-icon></span>
                            <span class="title">Dashboard</span>
                        </a>
                    </router-link>
                </li>
                <li>
                    <router-link :to="{ name: 'newPersonForm' }">
                        <a href="#">
                            <span class="icon"><ion-icon name="person"></ion-icon></span>
                            <span class="title">Cadastrar Pessoa</span>
                        </a>
                    </router-link>
                </li>
                <li>
                    <router-link :to="{ name: 'newVehicleForm' }">
                        <a href="#">
                            <span class="icon"><ion-icon name="car"></ion-icon></span>
                            <span class="title">Cadastrar Veículo</span>
                        </a>
                    </router-link>
                </li>
                <li>
                    <router-link :to="{ name: 'newTravelForm' }">
                        <a href="#">
                            <span class="icon"><ion-icon name="calendar"></ion-icon></span>
                            <span class="title">Registrar Transporte</span>
                        </a>
                    </router-link>
                </li>
                <li>
                    <router-link :to="{ name: 'newPersonForm' }">
                        <a href="#">
                            <span class="icon"><ion-icon name="cash"></ion-icon></span>
                            <span class="title">Relatório Financeiro</span>
                        </a>
                    </router-link>
                </li>
                <li>
                    <a href="#">
                        <span class="icon"><ion-icon name="log-out-outline"></ion-icon></span>
                        <span class="title">Sair</span>
                    </a>
                </li>
            </ul>
        </div>

        <div class="main">
            <div class="topbar">
                <div class="toggle"><ion-icon name="menu-outline" @click="menuToggle" ></ion-icon></div>
                <div class="search">
                    <label>
                        <input type="text" id="searchField" placeholder="Procurar Corrida">
                        <ion-icon name="search-outline"></ion-icon>
                    </label>
                </div>
                <div class="user">
                    <img src="/admIMG.jpg" alt="Admin img">
                </div>
            </div>

            <slot name="slot-pages"></slot>
        </div>

        <div>
            
        </div>
    </div>
</template>

<script>

export default {
    name: 'HomeView',
    data() {
        return {
            //
        }
    },
    methods: {
        menuToggle() {
            let navigation = document.querySelector('.navigation');
            let main = document.querySelector('.main');

            navigation.classList.toggle('active');
            main.classList.toggle('active');
        }
    },
}
</script>

<style lang="scss" src="./style.scss"></style>