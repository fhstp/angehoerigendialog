<template>
  <div class="an-form">
    <AnNoteText />
    <div class="an-form__scrollarea">
      <AnStepper :steps="steps" @input="stepperNavigation()" />
      <main ref="main" class="an-form__content">
        <template v-for="(section, sectionId, sectionIndex) in form">
          <section
            v-if="$route.query.step === sectionId"
            :key="sectionId"
            class="an-form__section"
          >
            <div class="an-form__header-wrapper">
              <div class="an-form__header container">
                <h2 class="an-form__section-heading">{{ section.title }}</h2>
                <AnNoteOpenButton />
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
                <AnAccordionItem v-else :key="fieldId">
                  <template #header>
                    <span class="an-accordion-item__header-text">{{
                      field.label
                    }}</span>
                    <span class="an-accordion-item__header-icon">
                      <IconCheckmark
                        v-if="
                          $store.getters.getFieldCompletion(
                            `${sectionId}-${fieldId}`
                          )
                        "
                        aria-label="fertig ausgefüllt"
                      />
                    </span>
                  </template>
                  <template #content>
                    <AnField
                      :field-data="field"
                      :section-id="sectionId"
                      :field-id="`${sectionId}-${fieldId}`"
                      @goPrev="prevField()"
                      @goNext="nextField()"
                    />
                  </template>
                </AnAccordionItem>
              </template>
            </AnAccordion>
            <div class="container">
              <button
                v-if="steps.length === sectionIndex + 1"
                ref="sectionEndBtn"
                class="btn"
                @click="handleFinish()"
              >
                auswerten
              </button>
              <router-link
                v-else
                ref="sectionEndBtn"
                :to="{
                  query: {
                    ...$route.query,
                    step: Object.keys(form)[sectionIndex + 1],
                    field: 0
                  }
                }"
                class="btn"
              >
                Zur Kategorie &bdquo;{{ steps[sectionIndex + 1].title }}&ldquo;
              </router-link>
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
  form_numberOfAccordionItems
} from '@/helpers/form.js';
import AnAccordion from '@/components/ui/AnAccordion.vue';
import AnAccordionItem from '@/components/ui/AnAccordionItem.vue';
import AnField from '@/components/AnField.vue';
import AnNoteOpenButton from '@/components/ui/AnNoteOpenButton.vue';
import AnNoteText from '@/components/ui/AnNoteText.vue';
import AnStepper from '@/components/ui/AnStepper.vue';
import IconCheckmark from '@/assets/icons/checkmark.svg?inline';

export default {
  name: 'Form',
  components: {
    AnAccordion,
    AnAccordionItem,
    AnField,
    AnNoteOpenButton,
    AnNoteText,
    AnStepper,
    IconCheckmark
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
    }
  },
  watch: {
    '$route.query.step'(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.$refs.main.scrollTop = 0;
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
    prevField() {
      const isFirstStep = this.currentStepIndex === 0;
      const isFirstFieldOfStep = this.currentFieldIndex === 0;
      if (isFirstFieldOfStep && !isFirstStep) {
        this.$router.push({
          query: {
            ...this.$route.query,
            step: this.steps[this.currentStepIndex - 1].id,
            field:
              form_numberOfAccordionItems(
                form[this.steps[this.currentStepIndex - 1].id].fields
              ) - 1
          }
        });
      } else if (!(isFirstStep && isFirstFieldOfStep)) {
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
      if (isLastFieldOfStep) {
        this.$router.push({
          query: {
            ...this.$route.query,
            field: -1
          }
        });
        this.$refs.sectionEndBtn[0].$el
          ? this.$refs.sectionEndBtn[0].$el.focus()
          : this.$refs.sectionEndBtn[0].focus();
      } else {
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
      let allSectionsDone = true;
      for (const step of this.steps) {
        if (!step.done) {
          allSectionsDone = false;
          break;
        }
      }
      if (
        !allSectionsDone &&
        !confirm(
          'Es sind noch nicht alle Fragen als abgeschlossen markiert. Möchten Sie trotzdem zur Auswertung fortfahren?'
        )
      )
        return;
      this.$router.push({ path: 'auswertung' });
    }
  }
};
</script>

<style lang="scss" scoped>
.an-form {
  @media #{map-get($query, 'lg-and-up')} {
    display: flex;
    height: 100vh;
    height: calc(var(--vh, 1vh) * 100);
  }

  &__content {
    @media #{map-get($query, 'lg-and-up')} {
      flex-grow: 1;
      height: 100%;
      overflow: auto;
    }
  }

  &__section-heading {
    flex-grow: 1;
  }

  &__header-wrapper {
    position: sticky;
    top: 0;
    background-color: white;
    padding-top: $spacer;
    padding-bottom: $spacer;
    box-shadow: 3px 3px 8px #ccc;
    margin-bottom: $spacer * 2;
    z-index: 1;
  }

  &__header {
    display: flex;
    align-items: flex-end;
  }

  &__scrollarea {
    width: 100vw;
    overflow: auto;
    height: 100vh;
    height: calc(var(--vh, 1vh) * 100);

    @media #{map-get($query, 'lg-and-up')} {
      display: flex;
    }
  }
}

.an-note-open {
  margin-left: $spacer;
}

.an-note-text {
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
