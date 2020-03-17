<template>
  <div>
    <section v-for="(section, sectionId) in form" :key="sectionId">
      <h2>{{ section.title }}</h2>

      <AnField
        v-for="(field, fieldId) in section.fields"
        :key="fieldId"
        :field-data="field"
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
section:nth-child(odd) {
  background-color: crimson;
}
.an-field {
  margin: 1rem;
}
.an-field:nth-child(odd) {
  background-color: greenyellow;
}

.an-field:nth-child(even) {
  background-color: palevioletred;
}

pre {
  white-space: normal;
}
</style>
