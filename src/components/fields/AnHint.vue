<template>
  <div class="an-hint">
    <p>
      {{ field_label }}
    </p>
  </div>
</template>

<script>
import field from '@/mixins/field';

export default {
  name: 'AnHint',
  mixins: [field]
};
</script>

<style lang="scss" scoped></style>
