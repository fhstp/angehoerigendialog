<template>
  <div>
    <label :for="field_id" class="field__question">{{ field_label }}</label>
    <input :id="field_id" v-model="field_data" type="time" required />
  </div>
</template>

<script>
import field from '@/mixins/field.js';

export default {
  name: 'AnTime',
  mixins: [field],
  created() {
    if (!this.field_data) {
      const currentTime = new Date();
      const hour = String(currentTime.getHours()).padStart(2, '0');
      const minute = String(currentTime.getMinutes()).padStart(2, '0');
      this.field_data = `${hour}:${minute}`;
    }
  }
};
</script>
