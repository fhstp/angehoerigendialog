<template>
  <fieldset class="an-checkboxes">
    <legend v-if="field_label" class="field__question">
      {{ field_label }}
    </legend>
    <div
      v-for="(option, optionId) in fieldOptions"
      :key="optionId"
      class="an-checkboxes__option"
    >
      <input
        :id="`${field_id}-${optionId}`"
        v-model="field_data"
        :name="field_id"
        :value="optionId"
        type="checkbox"
      />
      <label :for="`${field_id}-${optionId}`">{{ option }}</label>
      <div
        v-if="hasActiveFields"
        v-show="visibleFields[optionId]"
        class="an-checkboxes_activefields"
      >
        <AnField
          v-for="(field, fieldId) in fieldActivefields"
          :key="fieldId"
          :field-data="field"
          :section-id="`${field_id}-${optionId}`"
          :field-id="`${field_id}-${optionId}-${fieldId}`"
          :is-subfield="true"
        />
      </div>
    </div>
  </fieldset>
</template>

<script>
import field from '@/mixins/field.js';

export default {
  name: 'AnCheckboxes',
  components: { AnField: () => import('@/components/AnField.vue') },
  mixins: [field],
  props: {
    fieldOptions: { type: Object, default: () => ({}) },
    fieldActivefields: { type: Object, default: () => ({}) }
  },
  computed: {
    hasActiveFields() {
      return Object.keys(this.fieldActivefields).length > 0;
    },
    visibleFields() {
      const visibleFields = {};
      if (Array.isArray(this.field_data)) {
        for (const option of this.field_data) {
          visibleFields[option] = true;
        }
      }
      return visibleFields;
    }
  },
  created() {
    if (!this.field_data) this.field_data = [];
  }
};
</script>

<style lang="scss" scoped>
.an-checkboxes__option {
  padding-top: $spacer;
  padding-bottom: $spacer;
}

.an-checkboxes_activefields {
  padding-top: $spacer * 3;
  padding-left: $spacer * 2;
}
</style>
