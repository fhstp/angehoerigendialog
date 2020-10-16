import Vue from 'vue';
import vhCheck from 'vh-check';
import VueSecureHTML from 'vue-html-secure';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';

Vue.use(VueSecureHTML);
vhCheck({ redefineVh: true, updateOnTouch: true });

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
