import Vue from 'vue';
import vhCheck from 'vh-check';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';

vhCheck({ redefineVh: true, updateOnTouch: true });

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
