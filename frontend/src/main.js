import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import '../node_modules/bulma'
import axios from 'axios';

// const host = window.location.hostname
// const port = window.location.port

axios.defaults.baseURL = 'http://localhost:8000'

// axios.defaults.baseURL = `http://${host}:${port}` // Produção

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
