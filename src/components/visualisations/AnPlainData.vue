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
  margin-top: $spacer * 8;

  &__section {
    break-inside: avoid-page;

    @media screen {
      margin-bottom: $spacer * 8;
    }
  }

  &__section-fields {
    @media print, #{map-get($query, 'md-and-up')} {
      column-count: 2;
      column-gap: $spacer * 4;
    }
  }

  &__field:not(&__field--break) {
    break-inside: avoid-column;
    &:not(:last-child) {
      margin-bottom: $spacer * 2;
    }
  }
}
h3 {
  margin-bottom: $spacer;
  counter-reset: h4;
  &::before {
    counter-increment: h3;
    content: counter(h3) '. ';
  }
}

h4 {
  border-bottom: 1px solid $color-theme-lightgrey;
  margin-bottom: $spacer;
  padding-bottom: $spacer / 2;
  font-weight: normal;
  &::before {
    counter-increment: h4;
    content: counter(h3) '.' counter(h4) '. ';
  }
}
</style>

<style lang="scss">
.an-plain-data {
  .an-field__subfields {
    .an-field {
      margin-top: $spacer !important;
      margin-left: $spacer * 2;

      @media print {
        margin-left: $spacer;
      }

      &__label {
        margin-bottom: $spacer;
      }
    }
  }
}
</style>
