import Vue from 'vue';
import Vuex from 'vuex';
import form from '@/data/form.json';

Vue.use(Vuex);

const emptyForm = {}
for (const section in form) {
  emptyForm[section] = {};
}

export default new Vuex.Store({
  state: {
    answers: emptyForm
  },
  mutations: {
    initAnswers(state) {
      state.answers = emptyForm;
    },
    updateAnswer(state, {fieldId, value}) {
      const fieldParts = fieldId.split('-');
      const section = fieldParts.shift();
      const key = fieldParts.join('-');
      state.answers[section][key] = value;
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
