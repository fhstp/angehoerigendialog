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
        :step="field_step"
      >
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
    field_step: {type: Number, default: 1},
    field_min: {type: Array, required: true },
    field_max: {type: Array, required: true},
  },
  computed: {
    minValue() {
      return this.field_min[0]
    },
    minDescription() {
      return this.field_min[1]
    },
    maxValue() {
      return this.field_max[0]
    },
    maxDescription() {
      return this.field_max[1]
    },
    value:{
      get(){
        if (this.field_data !== undefined) {
          return this.field_data;
        } else {
          return this.minValue;
        }
      },
      set(value){
        this.field_data = parseFloat(value);
      }
    }
  }
};
</script>
