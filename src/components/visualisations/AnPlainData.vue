<template>
  <div class="an-plain-data">
    <section
      v-for="(section, sectionId) in form"
      :key="sectionId"
      class="an-plain-data__section"
    >
      <h3>{{ section.title }}</h3>
      <div class="an-plain-data__section-fields">
        <div
          v-for="field in section.fields"
          :key="field.fieldId"
          :class="[
            'an-plain-data__field',
            { 'an-plain-data__field--break': field.type === 'checkboxes' }
          ]"
        >
          <h4>{{ field.label }}</h4>
          <AnField
            :section-id="sectionId"
            :field-id="`${sectionId}-${field.fieldId}`"
            :field-data="prepareFieldData(field)"
            :has-next="false"
            :has-prev="false"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import form from '@/data/form.json';
import { form_filterAccordionItems } from '@/helpers/form.js';
import AnField from '@/components/AnField.vue';

export default {
  name: 'AnPlainData',
  components: {
    AnField
  },
  created() {
    this.form = {};
    for (const sectionId in form) {
      if (form[sectionId].hideExport) continue;
      this.form[sectionId] = {
        title: form[sectionId].title,
        fields: form_filterAccordionItems(form[sectionId].fields)
      };
    }
  },
  methods: {
    prepareFieldData(field) {
      const fieldData = { ...field };
      delete fieldData.fieldId;
      return fieldData;
    }
  }
};
</script>

<style lang="scss" scoped>
.an-plain-data {
  counter-reset: h3;

  &__section {
    break-inside: avoid-page;
  }

  &__section-fields {
    @media print, #{map-get($query, 'md-and-up')} {
      column-count: 2;
    }
  }

  &__field:not(&__field--break) {
    break-inside: avoid-column;
  }
}
h3 {
  counter-reset: h4;
}

h3::before {
  counter-increment: h3;
  content: counter(h3) '. ';
}
h4::before {
  counter-increment: h4;
  content: counter(h3) '.' counter(h4) '. ';
}
</style>

<style lang="scss">
.an-plain-data {
  .an-field__subfields {
    .an-field {
      margin-top: $spacer !important;
      margin-left: $spacer * 2;

      &__label {
        margin-bottom: $spacer;
      }
    }
  }
}
</style>
