<template>
  <div>
    <section
      v-for="(section, sectionId) in form"
      :key="sectionId"
    >
      <h2>{{ section.title }}</h2>

      <div
        v-for="(field, fieldId) in section.fields"
        :key="fieldId"
        class="question"
      >
        <!-- TODO prepare field props -->
        <AdField
          v-bind="prepareFieldProps(field)"
          :field_id="`${sectionId}-${fieldId}`"
        />
      </div>
    </section>
  </div>
</template>

<script>
import form from '@/data/form.json'
import AdField from '@/components/fields/AdField.vue';

export default {
  name: 'AdForm',
  components: {
    AdField
  },
  created() {
    this.form = form
  },
  methods: {
    prepareFieldProps: field => {
      const newField = {};
      for (const key in field) {
        if (key === 'subfields') {
          newField['subquestions'] = field[key];
        } else {
          newField[`field_${key}`] = field[key];
        }
      }
      return newField;
    }
  }
};
</script>

<style lang="scss" scoped>
section:nth-child(odd) {
  background-color: crimson;
}
.question {
  margin: 1rem;
}
.question:nth-child(odd) {
  background-color: greenyellow
}
</style>
