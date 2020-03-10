<template>
  <div>
    <label :for="fieldId">{{ fieldLabel }}</label>
    <textarea
      :id="fieldId"
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
