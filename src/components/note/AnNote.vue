<template>
  <div v-if="showNotes" class="an-note">
    <div class="an-note__top-bar container">
      <button
        aria-label="Schließen"
        class="an-note__close btn"
        @click="closeNotes"
      >
        <IconNavigateBefore /> Zum Fragebogen zurückkehren
      </button>
      <div :style="{ opacity: isSaveHint ? 1 : 0 }" class="an-note__save-hint">
        Notizen werden automatisch gespeichert
      </div>
    </div>
    <div class="an-note__elementwrapper" @click.self="focusTaAlreadyThere()">
      <div class="an-note__content container">
        <h2 class="an-note__heading">Meine Notizen</h2>
        <div class="an-note__input-area">
          <textarea
            v-show="showAlreadyThere"
            ref="ta_alreadythere"
            v-model="noteData"
          >
          </textarea>
          <template v-if="showAddHeading && currentQuestionLabel">
            <div class="an-note-current" @click="focusTaNewText()">
              <button class="an-note-current__action btn" @click="addHeading()">
                Aktuell offene Frage als Überschrift<br />zu meinen Notizen
                hinzufügen
              </button>
              <span class="an-note-current__question">
                > {{ currentQuestionLabel }}</span
              >
            </div>
            <textarea
              ref="ta_newtext"
              v-model="noteNewData"
              placeholder="Notiz einfügen …"
              class="an-note-current__textarea"
              @input="updateTextAreaHeight($event.currentTarget)"
            ></textarea>
          </template>
        </div>
      </div>
    </div>
    <div class="an-note__focusdiv" @click="focusTaNewText()" />
  </div>
</template>
<script>
import formJson from '@/data/form.json';
import { form_filterAccordionItems } from '@/helpers/form.js';
import { string_autosetTextareaHeight } from '@/helpers/string.js';
import IconNavigateBefore from '@/assets/icons/navigate_before.svg?inline';

export default {
  name: 'AnNote',
  components: {
    IconNavigateBefore
  },
  data() {
    return {
      currentQuestionLabel_prev: this.$store.getters.getPrevQuestionLabel,
      showAddHeading: true,
      isSaveHint: false
    };
  },
  computed: {
    showNotes() {
      return this.$route.hash === '#notiz';
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
        this.showSaveHint();
        this.$store.commit('updateNotes', value);
      }
    },
    noteNewData: {
      get() {
        return this.$store.getters.getNewNotes;
      },
      set(value) {
        this.showSaveHint();
        this.$store.commit('updateNewNotes', value);
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
      if (newValue) {
        this.showAddHeadingToggle();
        this.$nextTick(function () {
          this.updateTextAreaHeight(this.$refs.ta_alreadythere);
          this.updateTextAreaHeight(this.$refs.ta_newtext);
        });
        document.addEventListener('keydown', this.closeNotes);
        document.body.classList.add('fixed');
      } else {
        document.body.classList.remove('fixed');
        this.afterCloseNotes();
        document.removeEventListener('keydown', this.closeNotes);
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
    if (this.showNotes) {
      document.addEventListener('keydown', this.closeNotes);
    }
  },
  beforeDestroy() {
    document.removeEventListener('keydown', this.closeNotes);
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
        'updatePrevQuestionLabel',
        this.currentQuestionLabel_prev
      );
      this.noteData = textarea_alreadythere.value;
      this.noteNewData = '';
      textarea_alreadythere.focus();
    },
    updateTextAreaHeight(textArea) {
      if (!textArea) return;
      const anNoteEl = document.getElementsByClassName('an-note')[0];
      const currentScrollTop = anNoteEl.scrollTop;
      string_autosetTextareaHeight(textArea);
      anNoteEl.scrollTop = currentScrollTop;
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
    closeNotes(event) {
      if (event?.type === 'keydown' && event.keyCode !== 27) return;
      this.$router.replace({ query: { ...this.$route.query } });
    },
    afterCloseNotes() {
      if (this.$store.getters.getNewNotes !== '') {
        this.$store.commit(
          'updateNotes',
          this.$store.getters.getNotes === ''
            ? this.$store.getters.getNewNotes
            : `${this.$store.getters.getNotes}\n\n${this.$store.getters.getNewNotes}`
        );

        this.$store.commit('updateNewNotes', '');
      }
    },
    showSaveHint() {
      clearTimeout(this.showSaveHintTimeout);
      clearTimeout(this.removeSaveHintTimeout);
      this.isSaveHint = false;
      this.showSaveHintTimeout = setTimeout(() => {
        this.isSaveHint = true;
      }, 700);
      this.removeSaveHintTimeout = setTimeout(() => {
        this.isSaveHint = false;
      }, 3000);
    }
  }
};
</script>

<style lang="scss" scoped>
.an-note {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: white;
  opacity: 1;
  z-index: 1;
  overflow: auto;
  display: flex;
  flex-direction: column;
  background-color: $color-theme-lightgrey;

  &__heading {
    color: $color-theme-darkred;
  }

  &__elementwrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: $color-theme-lightgrey;
  }

  &__content {
    padding-top: $spacer * 2;
    padding-bottom: $spacer * 2;
    width: 100%;
  }

  &__input-area {
    border: 2px solid $color-theme-darkgrey;
    border-radius: $border-radius;
    padding: $spacer;
    background-color: white;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  &__close {
    margin-right: $spacer;
    padding-left: $spacer;
    display: inline-flex;

    > svg {
      height: 1.2rem;
    }
  }

  &__save-hint {
    color: $color-theme-darkgrey;
    transition: opacity 150ms ease-in-out;
  }

  textarea {
    resize: none;
    width: 100%;
    border: 0;
    outline: none;
    display: block;
    font-size: 1.45rem;
    line-height: 1.5;
    overflow: hidden;
  }

  &__focusdiv {
    flex-grow: 1;
    background-color: $color-theme-lightgrey;
  }

  &__savehint > svg {
    height: 1.4rem;
    margin-left: $spacer;
  }

  &__top-bar {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    position: sticky;
    top: 0;
    left: 0;
    background-color: white;
    padding-top: $spacer;
    padding-bottom: $spacer;
    width: 100%;
    background-color: $color-theme-lightgrey;
  }
}

.an-note-current {
  display: flex;
  justify-content: space-between;
  border-radius: $border-radius;
  padding: $spacer * 2;
  align-items: flex-start;

  &__question {
    color: #aaa;
  }

  &__action {
    margin: 0;

    width: 40%;
    flex-shrink: 0;
    margin-right: 17px;
  }

  &__textarea {
    flex-grow: 1;
  }
}

textarea {
  &:not(:first-child) {
    margin-top: $spacer * 2;
  }

  &:not(:last-child) {
    margin-bottom: $spacer * 2;
  }
}
</style>
