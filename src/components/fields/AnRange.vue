<template>
  <div class="an-range">
    <div class="an-range__wrapper row">
      <span class="an-range__min-label" v-text="fieldMin.label" />
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
      <span class="an-range__max-label" v-text="fieldMax.label" />
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
$thumb-triangle-height: 0.5em;
.an-range {
  &__wrapper {
    align-items: flex-end;
  }

  &__input-area {
    display: inline-block;
    position: relative;
    margin-top: calc(
      #{$spacer + $range-thumb-border-size} + #{1em + $thumb-triangle-height}
    );
    margin-right: $spacer * 2;
    margin-left: $spacer * 2;
    flex-grow: 1;
  }

  &__label-area {
    position: absolute;
    top: -$thumb-triangle-height;
    left: $range-thumb-size / 2;
    right: $range-thumb-size / 2;
    line-height: 0;
  }

  &__thumb-label {
    position: absolute;
    top: 0;
    left: calc(100% * var(--value));
    transform: translate(-50%, #{-$range-thumb-size});
    border-radius: $border-radius;
    background-color: #333;
    color: white;
    padding: $spacer / 2;
    min-width: 3ch;
    text-align: center;
    line-height: 1;

    &::after {
      content: '';
      position: absolute;
      top: 100%;
      left: 50%;
      transform: translateX(-50%);
      border-top: $thumb-triangle-height solid #333;
      border-right: $thumb-triangle-height solid transparent;
      border-left: $thumb-triangle-height solid transparent;
    }
  }

  &__slider {
    width: 100%;
    appearance: none;
    background-color: transparent;

    @mixin range-thumb {
      box-sizing: content-box;
      position: relative;
      border: $range-thumb-border-size solid $color-theme-darkgrey;
      border-radius: 50%;
      background-color: white;
      width: $range-thumb-size - $range-thumb-border-size * 2;
      height: $range-thumb-size - $range-thumb-border-size * 2;
      cursor: grab;
      appearance: none;
    }
    &::-webkit-slider-thumb {
      @include range-thumb;
      transform: translateY(calc(-#{$range-track-height} + 7px));
    }
    &::-moz-range-thumb {
      @include range-thumb;
    }
    &::-ms-thumb {
      @include range-thumb;
    }

    @mixin range-track {
      box-sizing: border-box; // will be content-box in FF otherwise
      height: $range-track-height;
      background-color: white;
      border-radius: $border-radius + 5px;
      .an-plain-data & {
        border: 2px solid $color-theme-lightgrey;
      }
    }
    &::-webkit-slider-runnable-track {
      @include range-track;
    }
    &::-moz-range-track {
      @include range-track;
    }
    &::-ms-track {
      @include range-track;
    }
  }
}
</style>
