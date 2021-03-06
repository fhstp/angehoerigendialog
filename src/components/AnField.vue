<template>
  <div
    v-show="isVisible"
    :class="{ 'an-field--not-supported': !fieldComponentAvailable }"
    class="an-field"
  >
    <template v-if="fieldComponentAvailable">
      <input
        v-if="isAccordionItem && !isSubfield && hasPrev"
        type="text"
        class="an-field__navigation visually-hidden"
        @focus="$emit('goPrev')"
      />
      <p
        v-if="isAccordionItem && isSubfield"
        v-html-safe="preparedFieldProps.field_label"
        class="an-field__label"
      ></p>
      <component
        :is="fieldComponentName"
        v-bind="preparedFieldProps"
        :field_id="fieldId"
        :field_valid.sync="validSelf"
      />
      <div v-if="fieldData.subfields" class="an-field__subfields">
        <AnField
          v-for="(subfield, subfieldId, subfieldIndex) in fieldData.subfields"
          :key="subfieldId"
          :field-data="subfield"
          :section-id="sectionId"
          :field-id="`${sectionId}-${subfieldId}`"
          :is-subfield="true"
          :valid.sync="validChildren[subfieldIndex]"
        />
      </div>
      <input
        v-if="isAccordionItem && !isSubfield && hasNext"
        type="text"
        class="an-field__navigation visually-hidden"
        @focus="$emit('goNext')"
      />
    </template>
    <template v-else
      >Not supported field of type: {{ fieldData.type }}</template
    >
  </div>
</template>

<script>
import { form_isInAccordion } from '@/helpers/form.js';
import { string_toTitleCase } from '@/helpers/string.js';
import * as fieldComponents from '@/components/fields/index.js';

export default {
  name: 'AnField',
  components: { ...fieldComponents },
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
    },
    isSubfield: {
      type: Boolean,
      default: false
    },
    valid: {
      type: Boolean,
      default: false
    },
    hasNext: {
      type: Boolean,
      default: true
    },
    hasPrev: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      validSelf: false,
      validChildren: this.fieldData.subfields
        ? Array(Object.keys(this.fieldData.subfields).length).fill(false)
        : undefined
    };
  },
  computed: {
    isVisible() {
      if (!this.fieldData.when) return true;
      for (const key in this.fieldData.when) {
        if (
          this.$store.getters.getFieldValue(`${this.sectionId}-${key}`) !==
          this.fieldData.when[key]
        ) {
          return false;
        }
      }
      return true;
    }
  },
  watch: {
    isVisible: 'computeCompletion',
    validSelf: 'computeCompletion',
    validChildren: 'computeCompletion'
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
    this.isAccordionItem = form_isInAccordion(this.fieldData.type);

    if (!this.isVisible) this.computeCompletion();
  },
  mounted() {
    if (!this.isSubfield && this.$parent.active) {
      const firstInput = this.$el.querySelector(
        'input:not(.an-field__navigation), textarea:not(.an-field__navigation)'
      );
      if (firstInput) firstInput.focus();
    }
  },
  methods: {
    computeCompletion() {
      let isValid = true;
      if (this.isVisible) {
        if (!this.validSelf) {
          isValid = false;
        } else if (this.validChildren) {
          for (const validChild of this.validChildren) {
            if (!validChild) {
              isValid = false;
            }
          }
        }
      }

      if (this.isSubfield) {
        this.$emit('update:valid', isValid);
        return;
      }

      if (this.$store.getters.getFieldCompletion(this.fieldId) === isValid)
        return;

      const subfieldIds = [];
      if (this.fieldData.subfields) {
        for (const key of Object.keys(this.fieldData.subfields)) {
          subfieldIds.push(`${this.sectionId}-${key}`);
        }
      }
      const activeFieldIds = [];
      if (this.fieldData.activefields && this.fieldData.options) {
        for (const activeFieldKey in this.fieldData.activefields) {
          for (const optionKey of Object.keys(this.fieldData.options)) {
            activeFieldIds.push(
              `${this.fieldId}-${optionKey}-${activeFieldKey}`
            );
          }
        }
      }
      this.$store.commit('updateAnswerCompletion', {
        fieldIds: [this.fieldId, ...subfieldIds, ...activeFieldIds],
        value: isValid
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.an-field {
  &--not-supported {
    background: darkred;
  }

  &__subfields > .an-field {
    border-radius: $border-radius;
    margin: -0.5rem;
    padding: 0.5rem;
    background-color: white;
    color: $color-theme-darkgrey;
  }

  &__subfields > &:first-child {
    margin-top: $spacer * 4;
  }

  &__subfields &__label {
    margin-bottom: $spacer * 2;
    color: black;
  }
}
</style>
