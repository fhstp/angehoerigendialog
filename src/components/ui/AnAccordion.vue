<template>
  <div :class="{ 'an-accordion--open': accordionOpen }" class="an-accordion">
    <router-link
      v-if="!accordionOpen"
      :to="{ query: { ...$route.query, field: fieldId } }"
      class="an-accordion__link"
      >{{ field.label }}</router-link
    >
    <template v-if="accordionOpen">
      <input type="text" class="an-accordion__focusnavigation" @focus="prev" />
      <slot></slot>
      <input type="text" class="an-accordion__focusnavigation" @focus="next" />
    </template>
  </div>
</template>

<script>
import {
  hasNoAccordion,
  prevLocation,
  nextLocation
} from '@/helpers/navigation.js';

export default {
  name: 'AnAccordion',
  props: {
    fieldId: { type: String, required: true },
    field: { type: Object, required: true }
  },
  computed: {
    accordionOpen() {
      const noAccordion = hasNoAccordion(this.field);
      const routerFieldMatches = this.$route.query.field === this.fieldId;

      return noAccordion || routerFieldMatches;
    },
    prevQuery() {
      const step = this.$route.query.step;
      const field = this.$route.query.field;

      return prevLocation(step, field);
    },
    nextQuery() {
      const step = this.$route.query.step;
      const field = this.$route.query.field;

      return nextLocation(step, field);
    }
  },
  watch: {
    accordionOpen(open) {
      this.$nextTick(function() {
        if (open === true) {
          const field = this.$slots.default[0].elm;
          const firstInput = field.querySelector('input, textarea');
          if (firstInput) {
            firstInput.focus();
          }
        }
      });
    }
  },

  methods: {
    prev() {
      this.$router.push({ query: this.prevQuery });
    },
    next() {
      this.$router.push({ query: this.nextQuery });
    }
  }
};
</script>

<style lang="scss" scoped>
.an-accordion__link {
  display: block;
  border: 1px solid lightgrey;
  border-radius: 3px;
  padding: $spacer * 2;
  font-size: 1.2rem;
  margin-bottom: $spacer * 2;
  color: black;
  text-decoration: none;
}

.an-accordion__focusnavigation {
  height: 0px;
  width: 0px;
  opacity: 0;
  position: absolute;
  top: -1000px;
  left: -1000px;
}
</style>
