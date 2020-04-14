<template>
  <div
    v-show="isVisible"
    :class="{ 'an-field--not-supported': !fieldComponentAvailable }"
    class="an-field"
  >
    <template v-if="fieldComponentAvailable">
      <input
        v-if="isAccordionItem && !isSubfield"
        type="text"
        class="an-field__navigation visually-hidden"
        @focus="$emit('goPrev')"
      />
      <p v-if="isAccordionItem && isSubfield">
        {{ preparedFieldProps.field_label }}
      </p>
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
          :is-subfield="true"
        />
      </div>
      <template v-if="isAccordionItem && !isSubfield">
        <div class="an-field__actions">
          <button class="btn" @click="$emit('goPrev')">Zurück</button>
          <button class="btn" @click="handleCompletion()">
            {{
              fieldCompletion ? 'Weiter' : 'Als erledigt markieren und weiter'
            }}
          </button>
        </div>
        <input
          type="text"
          class="an-field__navigation visually-hidden"
          @focus="$emit('goNext')"
        />
      </template>
    </template>
    <template v-else>
      Not supported field of type: {{ fieldData.type }}
    </template>
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
    }
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
    },
    fieldCompletion: {
      get() {
        return this.$store.getters.getFieldCompletion(this.fieldId) ?? false;
      },
      set(value) {
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
          value
        });
      }
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
    this.isAccordionItem = form_isInAccordion(this.fieldData.type);
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
    handleCompletion() {
      this.$emit('goNext');
      if (!this.fieldCompletion) this.fieldCompletion = true;
    }
  }
};
</script>

<style lang="scss" scoped>
.an-field {
  &--not-supported {
    background: darkred;
    color: white;
  }

  &__subfields > &:first-child {
    margin-top: $spacer * 4;
  }

  &__actions {
    display: flex;
    justify-content: space-between;
    margin-top: $spacer * 2;
  }
}
</style>
