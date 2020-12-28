<template>
  <div v-if="showNotes" class="an-note">
    <div class="an-note__top-bar container">
      <div :style="{ opacity: isSaveHint ? 1 : 0 }" class="an-note__save-hint">
        Notizen werden automatisch gespeichert...
      </div>
    </div>
    <div class="an-note__elementwrapper" @click.self="focusTaAlreadyThere">
      <div class="an-note__content container">
        <div class="an-note__input-area">
          <div>
            <button
              aria-label="Schließen"
              class="an-note__close btn"
              @click="closeNotes"
            >
              <IconClose />
            </button>
            <h2 class="an-note__heading">Meine Notizen</h2>
          </div>
          <div class="an-note__controls">
            <span>Sie können Ihre Notizen bei Bedarf selbst formatieren. </span>
            <ul>
              <li>
                - Um
                <strong>Text bold</strong>
                darzustellen versehen Sie die gewünschten Passagen bitte mit
                __Text__ oder **Text**
              </li>
              <li>
                - Um
                <i>Text kursiv</i>
                darzustellen versehen Sie die gewünschten Passagen bitte mit
                _Text_ oder *Text*
              </li>
            </ul>
          </div>
          <hr />
          <textarea
            v-show="showAlreadyThere"
            ref="ta_alreadythere"
            v-model="noteData"
          >
          </textarea>
          <template v-if="showAddHeading && currentQuestionLabel">
            <div class="an-note-current">
              <div>
                <button class="an-note-current__action btn" @click="addHeading">
                  <IconAddPlus />
                </button>

                <span class="an-note-current__label"
                  >Aktuelle <strong>Kategorie</strong> und <i>Frage</i> zu
                  meinen Notizen hinzufügen
                </span>

                <span class="an-note-current__question">
                  > <strong>{{ currentQuestionCategory }}: </strong>
                  <i>{{ currentQuestionLabel | strippedContent }}</i></span
                >
              </div>
            </div>
            <hr />
            <textarea
              ref="ta_newtext"
              v-model="noteNewData"
              placeholder="Notiz einfügen …"
              class="an-note-current__textarea"
              @input="updateTextAreaHeight($event.currentTarget)"
            ></textarea>
          </template>
          <div class="an-note__focusdiv" @click="focusTaNewText" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import formJson from '@/data/form.json';
import { form_filterAccordionItems } from '@/helpers/form.js';
import { string_autosetTextareaHeight } from '@/helpers/string.js';
import { categoryMap } from '@/helpers/note.js';
import IconClose from '@/assets/icons/close.svg?inline';
import IconAddPlus from '@/assets/icons/add_plus.svg?inline';

export default {
  name: 'AnNote',
  components: {
    IconClose,
    IconAddPlus
  },
  filters: {
    strippedContent(string) {
      return string.replace(/<\/?[^>]+>/gi, ' ');
    }
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
    currentQuestionCategory() {
      return categoryMap[this.$route.query.step];
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
      const category = categoryMap[this.$route.query.step];
      const cleanedLabel = this.currentQuestionLabel.replace(
        /(<([^>]+)>)/gi,
        ''
      );
      const heading_inserted = `**${category}**: _${cleanedLabel}_`;
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
hr {
  margin-top: 10px;
  margin-bottom: 4px;
  border: 0;
  height: 1px;
  background-image: linear-gradient(
    to right,
    rgba(0184, 184, 184, 0.2),
    rgba(184, 184, 184, 0.45),
    rgba(184, 184, 184, 0.2)
  );
}

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

  &__heading {
    color: $color-theme-black;
    float: left;
    width: 50%;
    padding: 0px;
    margin-left: 5px;
    margin-bottom: 20px;
    background: white;
    box-sizing: border-box;
  }

  &__elementwrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: white;
  }

  &__content {
    padding-top: $spacer * 2;
    padding-bottom: $spacer * 2;
    width: 100%;
    background-color: white;
  }

  &__input-area {
    border: 1px solid $color-theme-darkgrey;
    border-radius: none;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: right;
    margin: 5px;
    padding: 5px;
    background-color: white;
  }

  &__close {
    box-shadow: none;
    border: 2px solid $color-theme-yellow;
    fill: $color-theme-yellow;
    border-radius: 0;
    display: flex;
    margin: 0;
    padding: 5px;
    float: right;
    background: white;
    box-sizing: border-box;
    cursor: pointer;

    > svg {
      width: 15px;
      height: 15px;
      fill: $color-theme-yellow;
      stroke: $color-theme-yellow;
    }
  }

  &__save-hint {
    color: $color-theme-darkgrey;
    transition: opacity 150ms ease-in-out;
    float: left;
    stroke: $color-theme-yellow;
    width: 100%;
  }

  &__controls {
    font-size: 8pt;
    color: $color-theme-darkgrey;
    margin-left: 5px;
    ul {
      list-style-type: none;

      li {
        margin-left: 2px;
        padding: 2px 0px;
      }
    }
  }

  textarea {
    resize: none;
    border: none;
    padding: $spacer;
    width: 100%;
    outline: none;
    display: block;
    font-size: 1.3rem;
    line-height: 1.5;
    overflow: hidden;
    background-color: white;
  }

  &__focusdiv {
    flex-grow: 1;
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
  }
}

.an-note-current {
  display: flex;
  justify-content: space-between;
  border-radius: none;
  align-items: flex-start;
  float: left;
  margin-left: 0px;
  margin-top: 0px;

  &__question {
    vertical-align: middle;
    color: #aaa;
    margin-left: 6.5%;
    padding: 0 0 0 0px;
    float: left;
    hyphens: auto;
  }

  &__action {
    background-color: white;
    border-color: none;
    vertical-align: middle;
    margin: 0;
    width: 100%;
    flex-shrink: 0;
    box-shadow: none;
    width: 5%;
    height: 5%;
    display: inline-block;
    border: none;
    border-radius: 0;
    padding: 5px;
    color: white;
    font-size: 1rem;
    transition: none;
    cursor: pointer;
  }

  &__label {
    vertical-align: middle;
    color: black;
    margin: 10px;
    padding: 0px;
  }

  &__line {
    vertical-align: middle;
    color: black;
    margin: 0 0 0 10px;
    padding: 10px;
  }
}

.hr {
  color: $color-theme-darkgrey;
  border: none;
  width: 75%;
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
