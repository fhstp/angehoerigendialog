<template>
  <div class="an-accordion">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'AnAccordion',
  props: {
    value: {
      type: Number,
      default: undefined
    },
    /** if set the active item is written to the route using the specified parameter name */
    queryParam: {
      type: String,
      default: undefined
    }
  },
  data() {
    return {
      internalValue: this.value
    };
  },
  computed: {
    items() {
      return this.$children.filter(
        child => child.$options.name === 'AnAccordionItem'
      );
    },
    currentQuery() {
      return this.queryParam ? this.$route.query[this.queryParam] : undefined;
    }
  },
  watch: {
    value(newValue) {
      this.internalValue = newValue;
    }
  },
  created() {
    if (this.queryParam) {
      // already in route
      if (Object.hasOwnProperty.call(this.$route.query, this.queryParam)) {
        this.changeActiveFromRoute();
      }
      // watch for changes in route
      this.$watch('currentQuery', () => {
        this.changeActiveFromRoute();
      });
    }
  },
  methods: {
    changeActive(index) {
      if (this.internalValue === index) return;
      this.internalValue = index;
      this.$emit('input', index);
      if (this.queryParam) {
        this.$router.push({
          query: { ...this.$route.query, [this.queryParam]: index }
        });
      }
    },
    changeActiveFromRoute() {
      const index = Number(this.$route.query[this.queryParam]);
      if (!Number.isInteger(index) || this.internalValue === index) return;
      this.internalValue = index;
      this.$emit('input', index);
    }
  }
};
</script>
