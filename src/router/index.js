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
        '@/views/VisualisationN.vue'
      )
  },
  {
    path: '/legal',
    name: 'Impressum und Datenschutz',
    component: () =>
      import(
        /* webpackChunkName: "legal" */
        /* webpackPrefetch: true */
        '@/views/Legal.vue'
      )
  },
  {
    path: '/demo',
    name: 'Demo',
    component: () =>
      import(
        /* webpackChunkName: "demo" */
        /* webpackPrefetch: true */
        '@/views/Demo.vue'
      )
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
