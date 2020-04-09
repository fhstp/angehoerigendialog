<template>
  <div v-show="showNotes" class="an-note-text">
    <AnNoteCloseButton :focus-method="focus_TaAlreadythere" />
    <div class="an-note-text__elementwrapper">
      <div class="an-note-text__innerContainer">
        <textarea
          ref="ta_alreadythere"
          v-model="noteData"
          @input="updateTextAreaHeight($event.currentTarget)"
        >
        </textarea>
        <template v-if="showAddHeading">
          <div
            class="an-note-text__currentquestionwrapper"
            @click="focus_TaNewtextLastLine()"
          >
            <span class="an-note-text__currentquestion">
              > {{ currentQuestionLabel }}</span
            >
            <button @click="addHeading()">
              Frage als Überschrift
            </button>
          </div>
          <textarea
            ref="ta_newtext"
            v-model="noteNewData"
            @input="updateTextAreaHeight($event.currentTarget)"
          ></textarea>
        </template>
      </div>
    </div>
    <div
      class="an-note-text__focusdiv"
      @click="focus_TaNewtextLastLine()"
    ></div>
  </div>
</template>

<script>
import formJson from '@/data/form.json';
import { form_filterAccordionItems } from '@/helpers/form.js';
import AnNoteCloseButton from '@/components/ui/AnNoteCloseButton.vue';

export default {
  name: 'AnNoteText',
  components: { AnNoteCloseButton },
  data() {
    return {
      currentQuestionLabel_prev: this.$store.getters.getPrevQuestionLabel,
      showAddHeading: true
    };
  },
  computed: {
    showNotes() {
      return this.$store.getters.getShowNotes;
    },
    currentQuestionLabel() {
      if (this.$route.query.step && this.$route.query.field !== undefined) {
        const accordionItems = form_filterAccordionItems(
          formJson[this.$route.query.step].fields
        );
        return (
          accordionItems.length > this.$route.query.field &&
          accordionItems[this.$route.query.field].label
        );
      }
      return undefined;
    },
    noteData: {
      get() {
        return this.$store.getters.getNotes;
      },
      set(value) {
        this.$store.commit('saveNotes', value);
      }
    },
    noteNewData: {
      get() {
        return this.$store.getters.getNewNotes;
      },
      set(value) {
        this.$store.commit('saveNewNotes', value);
      }
    }
  },
  watch: {
    showNotes(val) {
      if (val === true) {
        this.showAddHeadingToggle();
        this.$nextTick(function() {
          this.updateTextAreaHeight(this.$refs.ta_alreadythere);
        });
      }
    }
  },
  mounted() {
    if (this.$refs.ta_alreadythere.value !== '') {
      this.updateTextAreaHeight(this.$refs.ta_alreadythere);
    }

    if (this.$refs.ta_newtext.value !== '') {
      this.updateTextAreaHeight(this.$refs.ta_newtext);
    }
    this.currentQuestionLabel_prev = this.currentQuestionLabel;
    this.showAddHeadingToggle();
  },
  methods: {
    addHeading() {
      const textarea_alreadythere = this.$refs.ta_alreadythere;
      const textarea_newtext = this.$refs.ta_newtext;
      const heading_inserted = `*${this.currentQuestionLabel}*`;
      this.currentQuestionLabel_prev = this.currentQuestionLabel;

      textarea_alreadythere.value =
        textarea_alreadythere.value +
        '\n\n' +
        heading_inserted +
        '\n\n' +
        textarea_newtext.value;

      this.updateTextAreaHeight(textarea_alreadythere);
      this.showAddHeading = false;
      this.$store.commit(
        'savePrevQuestionLabel',
        this.currentQuestionLabel_prev
      );

      this.noteData = textarea_alreadythere.value;
      this.noteNewData = '';

      textarea_alreadythere.focus();
    },
    updateTextAreaHeight(textArea) {
      textArea.style.height = 'auto';
      textArea.style.height = textArea.scrollHeight + 'px';
    },
    showAddHeadingToggle() {
      if (
        this.currentQuestionLabel !== this.$store.getters.getPrevQuestionLabel
      ) {
        this.showAddHeading = true;
      } else {
        this.showAddHeading = false;
      }
    },
    focus_TaAlreadythere() {
      const ta = this.$refs.ta_alreadythere;
      ta.focus();
      ta.setSelectionRange(0, 0, 0);
    },
    focus_TaNewtextLastLine() {
      if (this.showAddHeading) {
        const ta = this.$refs.ta_newtext;
        ta.focus();
        ta.setSelectionRange(ta.value.length, ta.value.length);
      } else {
        const ta = this.$refs.ta_alreadythere;
        ta.focus();
        ta.setSelectionRange(ta.value.length, ta.value.length);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.an-note-text {
  width: 100%;
  height: 100vh;
  position: absolute;
  background-color: white;
  opacity: 1;
  z-index: 1;
  overflow: auto;
  display: flex;
  flex-direction: column;

  &__elementwrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  textarea {
    resize: none;
    width: 100%;
    border: 0;
    outline: none;
    display: block;
    font-size: 1.45rem;

    padding: 0 $spacer * 5 0 $spacer * 5;
  }

  &__innerContainer {
    width: 100%;
  }

  &__currentquestion {
    opacity: 0.5;
  }

  &__focusdiv {
    flex-grow: 1;
    cursor: text;
  }

  &__currentquestionwrapper {
    padding: 0 $spacer * 5 0 $spacer * 5;
    cursor: text;
  }
}
</style>
