import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import './index.css'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faHeart, faUser } from '@fortawesome/free-regular-svg-icons'
import { faMagnifyingGlass, faHeart as solidHeart, faStar } from '@fortawesome/free-solid-svg-icons'

library.add(faHeart, faUser, faMagnifyingGlass, solidHeart, faStar)

const app = createApp(App)
app.use(router)
app.use(createPinia())
app.component('FontAwesomeIcon', FontAwesomeIcon)
app.mount('#app')
