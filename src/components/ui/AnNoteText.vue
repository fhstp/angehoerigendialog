<template>
  <div v-show="showNotes" class="an-note-text">
    <AnNoteCloseButton />
    <div class="an-note-text__elementwrapper">
      <div class="an-note-text__innerContainer">
        <textarea
          ref="ta_alreadythere"
          v-model="noteData"
          @input="updateTextAreaHeight($event.currentTarget)"
        >
        </textarea>
        <template v-if="showAddHeading">
          <div>
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
            placeholder="Hier neue Notiz einfügen"
            @input="updateTextAreaHeight($event.currentTarget)"
          ></textarea>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import formJson from '@/data/form.json';
import AnNoteCloseButton from '@/components/ui/AnNoteCloseButton.vue';

export default {
  name: 'AnNoteText',
  components: { AnNoteCloseButton },
  data() {
    return {
      showAddHeading: true,
      currentQuestionLabel_prev: undefined
    };
  },
  computed: {
    showNotes() {
      return this.$store.getters.getShowNotes;
    },
    currentQuestionLabel() {
      if (this.$route.query.step && this.$route.query.field !== undefined) {
        return formJson[this.$route.query.step].fields[this.$route.query.field]
          .label;
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
        this.showAddHeadingFunction();
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
    this.showAddHeadingFunction();
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

      this.noteData = textarea_alreadythere.value;
      this.noteNewData = '';

      textarea_alreadythere.focus();
    },
    updateTextAreaHeight(textArea) {
      textArea.style.height = 'auto';
      textArea.style.height = textArea.scrollHeight + 'px';
    },
    showAddHeadingFunction() {
      // TODO: when reloading, currentQuestionLabel_prev is undefined
      if (this.currentQuestionLabel !== this.currentQuestionLabel_prev) {
        this.showAddHeading = true;
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
  background: white;
  opacity: 1;
  z-index: 1;

  &__elementwrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  textarea {
    resize: none;
    width: 100%;
    border: 0;
    //outline: none;
  }

  &__innerContainer {
    width: 80%;
  }

  &__currentquestion {
    opacity: 0.5;
  }
}
</style>
