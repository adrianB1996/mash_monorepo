import './index.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'

import App from './App.vue'

const app = createApp(App).use(createPinia()).use(router)
app.mount('#app')
