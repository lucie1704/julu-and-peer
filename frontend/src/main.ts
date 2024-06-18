import { createApp } from 'vue';
import App from './App.vue';
import './assets/css/tailwind.css';
import router from './routes/router';
import store from './store/index';


const app = createApp(App);

app.use(store);
app.use(router);
app.mount('#app');
