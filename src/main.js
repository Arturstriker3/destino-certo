import { createApp } from 'vue'
import './assets/_main.scss'
import App from './App.vue'
import router from './router';
import { pinia } from './pinia';

const app = createApp(App);
app.use(router);
app.use(router).use(pinia);

app.mount('#app');
