import Vue from 'vue';
import vhCheck from 'vh-check';
import VueSecureHTML from 'vue-html-secure';
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';

const options = {
  confirmButtonColor: '#ffbe1b',
  cancelButtonColor: '#dddddd'
};
Vue.use(VueSweetalert2, options);
Vue.use(VueSecureHTML);

vhCheck({ redefineVh: true, updateOnTouch: true });

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
