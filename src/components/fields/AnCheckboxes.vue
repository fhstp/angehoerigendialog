<template>
  <fieldset class="an-checkboxes">
    <div class="an-checkboxes__option">
      <input :id="`${field_id}-none`" v-model="noneSelected" type="checkbox" />
      <label :for="`${field_id}-none`">keine dieser Optionen</label>
    </div>
    <div
      v-for="(option, optionId, optionIndex) in fieldOptions"
      :key="optionId"
      class="an-checkboxes__option"
    >
      <input
        :id="`${field_id}-${optionId}`"
        v-model="field_data"
        :disabled="noneSelected"
        :name="field_id"
        :value="optionId"
        type="checkbox"
      />
      <label :for="`${field_id}-${optionId}`">{{ option }}</label>
      <div
        v-if="Object.keys(fieldActivefields).length > 0"
        v-show="!noneSelected && visibleFields[optionId]"
        class="an-checkboxes_activefields"
      >
        <AnField
          v-for="(field, fieldId, fieldIndex) in fieldActivefields"
          :key="fieldId"
          :field-data="field"
          :section-id="`${field_id}-${optionId}`"
          :field-id="`${field_id}-${optionId}-${fieldId}`"
          :is-subfield="true"
          :valid.sync="activeFieldsState[optionIndex][fieldIndex]"
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
  data() {
    const activeFieldsState = [];
    for (const optionIndex in Object.keys(this.fieldOptions)) {
      activeFieldsState.push([]);
      for (let i = 0; i < Object.keys(this.fieldActivefields).length; i++) {
        activeFieldsState[optionIndex].push(undefined);
      }
    }
    return {
      noneSelected: false,
      activeFieldsState
    };
  },
  computed: {
    visibleFields() {
      const visibleFields = {};
      if (Array.isArray(this.field_data)) {
        for (const option of this.field_data) {
          visibleFields[option] = true;
        }
      }
      return visibleFields;
    },
    validActiveFields() {
      let isValid = true;
      const onlyValid = optionIndex => {
        for (const validActiveField of this.activeFieldsState[optionIndex]) {
          if (!validActiveField) {
            return false;
          }
        }
        return true;
      };
      for (const visibleField in this.visibleFields) {
        // if option not selected
        if (!onlyValid(Object.keys(this.fieldOptions).indexOf(visibleField))) {
          isValid = false;
          break;
        }
      }
      return isValid;
    }
  },
  watch: {
    noneSelected(newValue) {
      this.validate(this.field_data);
      if (newValue) {
        this.field_data_cache = [...this.field_data];
        this.field_data = [];
      } else {
        this.field_data = [...this.field_data_cache];
        this.field_data_cache = [];
      }
    },
    validActiveFields: 'validate'
  },
  created() {
    if (!this.field_data) this.field_data = [];
    this.field_data_cache = [];
  },
  methods: {
    validate(value) {
      this.$emit(
        'update:field_valid',
        this.noneSelected ||
          ((value?.length ?? this.field_data?.length) > 0 &&
            this.validActiveFields)
      );
    }
  }
};
</script>

<style lang="scss" scoped>
.an-checkboxes {
  border-radius: $border-radius;
  margin: -$spacer;
  padding: $spacer;
  background-color: white;
  color: black;

  &__option {
    padding-top: $spacer;
    padding-bottom: $spacer;

    &:first-child {
      border-bottom: 1px solid black;
    }
  }
}

.an-checkboxes_activefields {
  padding-top: $spacer * 3;
  padding-left: $spacer * 2;
}
</style>
