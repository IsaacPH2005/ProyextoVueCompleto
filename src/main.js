

import { createApp } from 'vue'
import { createPinia } from 'pinia'


import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap'
import 'sweetalert2/dist/sweetalert2.min.css'
/* Swal. */
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
