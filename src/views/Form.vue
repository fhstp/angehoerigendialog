<template>
  <div class="an-form">
    <AnNote />
    <div class="an-form__scrollarea">
      <AnStepper :steps="steps" @input="stepperNavigation()" />
      <main class="an-form__content">
        <template v-for="(section, sectionId, sectionIndex) in form">
          <section
            v-if="$route.query.step === sectionId"
            :key="sectionId"
            class="an-form__section"
          >
            <div class="an-form__header-wrapper">
              <div class="an-form__header container">
                <h2 class="an-form__section-heading">
                  {{ sectionIndex + 1 }}. {{ section.title }}
                </h2>
                <AnNoteOpen />
              </div>
            </div>
            <AnAccordion class="container" query-param="field">
              <template v-for="(field, fieldId) in section.fields">
                <AnField
                  v-if="!form_isInAccordion(field.type)"
                  :key="fieldId"
                  :field-data="field"
                  :section-id="sectionId"
                  :field-id="`${sectionId}-${fieldId}`"
                />
                <AnAccordionItem
                  v-else
                  :key="fieldId"
                  :ready="
                    $store.getters.getFieldCompletion(`${sectionId}-${fieldId}`)
                  "
                >
                  <template #header>
                    <span
                      v-html-safe="field.label"
                      class="an-accordion-item__header-text"
                    ></span>
                    <span class="an-accordion-item__header-icon"> </span>
                  </template>
                  <template #content>
                    <AnField
                      :field-data="field"
                      :section-id="sectionId"
                      :field-id="`${sectionId}-${fieldId}`"
                      :has-prev="hasPrevField(fieldId)"
                      :has-next="hasNextField(fieldId)"
                      @goPrev="prevField()"
                      @goNext="nextField()"
                    />
                  </template>
                </AnAccordionItem>
              </template>
            </AnAccordion>
            <div class="container">
              <div
                v-if="
                  steps.length === sectionIndex + 1 && showOpenQuestions == true
                "
                class="an-form__openquestions"
              >
                <div
                  v-if="openQuestions.length > 0"
                  class="an-form__openquestions-heading-wrapper"
                >
                  <IconWarning class="an-form__openquestions-icon-warning" />
                  <h3 class="an-form__openquestions-heading">Offene Fragen</h3>
                </div>

                <div
                  v-for="(openQuestion, questionIndex) in openQuestions"
                  :key="questionIndex"
                >
                  <div class="an-form__openquestions-heading-section">
                    {{ `Kategorie "${openQuestion[0].sectionTitle}"` }}
                  </div>
                  <router-link
                    v-for="(question, i) in openQuestion"
                    :key="i"
                    :to="{
                      query: {
                        ...$route.query,
                        step: question.sectionId,
                        field: question.fieldKey
                      }
                    }"
                  >
                    <div
                      v-html-safe="question.label"
                      class="an-form__openquestions-item"
                    ></div>
                  </router-link>
                </div>
              </div>

              <button
                v-if="steps.length === sectionIndex + 1"
                class="an-form__done btn"
                @click="handleFinish()"
              >
                {{ buttonText }}
              </button>
              <div v-else class="an-form__further">
                <router-link
                  :to="{
                    query: {
                      ...$route.query,
                      step: Object.keys(form)[sectionIndex + 1],
                      field: 0
                    }
                  }"
                  class="an-form__further-btn btn"
                >
                  <IconTriangle />
                </router-link>
                <span>
                  Weiter zu <b>{{ steps[sectionIndex + 1].title }}</b></span
                >
              </div>
            </div>
          </section>
        </template>
      </main>
    </div>
  </div>
</template>

<script>
import form from '@/data/form.json';
import {
  form_isInAccordion,
  form_numberOfAccordionItems,
  form_filterAccordionItems
} from '@/helpers/form.js';
import AnAccordion from '@/components/ui/AnAccordion.vue';
import AnAccordionItem from '@/components/ui/AnAccordionItem.vue';
import AnField from '@/components/AnField.vue';
import AnNote from '@/components/note/AnNote.vue';
import AnNoteOpen from '@/components/note/AnNoteOpen.vue';
import AnStepper from '@/components/ui/AnStepper.vue';
import IconWarning from '@/assets/icons/warning.svg?inline';
import IconTriangle from '@/assets/icons/dreieck.svg?inline';

export default {
  name: 'Form',
  components: {
    AnAccordion,
    AnAccordionItem,
    AnField,
    AnNote,
    AnNoteOpen,
    AnStepper,
    IconWarning,
    IconTriangle
  },
  data() {
    return {
      showOpenQuestions: false
    };
  },
  computed: {
    currentFieldIndex() {
      return Number(this.$route.query.field);
    },
    currentStepIndex() {
      return this.steps?.findIndex(step => step.id === this.$route.query.step);
    },
    steps() {
      const steps = [];
      for (const sectionId in form) {
        steps.push({
          title: form[sectionId].titleShort ?? form[sectionId].title,
          icon: form[sectionId].icon ?? sectionId,
          id: sectionId,
          done: this.$store.getters.getSectionCompletion(sectionId)
        });
      }
      return steps;
    },
    openQuestions() {
      const openQuestions = [[], [], [], [], [], [], [], [], [], []]; // TODO refactor
      let i = 0;

      for (const sectionId in form) {
        const accordionItems = form_filterAccordionItems(
          form[sectionId].fields
        );

        accordionItems.forEach((key, index) => {
          const fieldKey = accordionItems[index].fieldId;

          const done = this.$store.getters.getFieldCompletion(
            `${sectionId}-${fieldKey}`
          );

          if (!done && done !== undefined) {
            openQuestions[i].push({
              sectionId,
              sectionTitle: form[sectionId].titleShort ?? form[sectionId].title,
              fieldKey: index,
              label: accordionItems[index].label
            });
          }
        });
        i++;
      }

      return openQuestions.filter(list => list.length);
    },
    buttonText() {
      return !this.showOpenQuestions ? 'Auswerten' : 'Trotzdem auswerten';
    }
  },
  watch: {
    '$route.query.step'(newValue, oldValue) {
      if (newValue !== oldValue) {
        document.documentElement.scrollTop = 0;
      }
    },
    openQuestions(newValue) {
      if (newValue.length === 0) {
        this.showOpenQuestions = false;
      }
    }
  },
  created() {
    this.form = form;

    this.initAnswersStore();

    if (!Number.isInteger(Number(this.$route.query.field))) {
      this.$router.replace({
        query: { ...this.$route.query, step: this.steps[0].id, field: 0 }
      });
    }
  },
  methods: {
    form_isInAccordion,
    initAnswersStore() {
      for (const sectionKey in form) {
        for (const fieldKey in form[sectionKey].fields) {
          const fieldId = `${sectionKey}-${fieldKey}`;
          if (
            form_isInAccordion(form[sectionKey].fields[fieldKey].type) &&
            !Object.hasOwnProperty.call(this.$store.state.answers, fieldId)
          )
            this.$store.commit('updateAnswerCompletion', {
              fieldIds: [fieldId],
              value: false
            });
        }
      }
    },
    hasPrevField(fieldId) {
      const currentStepFields = form_filterAccordionItems(
        form[this.steps[this.currentStepIndex].id].fields
      );
      const fieldIndex = currentStepFields.findIndex(
        field => field.fieldId === fieldId
      );

      return fieldIndex !== 0;
    },
    hasNextField(fieldId) {
      const currentStepFields = form_filterAccordionItems(
        form[this.steps[this.currentStepIndex].id].fields
      );
      const fieldIndex = currentStepFields.findIndex(
        field => field.fieldId === fieldId
      );

      return fieldIndex !== currentStepFields.length - 1;
    },
    prevField() {
      const isFirstFieldOfStep = this.currentFieldIndex === 0;
      if (!isFirstFieldOfStep) {
        this.$router.push({
          query: {
            ...this.$route.query,
            field: this.currentFieldIndex - 1
          }
        });
      }
    },
    nextField() {
      const isLastFieldOfStep =
        this.currentFieldIndex ===
        form_numberOfAccordionItems(
          form[this.steps[this.currentStepIndex].id].fields
        ) -
          1;
      if (!isLastFieldOfStep) {
        this.$router.push({
          query: {
            ...this.$route.query,
            field: this.currentFieldIndex + 1
          }
        });
      }
    },
    stepperNavigation() {
      if (Number(this.$route.query.field) !== 0)
        this.$router.replace({ query: { ...this.$route.query, field: 0 } });
    },
    handleFinish() {
      if (!this.showOpenQuestions) {
        if (this.openQuestions.length > 0) {
          this.showOpenQuestions = true;
          return;
        }
      }
      this.$router.push({ path: 'auswertung' });
    }
  }
};
</script>

<style lang="scss" scoped>
.an-form {
  &__content {
    flex-grow: 1;
    z-index: 1;
    min-height: 100vh;
    min-height: calc(var(--vh, 1vh) * 100);
    @media #{map-get($query, 'lg-and-up')} {
      margin-left: 300px;
    }
  }

  &__section-heading {
    flex-grow: 1;
  }

  &__header-wrapper {
    top: 0;
    background-color: white;
    padding-top: $spacer;
    padding-bottom: $spacer;
    margin-bottom: $spacer * 2;
    z-index: 1;
    color: black;
  }

  &__header {
    display: flex;
    align-items: flex-end;
  }

  &__scrollarea {
    display: flex;
    flex-direction: column;
  }

  &__done {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: $spacer * 10;
    margin-bottom: $spacer * 10;
    margin-right: auto;
    margin-left: auto;
    width: 15vh;
    height: 15vh;

    border: none;
    box-shadow: 0 0 0 0 #ffd700;
    border-radius: 50%;
    padding: 3px;
    background-color: $color-theme-yellow;
    outline: none;

    font-weight: bold;
    font-size: 0.9em;
    color: $color-theme-darkgrey;
    text-align: center;
    // background-image: url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/173024/jonathanlarradet_copy.png);
    // background-size: cover;
    // background-repeat: no-repeat;
    cursor: pointer;
    -webkit-animation: pulse 2.4s infinite cubic-bezier(0.66, 0, 0, 1);
    -moz-animation: pulse 2.4s infinite cubic-bezier(0.66, 0, 0, 1);
    -ms-animation: pulse 2.4s infinite cubic-bezier(0.66, 0, 0, 1);
    animation: pulse 2.4s infinite cubic-bezier(0.66, 0, 0, 1);
  }

  &__done:hover {
    -webkit-animation: none;
    -moz-animation: none;
    -ms-animation: none;
    animation: none;

    border: 2px solid $color-theme-lightgrey;
    box-shadow: 0 2px 5px 0 #666;
    background: #ffbe1b;
  }

  &__further {
    display: flex;
    align-items: center;

    &-btn {
      margin-right: 10px;
      border: 2px solid #ffbe1b;
      width: 40px;
      text-align: center;
      svg {
        position: relative;
        left: 50%;
        -webkit-transform: scale(10) translateY(-8%);
        -ms-transform: scale(10) translateY(-8%);
        transform: scale(10) translateY(-8%);
        fill: #ffbe1b;
      }

      &:hover {
        background-color: transparent;
      }
    }
  }

  @-webkit-keyframes pulse {
    to {
      box-shadow: 0 0 0 45px rgba(241, 204, 35, 0);
    }
  }
  @-moz-keyframes pulse {
    to {
      box-shadow: 0 0 0 45px rgba(241, 204, 35, 0);
    }
  }
  @-ms-keyframes pulse {
    to {
      box-shadow: 0 0 0 45px rgba(241, 204, 35, 0);
    }
  }
  @keyframes pulse {
    to {
      box-shadow: 0 0 0 45px rgba(241, 204, 35, 0);
    }
  }

  &__openquestions {
    margin-top: $spacer * 8;
    margin-bottom: $spacer * 2;
    border-radius: 3px;
    font-size: 1.2rem;

    &-item {
      margin-bottom: $spacer * 2;
      margin-top: $spacer * 2;
      padding: 1rem;
      color: $color-theme-darkgrey;
      text-decoration: none;
      cursor: pointer;
      border-width: 1px;
      border-style: solid;
      border-color: $color-theme-lightgrey;
    }

    &-heading-wrapper {
      display: flex;
      align-items: flex-end;
      margin-bottom: $spacer * 2;
    }

    &-heading {
      color: $color-theme-darkblue;
    }

    &-heading-section {
      color: $color-theme-darkblue;
      font-weight: bold;
    }

    &-icon-warning {
      width: 35px;
      margin-right: 0.5rem;
      fill: $color-theme-darkblue;
    }
  }
  .router-link-active {
    text-decoration: none;
  }
}

.an-stepper {
  flex-shrink: 0;
}

.an-note-open {
  margin-left: $spacer;
}

.an-note {
  z-index: 100;
}
</style>

<style lang="scss">
.an-heading,
.an-hint {
  margin-top: $spacer * 4;
  margin-bottom: $spacer * 2;
}

.an-accordion-item {
  margin-bottom: $spacer;
  transition: background-color 100ms ease-in-out;

  &--open {
    background-color: #eee;
    margin-top: $spacer * 2;
    margin-bottom: $spacer * 2;
  }

  &__header {
    display: flex;
  }

  &__header-text {
    flex-grow: 1;
  }

  &__header-icon {
    width: 1.2rem;
    height: 1.2rem;
    flex-shrink: 0;
  }
}
</style>
