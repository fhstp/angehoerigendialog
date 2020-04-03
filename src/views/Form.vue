<template>
  <div class="an-form">
    <AnNoteText />
    <AnStepper :steps="steps" />
    <main ref="main" class="an-form__content">
      <AnNoteButton />
      <template v-for="(section, sectionId, index) in form">
        <section
          v-if="$route.query.step === sectionId"
          :key="sectionId"
          class="an-form__section container"
        >
          <h2 class="an-form__section-heading">{{ section.title }}</h2>

          <template v-for="(field, fieldId) in section.fields">
            <AnField
              v-if="field.type === 'hint' || field.type === 'heading'"
              :key="fieldId"
              :field-data="field"
              :section-id="sectionId"
              :field-id="`${sectionId}-${fieldId}`"
            />
            <AnAccordion
              v-else
              :key="fieldId"
              :field-id="fieldId"
              :field="field"
            >
              <AnField
                :field-data="field"
                :section-id="sectionId"
                :field-id="`${sectionId}-${fieldId}`"
              />
            </AnAccordion>
          </template>
          <router-link
            v-if="Object.keys(form).length === index + 1"
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
import AnField from '@/components/AnField.vue';
import AnNoteButton from '@/components/ui/AnNoteButton.vue';
import AnNoteText from '@/components/ui/AnNoteText.vue';
import AnStepper from '@/components/ui/AnStepper.vue';

export default {
  name: 'Form',
  components: { AnAccordion, AnField, AnStepper, AnNoteButton, AnNoteText },
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

  &__section {
    margin-bottom: $spacer * 4;
  }

  &__section-heading {
    margin-bottom: $spacer;
  }
}

.an-field {
  margin-bottom: $spacer * 2;
}
</style>
