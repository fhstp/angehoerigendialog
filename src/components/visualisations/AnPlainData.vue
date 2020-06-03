<template>
  <div class="an-plain-data">
    <div v-for="(section, sectionId) in form" :key="sectionId">
      <h3>{{ section.title }}</h3>
      <template v-for="field in section.fields">
        <h4 :key="field.fieldId">{{ field.label }}</h4>
        <AnField
          :key="`${field.fieldId}-AnField`"
          :section-id="sectionId"
          :field-id="`${sectionId}-${field.fieldId}`"
          :field-data="prepareFieldData(field)"
          :has-next="false"
          :has-prev="false"
        />
      </template>
    </div>
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

.nocount::before {
  content: '';
  counter-increment: none;
}
</style>
