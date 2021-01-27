import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import './plugins'
import store from './store'
import { sync } from 'vuex-router-sync'
import VueCookies from 'vue-cookies'

Vue.use(VueCookies)
Vue.$cookies.config('7d')

Vue.config.productionTip = false

window.axios = require('axios')
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'

// const token = document.head.querySelector('meta[name="csrf-token"]')
//
// if (token) window.axios.defaults.headers.common['X-CSRF-TOKEN'] = token.content
// else console.error('CSRF token not found: https://laravel.com/docs/csrf#csrf-x-csrf-token')

window.axios.defaults.baseURL = process.env.VUE_APP_API_URL

sync(store, router)

new Vue({
  router,
  vuetify,
  store,
  render: h => h(App),
}).$mount('#app')
