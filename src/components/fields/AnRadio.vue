<template>
  <fieldset v-if="!$store.state.printMode" class="an-radio">
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
  <div v-else v-text="fieldOptions[field_data]" />
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
  @media screen {
    padding-top: $spacer;
    padding-bottom: $spacer;
  }
}
</style>
