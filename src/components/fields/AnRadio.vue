<template>
  <fieldset class="radio">
    <legend>{{ field_label }}</legend>
    <div
      v-for="(optionValue, optionKey) in radioOptions"
      :key="`${field_id}-${optionKey}`"
    >
      <label :for="`${field_id}-${optionKey}`">{{ optionValue }}</label>
      <input
        :id="`${field_id}-${optionKey}`"
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
  radioOptions: {type: Object, default: undefined}
}
};


</script>

<style lang="scss" scoped>

.radio{
  background: blue;
}

</style>
