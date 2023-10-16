import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import VueTelInput from 'vue-tel-input';
import 'vue-tel-input/vue-tel-input.css';

import VueTheMask from 'vue-the-mask'


const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(VueTelInput);
app.use(VueTheMask)


app.mount('#app')
