<template>
  <input
    :id="field_id"
    v-model="field_data"
    type="date"
    required
    class="an-date"
  />
</template>

<script>
import field from '@/mixins/field.js';

export default {
  name: 'AnDate',
  mixins: [field],
  created() {
    if (!this.field_data)
      this.field_data = new Date().toISOString().slice(0, 10);
  }
};
</script>
