<template>
  <div v-show="showNotes" class="an-note-text">
    <button
      aria-label="Schließen"
      class="an-note-text__close btn"
      @click="closeNotes()"
    >
      <IconClose />
    </button>
    <div
      class="an-note-text__elementwrapper"
      @click.self="focusTaAlreadyThere()"
    >
      <div class="an-note-text__content container">
        <textarea
          v-show="showAlreadyThere"
          ref="ta_alreadythere"
          v-model="noteData"
        >
        </textarea>
        <template v-if="showAddHeading && currentQuestionLabel">
          <div class="an-note-current" @click="focusTaNewText()">
            <p class="an-note-current__header">
              Möchten Sie diese Überschrift zur Notiz einfügen?
            </p>
            <span class="an-note-current__question">
              > {{ currentQuestionLabel }}</span
            >
            <button class="an-note-current__action btn" @click="addHeading()">
              Text hinzufügen
            </button>
          </div>
          <textarea
            ref="ta_newtext"
            v-model="noteNewData"
            placeholder="Hier Notiz einfügen..."
            @input="updateTextAreaHeight($event.currentTarget)"
          ></textarea>
        </template>
      </div>
    </div>
    <div class="an-note-text__focusdiv" @click="focusTaNewText()" />
    <div class="an-note-text__savehint">
      Änderungen werden automatisch gespeichert<IconCheckmark />
    </div>
  </div>
</template>
<script>
import formJson from '@/data/form.json';
import { form_filterAccordionItems } from '@/helpers/form.js';
import IconClose from '@/assets/icons/close.svg';
import IconCheckmark from '@/assets/icons/checkmark.svg';

export default {
  name: 'AnNoteText',
  components: {
    IconClose,
    IconCheckmark
  },
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
          this.$route.query.field >= 0 &&
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
    },
    showAlreadyThere() {
      return !(
        this.noteData === '' &&
        this.showAddHeading &&
        this.currentQuestionLabel
      );
    }
  },
  watch: {
    showNotes(newValue) {
      if (newValue === true) {
        this.showAddHeadingToggle();
        this.$nextTick(function() {
          this.updateTextAreaHeight(this.$refs.ta_alreadythere);
        });
      }
    },
    noteData(newValue, oldValue) {
      if (newValue === oldValue) return;
      this.$nextTick(() => {
        this.updateTextAreaHeight(this.$refs.ta_alreadythere);
      });
    }
  },
  mounted() {
    if (this.$refs.ta_alreadythere?.value !== '') {
      this.updateTextAreaHeight(this.$refs.ta_alreadythere);
    }
    if (this.$refs.ta_newtext?.value !== '') {
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

      if (textarea_alreadythere.value !== '') {
        textarea_alreadythere.value =
          textarea_alreadythere.value +
          '\n\n' +
          heading_inserted +
          '\n\n' +
          textarea_newtext.value;
      } else {
        textarea_alreadythere.value =
          heading_inserted + '\n\n' + textarea_newtext.value;
      }

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
      if (!textArea) return;
      textArea.style.height = 'auto';
      textArea.style.height = textArea.scrollHeight + 'px';
    },
    showAddHeadingToggle() {
      this.showAddHeading =
        this.currentQuestionLabel !== this.$store.getters.getPrevQuestionLabel;
    },
    focusTaAlreadyThere() {
      const ta = this.showAlreadyThere
        ? this.$refs.ta_alreadythere
        : this.$refs.ta_newtext;
      ta.focus();
      ta.setSelectionRange(0, 0);
    },
    focusTaNewText() {
      const ta = this.$refs.ta_newtext
        ? this.$refs.ta_newtext
        : this.$refs.ta_alreadythere;
      ta.focus();
      ta.setSelectionRange(ta.value.length, ta.value.length);
    },
    closeNotes() {
      this.$store.commit('updateShowNotes', false);
      if (this.$store.getters.getNewNotes !== '') {
        if (this.$store.getters.getNotes === '') {
          this.$store.commit('saveNotes', this.$store.getters.getNewNotes);
        } else {
          this.$store.commit(
            'saveNotes',
            this.$store.getters.getNotes +
              '\n\n' +
              this.$store.getters.getNewNotes
          );
        }
        this.$store.commit('saveNewNotes', '');
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.an-note-text {
  width: 100%;
  height: 100vh;
  height: calc(var(--vh, 1vh) * 100);
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
    padding-top: 50px;
  }

  &__content {
    padding-top: $spacer * 2;
    padding-bottom: $spacer * 2;
    width: 100%;
  }

  &__close {
    position: fixed;
    right: 0;
    padding: $spacer * 2;
    line-height: 0;

    > svg {
      height: 1.2rem;
    }
  }

  textarea {
    resize: none;
    width: 100%;
    border: 0;
    outline: none;
    display: block;
    font-size: 1.45rem;
  }

  &__focusdiv {
    flex-grow: 1;
  }

  &__savehint {
    position: fixed;
    bottom: 0;
    border: 2px solid black;
    border-radius: 2px;
    box-shadow: 3px 3px 8px #ccc;
    display: flex;
    align-items: center;
    padding: $spacer * 0.5;
    background: white;
  }

  &__savehint > svg {
    height: 1.4rem;
    margin-left: $spacer;
  }
}

.an-note-current {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin: $spacer * 2 0;
  border: 3px dotted lightgrey;
  padding: $spacer * 2;

  &__header {
    margin-bottom: $spacer * 2;
    width: 100%;
  }

  &__question {
    opacity: 0.5;
  }

  &__action {
    margin: 0;
  }
}
</style>
