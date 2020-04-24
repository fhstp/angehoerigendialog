<template>
  <div class="an-start">
    <h1>Angehörigendialog</h1>
    <button
      v-if="existingLocalStorage"
      class="btn"
      @click="restartQuestionnaire"
    >
      start
    </button>
    <router-link v-else to="fragebogen" class="btn" start>start</router-link>
    <router-link v-if="existingLocalStorage" to="fragebogen" class="btn"
      >vorherigen Fragebogen laden</router-link
    >
  </div>
</template>

<script>
import { restartQuestionnaire } from '@/helpers/form.js';

export default {
  name: 'Start',
  computed: {
    existingLocalStorage() {
      if (localStorage.getItem('vuex') !== null) return true;
      return false;
    }
  },
  methods: {
    restartQuestionnaire
  }
};
</script>

<style lang="scss" scoped>
.an-start {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  height: calc(var(--vh, 1vh) * 100);
  width: 100%;
}
</style>
