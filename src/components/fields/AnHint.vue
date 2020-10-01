<template>
  <!-- eslint-disable-next-line vue/no-v-html -->
  <p class="an-hint" v-html="field_label" />
</template>

<script>
import field from '@/mixins/field.js';

export default {
  name: 'AnHint',
  mixins: [field]
};
</script>

<style lang="scss" scoped></style>
