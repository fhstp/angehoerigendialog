<template>
  <div>
    <label :for="fieldId">{{ field_label }}</label>
    <textarea
      :id="field_id"
      :required="fieldRequired"
      cols="50"
      rows="3"
    />
  </div>
</template>

<script>
import field from '@/mixins/field'

export default {
  name: 'AdText',
  mixins: [field]
};
</script>

<style lang="scss" scoped></style>
