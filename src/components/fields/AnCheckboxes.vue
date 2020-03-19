<template>
  <fieldset class="an-checkboxes">
    <legend class="field__question">{{ field_label }}</legend>
    <div
      v-for="(option, optionId) in fieldOptions"
      :key="optionId"
      class="an-checkboxes__option"
    >
      <input
        :id="`${field_id}-${optionId}`"
        v-model="field_data"
        :name="field_id"
        :value="optionId"
        type="checkbox"
      />
      <label :for="`${field_id}-${optionId}`">{{ option }}</label>
    </div>
  </fieldset>
</template>

<script>
import field from '@/mixins/field.js';

export default {
  name: 'AnCheckboxes',
  mixins: [field],
  props: {
    fieldOptions: { type: Object, default: () => ({}) }
  },
  created() {
    if (!this.field_data) this.field_data = [];
  }
};
</script>

<style lang="scss" scoped>
.an-checkboxes__option {
  padding-top: $spacer;
  padding-bottom: $spacer;
}
</style>
