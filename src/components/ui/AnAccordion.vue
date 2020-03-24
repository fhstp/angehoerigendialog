<template>
  <div class="an-accordion">
    <router-link
      v-if="!accordionOpen"
      :to="{ query: { step: sectionId, field: fieldId } }"
      class="an-accordion__link"
      >{{ field.label }}</router-link
    >
    <slot v-if="accordionOpen"></slot>
  </div>
</template>

<script>
export default {
  name: 'AnAccordion',
  props: {
    fieldId: { type: String, required: true },
    field: { type: Object, required: true }
  },
  computed: {
    sectionId() {
      return this.$route.query.step;
    },
    accordionOpen() {
      const alwaysOpen = ['heading', 'hint'].includes(this.field.type);
      const accordionDisabled = this.field.hideAccordion === true;
      const routerFieldMatches = this.$route.query.field === this.fieldId;

      return alwaysOpen || accordionDisabled || routerFieldMatches;
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
</style>
