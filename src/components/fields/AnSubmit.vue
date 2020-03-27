<template>
  <router-link to="/auswertung">{{ field_label }}</router-link>
</template>

<script>
import field from '@/mixins/field.js';

export default {
  name: 'AnSubmit',
  mixins: [field]
};
</script>

<style lang="scss" scoped></style>
