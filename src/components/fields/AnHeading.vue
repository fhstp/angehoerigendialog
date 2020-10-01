<template>
  <h3 class="an-heading">{{ field_label }}</h3>
</template>

<script>
import field from '@/mixins/field.js';

export default {
  name: 'AnHeading',
  mixins: [field]
};
</script>
