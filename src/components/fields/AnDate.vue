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
  },
  methods: {
    validate(value) {
      this.$emit('update:field_valid', !!value);
    }
  }
};
</script>

<style lang="scss" scoped>
.an-date {
  border: none;
  border-radius: $border-radius;
  padding: $spacer;

  .an-checkboxes_activefields &,
  .an-field__subfields &,
  .an-plain-data {
    @media screen {
      border: 2px solid $color-theme-lightgrey;
    }
  }
}
</style>
