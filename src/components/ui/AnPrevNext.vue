<template>
  <div>
    <button v-if="prevQuery" @click="prev">Zurück</button>
    <button @click="next">Weiter</button>
  </div>
</template>

<script>
import { prevLocation, nextLocation } from '@/helpers/navigation.js';

export default {
  name: 'AnPrevNext',
  computed: {
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

<style></style>
