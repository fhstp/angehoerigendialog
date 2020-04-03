import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    answers: {}
  },
  getters: {
    getFieldCompletion: state => fieldId => {
      return state.answers[fieldId]?.done;
    },
    getFieldValue: state => fieldId => {
      return state.answers[fieldId]?.value;
    }
  },
  mutations: {
    initAnswers(state) {
      state.answers = {};
    },
    updateAnswerCompletion(state, { fieldId, value }) {
      if (!Object.hasOwnProperty.call(state.answers, fieldId)) {
        state.answers[fieldId] = {};
      }
      Vue.set(state.answers[fieldId], 'done', value);
    },
    updateAnswerValue(state, { fieldId, value }) {
      if (!Object.hasOwnProperty.call(state.answers, fieldId)) {
        state.answers[fieldId] = {};
      }
      Vue.set(state.answers[fieldId], 'value', value);
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
