import Vue from 'vue';
import Vuex from 'vuex';
import form from '@/data/form.json';

Vue.use(Vuex);

for (const section in form) {
  form[section] = {};
}

export default new Vuex.Store({
  state: {
    answers: {}
  },
  mutations: {
    initAnswers(state) {
      state.answers = form;
    }
  },
  actions: {
    resetForm({commit}) {
      commit('initAnswers');
    }
  },
  strict: process.env.NODE_ENV !== 'production'
  // https://vuex.vuejs.org/guide/getters.html#method-style-access
});
