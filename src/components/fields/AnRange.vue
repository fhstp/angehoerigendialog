<template>
  <div class="an-range">
    <div class="an-range__wrapper">
      <span class="an-range__min-label">
        {{ fieldMin.label }}
      </span>
      <div class="an-range__input-area" :style="{ '--value': valueAsPercent }">
        <div
          v-if="!Number.isNaN(Number(field_data))"
          class="an-range__label-area"
        >
          <div class="an-range__thumb-label">
            {{ field_data }}
          </div>
        </div>
        <input
          :id="field_id"
          v-model.number="field_data"
          class="an-range__slider"
          type="range"
          :required="field_required"
          :min="fieldMin.value"
          :max="fieldMax.value"
          :step="fieldStep"
        />
      </div>
      <span class="an-range__max-label">
        {{ fieldMax.label }}
      </span>
    </div>
  </div>
</template>

<script>
import field from '@/mixins/field.js';

export default {
  name: 'AnRange',
  mixins: [field],
  props: {
    fieldStep: { type: Number, default: 1 },
    fieldMin: {
      type: Object,
      default: () => ({
        label: undefined,
        value: 0
      })
    },
    fieldMax: {
      type: Object,
      default: () => ({
        label: undefined,
        value: 1
      })
    }
  },
  computed: {
    valueAsPercent() {
      return (
        (this.field_data - this.fieldMin.value) /
        (this.fieldMax.value - this.fieldMin.value)
      );
    }
  },
  methods: {
    validate(value) {
      this.$emit('update:field_valid', !Number.isNaN(Number(value)));
    }
  }
};
</script>

<style lang="scss" scoped>
.an-range {
  &__wrapper {
    display: flex;
    align-items: flex-end;
  }

  &__input-area {
    display: inline-block;
    position: relative;
    margin: 0 $spacer * 2;
    flex-grow: 1;
  }

  &__label-area {
    position: absolute;
    top: -5px;
    left: $range-thumb-size / 2;
    right: $range-thumb-size / 2;
    line-height: 0;
  }

  &__thumb-label {
    position: absolute;
    top: 0;
    left: calc(100% * var(--value));
    transform: translate(-50%, -100%);
    border-radius: 3px;
    background-color: #333;
    color: white;
    padding: $spacer / 2;
    min-width: 3ch;
    text-align: center;
    line-height: 1;

    &::after {
      content: '';
      position: absolute;
      bottom: -5px;
      left: 50%;
      transform: translateX(-50%);
      border-top: 5px solid #333;
      border-right: 5px solid transparent;
      border-left: 5px solid transparent;
    }
  }

  &__slider {
    width: 100%;
  }
}
</style>
