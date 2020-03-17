<template>
  <div class="an-text">
    <h3 :for="field_id">
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
