<template>
  <fieldset class="an-toggle">
    <input
      :id="`${field_id}--0`"
      v-model="field_data"
      type="radio"
      :name="field_id"
      :value="false"
    />
    <label :for="`${field_id}--0`">{{ fieldText[0] }}</label>

    <input
      :id="`${field_id}--1`"
      v-model="field_data"
      type="radio"
      :name="field_id"
      :value="true"
    />
    <label :for="`${field_id}--1`">{{ fieldText[1] }}</label>
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
  },
  methods: {
    validate(value) {
      this.$emit('update:field_valid', value !== undefined);
    }
  }
};
</script>

<style lang="scss" scoped>
label:first-of-type {
  margin-right: $spacer * 2;
}
</style>
