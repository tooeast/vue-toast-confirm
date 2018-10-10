import Vue from 'vue'
import App from './App.vue'

import vdialog from './libs'

Vue.use(vdialog)

new Vue({
  el: '#app',
  render: h => h(App)
})
