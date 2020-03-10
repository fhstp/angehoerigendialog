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
export default {
  name: 'AdText',
  props: {
    fieldId: String,
    fieldLabel: String,
    fieldRequired: Boolean
  }
};
</script>

<style lang="scss" scoped></style>
