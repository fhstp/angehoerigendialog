<template>
  <fieldset>
    <legend>{{ field_label }}</legend>
    <label :for="`${field_id}--0`">{{ answerText[0] }}</label>
    <input
      :id="`${field_id}--0`"
      v-model="field_data"
      type="radio"
      :name="field_id"
      value="false"
    >
    <!-- Achtung: value="false" bzw. value="true" erfordert, dass im YML-File immer als erster Wert "Nein" und als zweiter Wert "Ja" steht -->
    <label :for="`${field_id}--1`">{{ answerText[1] }}</label>
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
  toggleText: {type: Array, default: undefined}
},
  computed:{
answerText: function () {
      if(this.toggleText === undefined){
        return ['Nein', 'Ja'];
      }
      return this.toggleText;
    }
  }
};

</script>

<style lang="scss" scoped>


</style>
