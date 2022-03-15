// Additional polyfills
import 'custom-event-polyfill'
import 'url-polyfill'

import Vue from 'vue'
import App from './App'
import router from './router'
import bFormSlider from 'vue-bootstrap-slider';
import BootstrapVue from 'bootstrap-vue'
import axios from 'axios';
import globals from './globals'
import Popper from 'popper.js'
import VueSweetalert2 from 'vue-sweetalert2';
import VueLoading from 'vuejs-loading-plugin'

// If you don't need the styles, do not connect
import 'sweetalert2/dist/sweetalert2.min.css';




axios.defaults.baseURL = 'http://193.105.234.170:8001/api/v1'
// Required to enable animations on dropdowns/tooltips/popovers
Popper.Defaults.modifiers.computeStyle.gpuAcceleration = false

Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(bFormSlider)
Vue.use(VueSweetalert2);
Vue.use(VueLoading , {
  text: 'لطفا کمی صبر کنید', 
  background: 'rgba(0,0,0,0.5)',
})
// Global RTL flag
Vue.mixin({
  data: globals
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
