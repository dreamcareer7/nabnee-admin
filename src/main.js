/*!

=========================================================
* Vue Argon Dashboard - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './registerServiceWorker'
import Vuelidate from 'vuelidate'
import ArgonDashboard from './plugins/argon-dashboard'
import store from './store'
import VueLodash from 'vue-lodash'

const options = { name: 'lodash' }
Vue.use(Vuelidate)
Vue.use(VueLodash, options)
Vue.config.productionTip = true
Vue.use(ArgonDashboard)
new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
