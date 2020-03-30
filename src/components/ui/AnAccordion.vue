<template>
  <div :class="{ 'an-accordion--open': accordionOpen }" class="an-accordion">
    <router-link
      v-if="!accordionOpen"
      :to="{ query: { ...$route.query, field: fieldId } }"
      class="an-accordion__link"
      >{{ field.label }}</router-link
    >
    <template v-if="accordionOpen">
      <input
        v-if="navForm_prevLocation"
        type="text"
        class="an-accordion__focusnavigation"
        @focus="navForm_prev"
      />
      <slot></slot>
      <input
        v-if="navForm_nextLocation"
        type="text"
        class="an-accordion__focusnavigation"
        @focus="navForm_next"
      />
    </template>
  </div>
</template>

<script>
import navForm from '@/mixins/navForm.js';

export default {
  name: 'AnAccordion',
  mixins: [navForm],
  props: {
    fieldId: { type: String, required: true },
    field: { type: Object, required: true }
  },
  computed: {
    accordionOpen() {
      return this.$route.query.field === this.fieldId;
    }
  },
  watch: {
    accordionOpen(open) {
      this.$nextTick(function() {
        if (open === true) {
          this.afterAccordionOpens();
        }
      });
    }
  },
  created() {
    if (
      !this.$route.query.field &&
      this.navForm_currentStepFirstFieldId === this.fieldId
    ) {
      this.$router.replace({
        query: {
          ...this.$route.query,
          field: this.navForm_currentStepFirstFieldId
        }
      });
    }
  },
  mounted() {
    if (this.accordionOpen) {
      this.afterAccordionOpens();
    }
  },
  methods: {
    afterAccordionOpens() {
      const field = this.$slots.default[0].elm;
      const firstInput = field.querySelector('input, textarea');
      if (firstInput) {
        firstInput.focus();
      }
      field.scrollIntoView();
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
