<template>
  <div :class="['an-accordion-item', { 'an-accordion-item--open': active }]">
    <div class="an-accordion-item__header" @click="$parent.changeActive(index)">
      <slot name="header" />
    </div>
    <div v-if="active" class="an-accordion-item__content">
      <slot name="content" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'AnAccordionItem',
  data() {
    return {
      /** index of accordion item in accordion */
      index: undefined
    };
  },
  computed: {
    active() {
      return this.$parent.internalValue === this.index;
    }
  },
  mounted() {
    this.index = this.$parent.items.indexOf(this);
  }
};
</script>

<style lang="scss" scoped>
.an-accordion-item {
  border-radius: 3px;
  background-color: $color-theme-lightred;

  &--open {
    background-color: $color-theme-darkred;
  }
  &__header {
    padding: $spacer * 2;
    font-size: 1.2rem;
    color: black;
    fill: black;
    text-decoration: none;
    cursor: pointer;

    .an-accordion-item--open & {
      cursor: auto;
      color: white;
      fill: white;
    }
  }

  &__content {
    padding: $spacer * 2;
    color: white;
  }
}
</style>
