<template>
  <div class="an-number">
    <label :for="field_id">{{ field_label }}</label>
    <input
      :id="field_id"
      v-model="field_data"
      type="number"
      :required="field_required"
    />
  </div>
</template>

<script>
import field from '@/mixins/field';

export default {
  name: 'AnNumber',
  mixins: [field]
};
</script>
