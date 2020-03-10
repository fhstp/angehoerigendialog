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
        <component
          :is="mapping['text']"
          v-if="field.type === 'text'"
          :field-id="`${sectionId}-${fieldId}`"
          :field-label="field.label"
          :field-required="field.required"
        />
        <div v-else>
          Frage von Typ: {{ field.type }}
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import form from '@/data/form.json'

// Question Types
import AdText from './fields/AdText';

export default {
  name: 'AdForm',
  components: {
    AdText
  },
  created() {
    this.mapping = {
      text: 'AdText'
    };

    this.form = form
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
