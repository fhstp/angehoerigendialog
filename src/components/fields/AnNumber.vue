<template>
  <input
    :id="field_id"
    v-model.number="field_data"
    type="number"
    :required="field_required"
    class="an-number"
  />
</template>

<script>
import field from '@/mixins/field.js';

export default {
  name: 'AnNumber',
  mixins: [field]
};
</script>
