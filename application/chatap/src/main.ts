import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';
import './assets/index.css';
import Vue3Toasity, { type ToastContainerOptions } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const app = createApp(App).use(Vue3Toasity, {
  autoClose: 5000,

} as ToastContainerOptions);

app.use(createPinia());
app.use(router);

app.mount('#app');
