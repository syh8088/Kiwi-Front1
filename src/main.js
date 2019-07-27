import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './registerServiceWorker'
import ArgonDashboard from './plugins/argon-dashboard'
import service from './service'
import Common from './common/Common.js'

Vue.config.productionTip = false;

Vue.use(ArgonDashboard);
Vue.use(service);
Vue.use(Common);
new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
