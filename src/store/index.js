import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    answers: {},
    updshowNotes: false,
    newNotes: '',
    notes: ''
  },
  getters: {
    getField: state => fieldId => {
      return state.answers[fieldId];
    },
    getShowNotes: state => {
      return state.updshowNotes;
    },
    getNewNotes: state => {
      return state.newNotes;
    },
    getNotes: state => {
      return state.notes;
    }
  },
  mutations: {
    initAnswers(state) {
      state.answers = {};
    },
    updateAnswer(state, { fieldId, value }) {
      Vue.set(state.answers, fieldId, value);
    },
    updateShowNotes(state, newVal) {
      state.updshowNotes = newVal;
    },
    saveNewNotes(state, newVal) {
      state.newNotes = newVal;
    },
    saveNotes(state, newVal) {
      state.notes = newVal;
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
