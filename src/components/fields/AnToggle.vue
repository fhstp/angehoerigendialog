<template>
  <fieldset class="an-toggle">
    <legend>{{ field_label }}</legend>
    <label :for="`${field_id}--0`">{{ fieldText[0] }}</label>
    <input
      :id="`${field_id}--0`"
      v-model="field_data"
      type="radio"
      :name="field_id"
      :value="false"
    />

    <label :for="`${field_id}--1`">{{ fieldText[1] }}</label>
    <input
      :id="`${field_id}--1`"
      v-model="field_data"
      type="radio"
      :name="field_id"
      :value="true"
    />
  </fieldset>
</template>

<script>
import field from '@/mixins/field.js';

export default {
  name: 'AnToggle',
  mixins: [field],
  props: {
    fieldText: {
      type: Array,
      default: () => ['Nein', 'Ja']
    }
  }
};
</script>

<style lang="scss" scoped></style>
