<template>
  <textarea
    :id="field_id"
    v-model="field_data"
    :required="field_required"
    cols="50"
    rows="3"
    class="an-text"
  />
</template>

<script>
import field from '@/mixins/field.js';

export default {
  name: 'AnText',
  mixins: [field]
};
</script>

<style lang="scss" scoped>
.an-text {
  width: 100%;
}
</style>
