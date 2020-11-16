<template>
  <div class="an-number">
    <button
      class="an-number__button--minus hide-print"
      aria-label="weniger"
      @click="calc(false)"
    >
      <IconMinus />
    </button>
    <input
      :id="field_id"
      v-model.number="field_data"
      type="number"
      :required="field_required"
    />
    <button
      class="an-number__button--plus hide-print"
      aria-label="mehr"
      @click="calc(true)"
    >
      <IconPlus />
    </button>
  </div>
</template>

<script>
import IconMinus from '@/assets/icons/minus.svg?inline';
import IconPlus from '@/assets/icons/plus.svg?inline';
import field from '@/mixins/field.js';

export default {
  name: 'AnNumber',
  components: {
    IconMinus,
    IconPlus
  },
  mixins: [field],
  methods: {
    validate(value) {
      this.$emit(
        'update:field_valid',
        value !== '' && !Number.isNaN(Number(value))
      );
    },
    calc(increment) {
      if (this.field_data !== undefined && this.field_data > 0) {
        if (increment) {
          this.field_data++;
        } else if (this.field_data > 1) {
          this.field_data--;
        }
      } else {
        this.field_data = 1;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.an-number {
  display: inline-flex;
  background-color: $color-theme-lightgrey;
  border-radius: $border-radius;

  input {
    appearance: textfield;
    border-radius: 0;
    max-width: 10ch;
    border: none;

    @media screen {
      border-top: 2px solid $color-theme-lightgrey;
      border-bottom: 2px solid $color-theme-lightgrey;
      padding: $spacer;
    }

    &::-webkit-inner-spin-button {
      display: none;
    }
  }

  button {
    background-repeat: no-repeat;
    background-size: cover;
    padding: $spacer;
    width: 2.5rem;
    height: 2.5rem;
    cursor: pointer;
    border: none;
    background-color: transparent;
  }

  svg {
    height: 100%;
    width: 300%;
    fill: $color-theme-darkred;
  }
}
</style>
