import './style.css';
import 'vuetify/styles';
import './assets/css/tailwind.css';
import { createPinia } from 'pinia';
import { createApp } from 'vue';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import router from '~/router/router';
import App from './App.vue';

const vuetify = createVuetify({
  defaults: {
    global: {
      ripple: false
    },
    VTextField: {
      density: 'comfortable',
      variant: 'outlined'
    }
  },
  components,
  directives
});

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(vuetify);

app.mount('#app');
