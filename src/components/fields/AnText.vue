<template>
  <textarea
    :id="field_id"
    v-model="field_data"
    :required="field_required"
    class="an-text"
    @input="updateTextAreaHeight"
  />
</template>

<script>
import field from '@/mixins/field.js';

export default {
  name: 'AnText',
  mixins: [field],
  mounted() {
    this.updateTextAreaHeight();
  },
  methods: {
    validate(value) {
      this.$emit('update:field_valid', value?.replace(/^\s+/, '').length > 0);
    },
    updateTextAreaHeight() {
      this.$el.style.height = 'auto';
      this.$el.style.height = `${this.$el.scrollHeight + 16}px`;
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
