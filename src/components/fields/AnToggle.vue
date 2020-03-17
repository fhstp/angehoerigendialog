<template>
  <fieldset>
    <legend>{{ field_label }}</legend>
    <label :for="`${field_id}--0`">{{ field_text[0] }}</label>
    <input
      :id="`${field_id}--0`"
      v-model="field_data"
      type="radio"
      :name="field_id"
      value="false"
    >
    <!-- Achtung: value="false" bzw. value="true" erfordert, dass im YML-File immer als erster Wert "Nein" und als zweiter Wert "Ja" steht -->
    <label :for="`${field_id}--1`">{{ field_text[1] }}</label>
    <input
      :id="`${field_id}--1`"
      v-model="field_data"
      type="radio"
      :name="field_id"
      value="true"
    >
  </fieldset>
</template>

<script>
import field from '@/mixins/field';

export default {
  name: 'AnToggle',
  mixins: [field],
  props: {
  field_text: {type: Array, default: ()=>{return ['Nein', 'Ja'];}}
}
};

</script>

<style lang="scss" scoped>


</style>
