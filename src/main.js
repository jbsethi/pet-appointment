import { createApp } from 'vue'
import router from './routes'
import App from './App.vue'
import store from './store'

import './assets/css/index.css'

createApp(App).use(store).use(router).mount('#app')
