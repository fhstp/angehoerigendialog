<template>
  <fieldset>
    <legend>{{ field_label }}</legend>
    <div
      v-for="(optionValue, optionKey) in field_options"
      :key="`${field_id}-${optionKey}`"
    >
      <label :for="`${field_id}-${optionKey}`">{{ optionValue }}</label>
      <input
        :id="`${field_id}-${optionKey}`"
        v-model="field_data"
        type="radio"
        :name="field_id"
        :value="optionValue"
      >
    </div>
  </fieldset>
</template>

<script>
import field from '@/mixins/field';

export default {
  name: 'AnRadio',
  mixins: [field],
  props: {
  field_options: {type: Object, default: undefined}
}
};


</script>

<style lang="scss" scoped>

</style>
