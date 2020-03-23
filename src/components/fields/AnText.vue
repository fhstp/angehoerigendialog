<template>
  <div class="an-text">
    <label :for="field_id" class="field__question">{{ field_label }}</label>
    <textarea
      :id="field_id"
      v-model="field_data"
      :required="field_required"
      cols="50"
      rows="3"
    />
  </div>
</template>

<script>
import field from '@/mixins/field';

export default {
  name: 'AnText',
  mixins: [field]
};
</script>

<style lang="scss" scoped>
textarea {
  width: 100%;
}
</style>
