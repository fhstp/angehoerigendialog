<template>
  <div
    v-show="isVisible"
    :class="{ 'an-field--not-supported': !fieldComponentAvailable }"
    class="an-field"
  >
    <template v-if="fieldComponentAvailable">
      <component
        :is="fieldComponentName"
        v-bind="preparedFieldProps"
        :field_id="fieldId"
      />
      <div v-if="fieldData.subfields" class="an-field__subfields">
        <AnField
          v-for="(subfield, subfieldId) in fieldData.subfields"
          :key="subfieldId"
          :field-data="subfield"
          :section-id="sectionId"
          :field-id="`${sectionId}-${subfieldId}`"
        />
      </div>
    </template>
    <template v-else>
      Not supported field of type: {{ fieldData.type }}
    </template>
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
    },
    sectionId: {
      type: String,
      required: true
    }
  },
  computed: {
    isVisible() {
      if (!this.fieldData.when) return true;
      for (const key in this.fieldData.when) {
        if (
          this.$store.getters.getField(`${this.sectionId}-${key}`) !==
          this.fieldData.when[key]
        ) {
          return false;
        }
      }
      return true;
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

<style lang="scss" scoped>
section > .an-field {
  border: 1px solid lightgrey;
  border-radius: 3px;
  padding: $spacer * 2;
}
.an-field {
  transition: background-color 100ms ease-in-out;

  &:focus-within {
    background-color: #eee;
  }

  &--not-supported {
    background: darkred;
    color: white;
  }

  &__subfields {
    margin-top: $spacer * 4;
  }
}
</style>
