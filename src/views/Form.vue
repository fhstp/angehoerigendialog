<template>
  <div class="an-form">
    <AnStepper :steps="steps" />
    <main class="an-form__content">
      <template v-for="(section, sectionId) in form">
        <section
          v-if="$route.query.step === sectionId"
          :key="sectionId"
          class="an-form__section container"
        >
          <h2 class="an-form__section-heading">{{ section.title }}</h2>

          <AnAccordion
            v-for="(field, fieldId) in section.fields"
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
        </section>
      </template>
    </main>
  </div>
</template>

<script>
import form from '@/data/form.json';
import AnField from '@/components/AnField.vue';
import AnStepper from '@/components/ui/AnStepper.vue';
import AnAccordion from '@/components/ui/AnAccordion.vue';

export default {
  name: 'Form',
  components: { AnField, AnStepper, AnAccordion },
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
