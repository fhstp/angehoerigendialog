import Vue from 'vue';
import VueRouter from 'vue-router';
import Start from '@/views/Start.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Start',
    component: Start
  },
  {
    path: '/fragebogen',
    name: 'Fragebogen',
    component: () =>
      import(
        /* webpackChunkName: "form" */
        /* webpackPrefetch: true */
        '@/views/Form.vue'
      )
  },
  {
    path: '/auswertung',
    name: 'Auswertung',
    component: () =>
      import(
        /* webpackChunkName: "visualisation" */
        /* webpackPrefetch: true */
        '@/views/Visualisation.vue'
      )
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition ?? { x: 0, y: 0 };
  }
});

export default router;
