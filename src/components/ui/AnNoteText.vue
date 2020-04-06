<template>
  <div v-show="showNotes" class="an-note-text">
    <AnNoteCloseButton />
    <div class="an-note-text__elementwrapper">
      <div class="an-note-text__innerContainer">
        <textarea ref="ta_alreadythere" @input="updateTextAreaHeight($event)">
Hallo Text der schon da war</textarea
        >
        <!-- oninput='this.style.height = "";this.style.height = this.scrollHeight + "px"' -->
        <div>
          <span>{{ currentQuestion }}</span>
          <button @click="addHeading()">Frage als Überschrift einfügen</button>
        </div>
        <textarea
          ref="ta_newtext"
          placeholder="Hier neue Notiz einfügen"
          rows="1"
          @input="updateTextAreaHeight($event)"
        ></textarea>
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
  methods: {
    addHeading() {
      const textarea_alreadythere = this.$refs.ta_alreadythere;
      const textarea_newtext = this.$refs.ta_newtext;
      const heading_inserted = `**> ${textarea_alreadythere.textContent}**`;

      textarea_alreadythere.value =
        textarea_alreadythere.value +
        '\n\n' +
        heading_inserted +
        '\n\n' +
        textarea_newtext.value;

      this.updateTextAreaHeight(textarea_alreadythere); // TODO

      this.parentElement.parentElement.removeChild(this.parentElement);

      textarea_newtext.parentElement.removeChild(textarea_newtext);

      textarea_alreadythere.focus();
    },
    updateTextAreaHeight(event) {
      const textArea = event.currentTarget;
      textArea.style.height = 'auto';
      textArea.style.height = textArea.scrollHeight + 'px';
    }
  }
};
</script>

<style lang="scss" scoped>
.an-note-text {
  width: 100%;
  height: 100vh;
  position: absolute;
  background: red;
  opacity: 0.9;
  z-index: 1;

  &__elementwrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  textarea {
    resize: none;
    width: 100%;
  }

  &__innerContainer {
    width: 80%;
  }
}
</style>
