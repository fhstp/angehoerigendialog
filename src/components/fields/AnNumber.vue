<template>
  <div class="an-number">
    <button class="an-number__button--minus" @click="calc(false)"></button>
    <input
      :id="field_id"
      v-model.number="field_data"
      type="number"
      :required="field_required"
    />
    <button class="an-number__button--plus" @click="calc(true)"></button>
  </div>
</template>

<script>
import field from '@/mixins/field.js';

export default {
  name: 'AnNumber',
  mixins: [field],
  methods: {
    validate(value) {
      this.$emit(
        'update:field_valid',
        value !== '' && !Number.isNaN(Number(value))
      );
    },
    calc(operator) {
      if (this.field_data !== undefined && this.field_data > 0) {
        if (operator) {
          this.field_data++;
        } else {
          this.field_data--;
          if (this.field_data === 0) {
            this.field_data = 1;
          }
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
    border-radius: 0;
  }
  button {
    display: block;
    width: 27px;
    background-repeat: no-repeat;
    background-size: cover;
    cursor: pointer;
    border: 0;
    background-color: transparent;
  }

  &__button--minus {
    background-position: 9px -4px;
    background-image: url('~@/assets/icons/minus.svg');
  }

  &__button--plus {
    background-position: 5px -2px;
    background-image: url('~@/assets/icons/plus.svg');
  }
}
</style>
