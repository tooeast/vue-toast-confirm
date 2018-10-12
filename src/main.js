import Vue from 'vue'
import App from './App.vue'

// import vdialog from 'vue-toast-confirm'
import vdialog from './libs'
// import vdialog from '../dist'

Vue.use(vdialog)

new Vue({
  el: '#app',
  render: h => h(App)
})
