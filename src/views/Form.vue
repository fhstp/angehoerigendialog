<template>
  <div class="an-form">
    <AnStepper :steps="steps" @input="stepperNavigation()" />
    <main ref="main" class="an-form__content">
      <template v-for="(section, sectionId, sectionIndex) in form">
        <section
          v-if="$route.query.step === sectionId"
          :key="sectionId"
          class="an-form__section container"
        >
          <h2 class="an-form__section-heading">{{ section.title }}</h2>
          <AnAccordion query-param="field">
            <template v-for="(field, fieldId) in section.fields">
              <AnField
                v-if="['hint', 'heading'].includes(field.type)"
                :key="fieldId"
                :field-data="field"
                :section-id="sectionId"
                :field-id="`${sectionId}-${fieldId}`"
              />
              <AnAccordionItem v-else :key="fieldId">
                <template #header>{{ field.label }}</template>
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
          <router-link
            v-if="Object.keys(form).length === sectionIndex + 1"
            ref="finish"
            to="auswertung"
            class="btn"
            >auswerten</router-link
          >
        </section>
      </template>
    </main>
  </div>
</template>

<script>
import form from '@/data/form.json';
import AnAccordion from '@/components/ui/AnAccordion.vue';
import AnAccordionItem from '@/components/ui/AnAccordionItem.vue';
import AnField from '@/components/AnField.vue';
import AnStepper from '@/components/ui/AnStepper.vue';

const numberOfAccordionItems = sectionId => {
  let count = 0;
  for (const fieldId in form[sectionId].fields) {
    if (!['hint', 'heading'].includes(form[sectionId].fields[fieldId].type))
      count++;
  }
  return count;
};

export default {
  name: 'Form',
  components: { AnAccordion, AnAccordionItem, AnField, AnStepper },
  computed: {
    currentField() {
      return Number(this.$route.query.field);
    },
    currentStepIndex() {
      return this.steps?.findIndex(step => step.id === this.$route.query.step);
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

    this.steps = [];
    for (const sectionId in form) {
      this.steps.push({
        title: form[sectionId].titleShort ?? form[sectionId].title,
        icon: form[sectionId].icon ?? sectionId,
        id: sectionId
      });
    }

    if (!Number.isInteger(Number(this.$route.query.field))) {
      this.$router.replace({
        query: { ...this.$route.query, step: this.steps[0].id, field: 0 }
      });
    }
  },
  methods: {
    prevField() {
      const isFirstStep = this.currentStepIndex === 0;
      const isFirstFieldOfStep = this.currentField === 0;
      if (isFirstFieldOfStep && !isFirstStep) {
        this.$router.push({
          query: {
            ...this.$route.query,
            step: this.steps[this.currentStepIndex - 1].id,
            field:
              numberOfAccordionItems(this.steps[this.currentStepIndex - 1].id) -
              1
          }
        });
      } else if (!(isFirstStep && isFirstFieldOfStep)) {
        this.$router.push({
          query: {
            ...this.$route.query,
            field: this.currentField - 1
          }
        });
      }
    },
    nextField() {
      const isLastFieldOfStep =
        this.currentField ===
        numberOfAccordionItems(this.steps[this.currentStepIndex].id) - 1;
      const isLastStep = this.currentStepIndex === this.steps.length - 1;
      if (isLastStep && isLastFieldOfStep) {
        this.$router.push({
          query: {
            ...this.$route.query,
            field: -1
          }
        });
        this.$refs.finish[0].$el.focus();
      } else if (isLastFieldOfStep) {
        this.$router.push({
          query: {
            ...this.$route.query,
            step: this.steps[this.currentStepIndex + 1].id,
            field: 0
          }
        });
      } else {
        this.$router.push({
          query: {
            ...this.$route.query,
            field: this.currentField + 1
          }
        });
      }
    },
    stepperNavigation() {
      if (Number(this.$route.query.field) !== 0)
        this.$router.replace({ query: { ...this.$route.query, field: 0 } });
    }
  }
};
</script>

<style lang="scss" scoped>
.an-form {
  @media #{map-get($query, 'lg-and-up')} {
    display: flex;
    height: 100vh;
  }

  &__content {
    padding-top: $spacer;

    @media #{map-get($query, 'lg-and-up')} {
      flex-grow: 1;
      height: 100%;
      overflow: auto;
    }
  }

  &__section-heading {
    margin-bottom: $spacer * 4;
  }
}

.an-accordion-item {
  margin-bottom: $spacer;

  &--open {
    margin-top: $spacer * 2;
    margin-bottom: $spacer * 2;
  }
}
</style>

<style lang="scss">
.an-heading,
.an-hint {
  margin-bottom: $spacer;
}

.an-accordion-item {
  transition: background-color 100ms ease-in-out;

  &--open {
    background-color: #eee;
  }
}
</style>
