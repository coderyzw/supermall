import Vue from 'vue'
import App from './App.vue'
import router from './router'

import Router from 'vue-router'
Vue.use(Router)
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
