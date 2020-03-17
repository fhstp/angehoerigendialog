<template>
  <fieldset class="an-checkboxes">
    <legend>{{ field_label }}</legend>
    <div
      v-for="(option, optionId) in field_options"
      :key="optionId"
    >
      <input
        :id="`${field_id}-${optionId}`"
        v-model="field_data"
        :name="field_id"
        :value="optionId"
        type="checkbox"
      >
      <label :for="`${field_id}-${optionId}`">{{ option }}</label>
    </div>
  </fieldset>
</template>

<script>
import field from '@/mixins/field.js';

export default {
  name: 'AnCheckboxes',
  mixins: [field]
}
</script>
