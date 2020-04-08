<template>
  <button @click="handleClick">
    {{ done ? 'Als unfertig markieren' : 'Als erledigt markieren und weiter' }}
  </button>
</template>

<script>
import navForm from '@/mixins/navForm.js';

export default {
  name: 'AnComplete',
  mixins: [navForm],
  props: {
    done: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    handleClick() {
      this.$emit('update:done', !this.done);
      if (!this.done) this.navForm_next();
    }
  }
};
</script>
