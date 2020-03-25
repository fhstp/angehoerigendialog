<template>
  <div class="an-number">
    <label :for="field_id" class="field__question">{{ field_label }}</label>
    <input
      :id="field_id"
      v-model.number="field_data"
      type="number"
      :required="field_required"
    />
  </div>
</template>

<script>
import field from '@/mixins/field.js';

export default {
  name: 'AnNumber',
  mixins: [field]
};
</script>
