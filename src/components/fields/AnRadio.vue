<template>
  <fieldset class="an-radio">
    <legend>{{ field_label }}</legend>
    <div
      v-for="(optionValue, optionKey) in fieldOptions"
      :key="`${field_id}-${optionKey}`"
    >
      <label :for="`${field_id}-${optionKey}`">{{ optionValue }}</label>
      <input
        :id="`${field_id}-${optionKey}`"
        v-model="field_data"
        type="radio"
        :name="field_id"
        :value="optionKey"
      />
    </div>
  </fieldset>
</template>

<script>
import field from '@/mixins/field.js';

export default {
  name: 'AnRadio',
  mixins: [field],
  props: {
    fieldOptions: { type: Object, default: undefined }
  }
};
</script>

<style lang="scss" scoped></style>
