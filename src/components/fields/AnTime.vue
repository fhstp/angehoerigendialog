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
  mounted() {
    const today = new Date();
    const time = `${this.formatTime(today.getHours())}:${this.formatTime(
      today.getMinutes()
    )}`;
    if (this.field_data === undefined) {
      this.field_data = time;
    }
  },
  methods: {
    formatTime: value => {
      value = String(value);
      if (value.length === 2) {
        return value;
      }
      return '0' + value;
    }
  }
};
</script>

<style lang="scss" scoped></style>
