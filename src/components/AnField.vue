<template>
  <div class="an-field">
    <component
      :is="genComponentName(fieldData.type)"
      v-if="fieldData.type === 'text'"
      v-bind="preparedFieldProps"
      :field_id="fieldId"
    />
    <div v-else>
      Frage von Typ: {{ fieldData.type }}
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
import AnText from '@/components/fields/AnText.vue';

export default {
  name: 'AnField',
  components: {
    AnText
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
  },
  methods: {
    genComponentName: type => {
     return `An${type.charAt(0).toUpperCase()}${type.slice(1)}`
    }
  }
};
</script>
