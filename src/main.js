import Vue from 'vue';
import VueGoogleCharts from 'vue-google-charts';
import App from './App.vue';
import router from './router';

Vue.config.productionTip = false;

Vue.use(VueGoogleCharts);

require('@/assets/scss/main.scss');

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
