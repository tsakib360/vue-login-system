import Vue from 'vue'
import App from './App.vue'
import router from './router'

//Axios
import axios from 'axios'

axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

axios.defaults.headers.common['Authorization'] = 'Bearer '+localStorage.getItem('access_token');
axios.defaults.baseURL = 'http://localhost:8101/';

Vue.prototype.$axios = axios

//Import v-from
import { Form, HasError, AlertError } from 'vform'
Vue.prototype.$form = Form;
Vue.component(HasError.name, HasError)
Vue.component(AlertError.name, AlertError)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
