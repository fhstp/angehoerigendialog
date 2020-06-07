<template>
  <textarea
    :id="field_id"
    v-model="field_data"
    :required="field_required"
    class="an-text"
    @input="setTextareaHeight"
  />
</template>

<script>
import { string_autosetTextareaHeight } from '@/helpers/string.js';
import field from '@/mixins/field.js';

export default {
  name: 'AnText',
  mixins: [field],
  mounted() {
    this.setTextareaHeight();
  },
  methods: {
    validate(value) {
      this.$emit('update:field_valid', value?.replace(/^\s+/, '').length > 0);
    },
    setTextareaHeight() {
      string_autosetTextareaHeight(this.$el, 16);
    }
  }
};
</script>

<style lang="scss" scoped>
.an-text {
  border: none;
  border-radius: $border-radius;
  width: 100%;
  line-height: 1.5;
  resize: none;
  overflow: hidden;

  @media screen {
    padding: $spacer;
  }

  .an-checkboxes_activefields &,
  .an-field__subfields &,
  .an-plain-data & {
    @media screen {
      border: 2px solid $color-theme-lightgrey;
    }
  }
}
</style>
