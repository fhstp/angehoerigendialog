<template>
  <div
    :class="[
      'an-accordion-item',
      { 'an-accordion-item--open': active, 'an-accordion-item__ready': ready }
    ]"
  >
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
  props: {
    ready: {
      type: Boolean
    }
  },
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
.an-accordion-item__header-border {
  background-color: $color-theme-white;
  padding-right: 10px;
  float: left;
  height: 100%;
  padding-right: 10px;
  height: auto;
}
.an-accordion-item {
  border-left-color: $color-theme-darkblue;
  border-left-width: 7px;
  border-left-style: solid;

  &__border-highlight {
    border-left-color: $color-theme-yellow;
  }

  &__ready {
    border-left-color: $color-theme-yellow;
  }

  &--open {
    background-color: $color-theme-white;
  }
  &__header {
    padding: $spacer * 2;
    font-size: 1.2rem;
    color: black;
    //fill: pink;
    text-decoration: none;
    cursor: pointer;
    border-width: 1px;
    border-style: solid;
    margin-left: 5px;
    border-color: $color-theme-darkgrey;

    .an-accordion-item--open & {
      cursor: auto;
      border-left-color: $color-theme-yellow;
      color: black;
      border: none;
    }
  }

  &__content {
    padding: $spacer * 2;
    color: black;
  }
}
</style>
