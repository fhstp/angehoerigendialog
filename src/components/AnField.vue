<template>
  <div class="an-field">
    <component
      :is="fieldComponentName"
      v-if="fieldComponentAvailable"
      v-bind="preparedFieldProps"
      :field_id="fieldId"
      :radio-options="fieldData.options"
    />
    <div v-else>
      Not supported field of type: {{ fieldData.type }}
    </div>
    <div
      v-if="fieldData.subfields"
      class="an-field__subfields"
    >
      <AnField
        v-for="(subfield, subfieldId) in fieldData.subfields"
        :key="subfieldId"
        :field-data="subfield"
        :field-id="`${fieldId}-${subfieldId}`"
      />
    </div>
  </div>
</template>

<script>
import * as fieldComponents from '@/components/fields/index.js';

export default {
  name: 'AnField',
  components: {
    ...fieldComponents
  },
  props: {
    fieldData: {
      type: Object,
      required: true
    },
    fieldId: {
      type: String,
      required: true
    }
  },
  created() {
    const newFieldData = {};
    for (const key in this.fieldData) {
      if (key !== 'subfields') {
        newFieldData[`field_${key}`] = this.fieldData[key];
      }
    }
    this.preparedFieldProps = newFieldData;

    const componentType = this.fieldData.type;
    this.fieldComponentName = `An${componentType.charAt(0).toUpperCase()}${componentType.slice(1)}`;

    this.fieldComponentAvailable = Object.hasOwnProperty.call(fieldComponents, this.fieldComponentName);
  }
};
</script>
