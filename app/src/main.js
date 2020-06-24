import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  data: {
    authUser: null,
    baseUrl: 'http://localhost:3000/api'
  },

  render: h => h(App)
}).$mount('#app')