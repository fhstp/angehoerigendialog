<template>
  <div>
    <button v-if="navForm_prevLocation" @click="navForm_prev">Zurück</button>
    <button v-if="navForm_nextLocation" @click="navForm_next">Weiter</button>
  </div>
</template>

<script>
import navForm from '@/mixins/navForm.js';

export default {
  name: 'AnPrevNext',
  mixins: [navForm]
};
</script>

<style></style>
