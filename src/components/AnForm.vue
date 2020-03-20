<template>
  <div class="an-form container">
    <section
      v-for="(section, sectionId) in form"
      :key="sectionId"
      class="an-form__section"
    >
      <h2 class="an-form__section-heading">{{ section.title }}</h2>

      <AnField
        v-for="(field, fieldId) in section.fields"
        :key="fieldId"
        :field-data="field"
        :section-id="sectionId"
        :field-id="`${sectionId}-${fieldId}`"
      />
    </section>
  </div>
</template>

<script>
import form from '@/data/form.json';
import AnField from '@/components/AnField.vue';

export default {
  name: 'AnForm',
  components: { AnField },
  created() {
    this.form = form;
  }
};
</script>

<style lang="scss" scoped>
.an-form {
  margin-top: $spacer;

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
