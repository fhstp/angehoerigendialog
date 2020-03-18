<template>
  <div class="an-heading">
    <h3>
      {{ field_label }}
    </h3>
  </div>
</template>

<script>
import field from '@/mixins/field';

export default {
  name: 'AnHeading',
  mixins: [field]
};
</script>
