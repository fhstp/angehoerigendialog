<template>
  <textarea
    v-if="!$store.state.printMode"
    :id="field_id"
    v-model="field_data"
    :required="field_required"
    cols="50"
    rows="3"
    class="an-text"
  />
  <div v-else>
    {{ field_data }}
  </div>
</template>

<script>
import field from '@/mixins/field.js';

export default {
  name: 'AnText',
  mixins: [field],
  methods: {
    validate(value) {
      this.$emit('update:field_valid', value?.replace(/^\s+/, '').length > 0);
    }
  }
};
</script>

<style lang="scss" scoped>
.an-text {
  width: 100%;
  @media print {
    border: none;
  }
}
</style>
