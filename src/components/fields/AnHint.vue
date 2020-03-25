<template>
  <p class="an-hint" v-html="field_label"></p>
</template>

<script>
import field from '@/mixins/field.js';

export default {
  name: 'AnHint',
  mixins: [field]
};
</script>

<style lang="scss" scoped></style>
