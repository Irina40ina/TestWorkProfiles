import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import store from '@/store'
// Vuetify
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as vuetifyDirectives from "vuetify/directives";
import "@mdi/font/css/materialdesignicons.css";
import './styles/_variables.scss';

const vuetify = createVuetify({
    components,
    directives: vuetifyDirectives,
});
import './styles/index.css';

router.afterEach((to) => {
    localStorage.setItem('lastVisitedRoute', to.fullPath);
});

const app = createApp(App)
app.use(store)
app.use(router)
app.use(vuetify)
app.mount('#app')
