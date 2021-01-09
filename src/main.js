import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/vant.js'
import getRequest from '@/api/http.js'

Vue.config.productionTip = false
Vue.prototype.$getRequest = getRequest

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
