import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import axios from 'axios'; 
import './assets/main.css'; 
const app = createApp(App);

axios.defaults.baseURL = 'http://localhost:3000/';

app.config.globalProperties.$axios = axios;

app.use(router);
app.use(store);

app.mount('#app');