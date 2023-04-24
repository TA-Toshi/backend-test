import { createApp } from 'vue'
import App from './App.vue'
import { Quasar } from 'quasar'
import quasarUserOptions from './quasar-user-options'
Quasar.lang.set(Quasar.lang.eng)

createApp(App).use(Quasar, quasarUserOptions).mount('#app')
