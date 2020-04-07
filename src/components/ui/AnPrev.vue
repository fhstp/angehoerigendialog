<template>
  <button v-if="navForm_prevLocation" @click="navForm_prev">Zurück</button>
</template>

<script>
import navForm from '@/mixins/navForm.js';

export default {
  name: 'AnPrev',
  mixins: [navForm]
};
</script>
