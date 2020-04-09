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
    },
    getSectionCompletion: state => sectionId => {
      for (const key in state.answers) {
        if (
          key.startsWith(`${sectionId}-`) &&
          state.answers[key].done !== true
        ) {
          return false;
        }
      }
      return true;
    }
  },
  mutations: {
    wipeStore(state) {
      state.answers = {};
    },
    /**
     * Update the completion state of fields
     * @param {*} state
     * @param {Object} data
     * @param {string[]} data.fieldIds - The list of the answer IDs to receive the value
     * @param {boolean} data.value - The value to be set
     */
    updateAnswerCompletion(state, { fieldIds, value }) {
      for (const fieldId of fieldIds) {
        if (!Object.hasOwnProperty.call(state.answers, fieldId)) {
          Vue.set(state.answers, fieldId, {});
        }
        Vue.set(state.answers[fieldId], 'done', value);
      }
    },
    updateAnswerValue(state, { fieldId, value }) {
      if (!Object.hasOwnProperty.call(state.answers, fieldId)) {
        Vue.set(state.answers, fieldId, {});
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
