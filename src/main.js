import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/css/app.css'

import VueCookies from 'vue3-cookies'

const app = createApp(App)
app.use(router)
app.use(VueCookies)
app.mount('#app')

app.provide('cookies', app.config.globalProperties.$cookies)

router.app = app
