import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

/**
 * Answer type
 * @typedef {Object} Answer
 * @property {any} value    - input value
 * @property {boolean} done - completion state
 */

/**
 * State Object
 * @property {Object.<string, Answer>} answers - keys are the field IDs
 * @property {boolean} printMode
 * @property {string} newNotes                 - notes will be written to this field while editing and saved to notes when input is closed
 * @property {string} notes
 * @property {string} prevQuestionLabel        - holds the label of the question which was presented in the notes before
 */
const initialState = {
  answers: {},
  printMode: false,
  newNotes: '',
  notes: '',
  prevQuestionLabel: ''
};

export default new Vuex.Store({
  state: { ...initialState },
  getters: {
    getFieldCompletion: state => fieldId => state.answers[fieldId]?.done,
    getFieldValue: state => fieldId => state.answers[fieldId]?.value,
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
    },
    getNewNotes: state => state.newNotes,
    getNotes: state => state.notes,
    getPrevQuestionLabel: state => state.prevQuestionLabel
  },
  mutations: {
    resetState(state) {
      for (const key in state.answers) {
        Vue.delete(state.answers, key);
      }
      Object.assign(state, { ...initialState });
    },
    importState(state, importedState) {
      Object.assign(state, importedState);
    },
    /**
     * Update the completion state of fields
     * @param {*} state
     * @param {Object} data
     * @param {string[]} data.fieldIds - The list of the answer IDs to receive the value
     * @param {boolean} data.value     - The value to be set
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
    },
    updatePrintMode(state, newVal) {
      state.printMode = newVal;
    },
    updateNewNotes(state, newVal) {
      state.newNotes = newVal;
    },
    updateNotes(state, newVal) {
      state.notes = newVal;
    },
    updatePrevQuestionLabel(state, newVal) {
      state.prevQuestionLabel = newVal;
    }
  },
  strict: process.env.NODE_ENV !== 'production',
  plugins: [
    createPersistedState({
      filter: mutation => mutation.type !== 'updatePrintMode'
    })
  ]
});
