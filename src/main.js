import { createApp } from 'vue'
import * as Sentry from '@sentry/vue'
import { Integrations } from '@sentry/tracing'
import VueCookies from 'vue3-cookies'

import App from './App.vue'
import router from './router'
import './assets/css/app.css'

Sentry.init({
    app,
    dsn: 'https://33d11ce7631147e8b134804db29d3ae6@o348239.ingest.sentry.io/6010308',
    integrations: [
      new Integrations.BrowserTracing({
        routingInstrumentation: Sentry.vueRouterInstrumentation(router),
        tracingOrigins: ['localhost', 'vcernuta.fr'],
      }),
    ],
    logErrors: true,
    tracesSampleRate: 1.0, // TODO: Reduce once in production
})

const app = createApp(App)
app.use(router)
app.use(VueCookies)
app.mount('#app')

app.provide('cookies', app.config.globalProperties.$cookies)

router.app = app
