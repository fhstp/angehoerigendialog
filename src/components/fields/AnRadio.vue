<template>
  <fieldset class="an-radio">
    <div
      v-for="(optionValue, optionKey) in fieldOptions"
      :key="`${field_id}-${optionKey}`"
      class="an-radio__option"
    >
      <input
        :id="`${field_id}-${optionKey}`"
        v-model="field_data"
        type="radio"
        :name="field_id"
        :value="optionKey"
      />
      <label :for="`${field_id}-${optionKey}`">{{ optionValue }}</label>
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
  },
  methods: {
    validate(value) {
      this.$emit('update:field_valid', value !== undefined);
    }
  }
};
</script>

<style lang="scss" scoped>
.an-radio__option {
  padding-top: $spacer;
  padding-bottom: $spacer;
}
</style>
