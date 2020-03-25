<template>
  <div>
    <label :for="field_id" class="field__question">{{ field_label }}</label>
    <input :id="field_id" v-model="field_data" type="date" required />
  </div>
</template>

<script>
import field from '@/mixins/field.js';

export default {
  name: 'AnDate',
  mixins: [field],
  mounted() {
    const date = new Date();
    const today = `${date.getFullYear()}-${this.formatDate(
      date.getMonth() + 1
    )}-${this.formatDate(date.getDate())}`;
    if (this.field_data === undefined) {
      this.field_data = today;
    }
  },
  methods: {
    formatDate: value => {
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
