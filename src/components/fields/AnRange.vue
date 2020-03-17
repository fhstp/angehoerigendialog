<template>
  <div class="an-range">
    <label :for="field_id">{{ field_label }}</label>
    <div class="an-range_wrapper">
      <span class="an-range_min-value">
        {{ minDescription }}
      </span>
      <input
        :id="field_id"
        v-model="value"
        type="range"
        :required="field_required"
        :min="minValue"
        :max="maxValue"
        :step="fieldStep"
      />
      <span class="an-range_max-value">
        {{ maxDescription }}
      </span>
    </div>
  </div>
</template>

<script>
import field from '@/mixins/field';

export default {
  name: 'AnRange',
  mixins: [field],
  props: {
    fieldStep: { type: Number, default: 1 },
    fieldMin: { type: Array, required: true },
    fieldMax: { type: Array, required: true }
  },
  computed: {
    minValue() {
      return this.fieldMin[0];
    },
    minDescription() {
      return this.fieldMin[1];
    },
    maxValue() {
      return this.fieldMax[0];
    },
    maxDescription() {
      return this.fieldMax[1];
    },
    value: {
      get() {
        if (this.field_data !== undefined) {
          return this.field_data;
        } else {
          return this.minValue;
        }
      },
      set(value) {
        this.field_data = parseFloat(value);
      }
    }
  }
};
</script>
