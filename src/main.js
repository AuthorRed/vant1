import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/vant.js'
import './assets/css/reset.css'

Vue.config.productionTip = false

Window.vm = new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
