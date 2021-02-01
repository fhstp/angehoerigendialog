<template>
  <input
    :id="field_id"
    v-model="field_data"
    type="time"
    placeholder="hh:mm"
    required
    class="an-time"
  />
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
  },
  methods: {
    validate(value) {
      this.$emit('update:field_valid', !!value);
    }
  }
};
</script>

<style lang="scss" scoped>
.an-time {
  border: 1px solid #5e5e5e;
  border-radius: $border-radius;
  padding: $spacer;

  .an-checkboxes_activefields &,
  .an-field__subfields & {
    border: 2px solid $color-theme-lightgrey;
  }
}
</style>
