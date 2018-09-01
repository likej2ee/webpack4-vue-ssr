import Vue from 'vue'
import { router } from 'core/routes'
import app from '../public/app.vue'

// https://segmentfault.com/q/1010000008791791
const vm = new Vue({
  router,
  // render: h => h(app),
  ...app,
}).$mount('#app')
