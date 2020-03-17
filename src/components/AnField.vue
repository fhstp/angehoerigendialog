<template>
  <div class="an-field">
    <component
      :is="fieldComponentName"
      v-if="fieldComponentAvailable"
      v-bind="preparedFieldProps"
      :field_id="fieldId"
    />
    <div v-else>Not supported field of type: {{ fieldData.type }}</div>
    <div v-if="fieldData.subfields" class="an-field__subfields">
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
import { string_toTitleCase } from '@/helpers/string.js';
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
    const transformFieldKey = oldKey => {
      switch (oldKey) {
        case 'subfields':
          return oldKey;
        case 'id':
        case 'label':
        case 'required':
        case 'type':
        case 'when':
          return `field_${oldKey}`;
        default:
          return `field${string_toTitleCase(oldKey)}`;
      }
    };
    for (const key in this.fieldData) {
      newFieldData[transformFieldKey(key)] = this.fieldData[key];
    }
    this.preparedFieldProps = newFieldData;

    const componentType = this.fieldData.type;
    this.fieldComponentName = `An${string_toTitleCase(componentType)}`;

    this.fieldComponentAvailable = Object.hasOwnProperty.call(
      fieldComponents,
      this.fieldComponentName
    );
  }
};
</script>
