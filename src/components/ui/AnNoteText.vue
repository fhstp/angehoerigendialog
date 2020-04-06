<template>
  <div v-show="showNotes" class="an-note-text">
    <AnNoteCloseButton />
    <div class="an-note-text__elementwrapper">
      <div class="an-note-text__innerContainer">
        <textarea
          ref="ta_alreadythere"
          @input="updateTextArea($event.currentTarget)"
        >
          Hallo Text der schon da war</textarea
        >
        <template v-if="showAddHeading">
          <div>
            <span class="an-note-text__currentquestion">
              > {{ currentQuestion }}</span
            >
            <button @click="addHeading()">
              Frage als Überschrift
            </button>
          </div>
          <textarea
            ref="ta_newtext"
            placeholder="Hier neue Notiz einfügen"
            @input="updateTextArea($event.currentTarget)"
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
      currentQuestion_prev: undefined
    };
  },
  computed: {
    showNotes() {
      return this.$store.getters.getNotes;
    },
    currentQuestion() {
      return Object(
        formJson[this.$route.query.step].fields[this.$route.query.field].label
      );
    }
  },
  watch: {
    showNotes(val) {
      if (val === true) {
        this.showAddHeadingFunction();
      }
    }
  },
  methods: {
    addHeading() {
      const textarea_alreadythere = this.$refs.ta_alreadythere;
      const textarea_newtext = this.$refs.ta_newtext;
      const heading_inserted = `*${this.currentQuestion}*`;
      this.currentQuestion_prev = this.currentQuestion;

      textarea_alreadythere.value =
        textarea_alreadythere.value +
        '\n\n' +
        heading_inserted +
        '\n\n' +
        textarea_newtext.value;

      this.updateTextArea(textarea_alreadythere);
      this.showAddHeading = false;

      textarea_alreadythere.focus();
    },
    updateTextArea(textArea) {
      textArea.textContent = textArea.value;
      textArea.style.height = 'auto';
      textArea.style.height = textArea.scrollHeight + 'px';
    },
    showAddHeadingFunction() {
      if (this.currentQuestion !== this.currentQuestion_prev) {
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
