import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    answers: {}
  },
  getters: {
    getField: state => fieldId => {
      return state.answers[fieldId];
    }
  },
  mutations: {
    initAnswers(state) {
      state.answers = {};
    },
    updateAnswer(state, { fieldId, value }) {
      Vue.set(state.answers, fieldId, value);
    }
  },
  actions: {
    resetForm({ commit }) {
      commit('initAnswers');
    }
  },
  strict: process.env.NODE_ENV !== 'production',
  plugins: [createPersistedState()]
});
