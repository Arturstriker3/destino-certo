<template>
    <div class="container">
        <div class="navigation">
            <ul>
                <li>
                    <router-link :to="{ name: 'Dashboard' }">
                        <span class="icon"><ion-icon name="car-sport-outline"></ion-icon></span>
                        <span class="title">Destino Certo</span>
                    </router-link>
                </li>
                <li>
                    <a href="#">
                        <span class="icon"><ion-icon name="home-outline"></ion-icon></span>
                        <span class="title">Dashboard</span>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <span class="icon"><ion-icon name="person-add-outline"></ion-icon></span>
                        <span class="title">Clientes</span>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <span class="icon"><ion-icon name="person-add-outline"></ion-icon></span>
                        <span class="title">Motoristas</span>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <span class="icon"><ion-icon name="person-add-outline"></ion-icon></span>
                        <span class="title">Carros</span>
                    </a>
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
                        <input type="text" placeholder="Procurar Corrida">
                        <ion-icon name="search-outline"></ion-icon>
                    </label>
                </div>
                <div class="user">
                    <img src="/admIMG.jpg" alt="Admin img">
                </div>
            </div>

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
            </div>
        </div>

        <div>
            <slot name="slot-pages"></slot>
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