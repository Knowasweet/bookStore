import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router/index.js'
import './styles/index.css'

import { initFontawesome } from '@/plugins/fontawesome.js'
import { initPaginate } from '@/plugins/paginate.js'
import { initGoogleLogin } from '@/plugins/googleLogin.js'

const app = createApp(App)
app.use(router)
app.use(createPinia())
initPaginate(app)
initFontawesome(app)
initGoogleLogin(app)
app.mount('#app')
