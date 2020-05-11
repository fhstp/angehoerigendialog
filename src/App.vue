<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted() {
    window.addEventListener('beforeprint', () => {
      this.$store.commit('updatePrintMode', true);
    });
    window.addEventListener('afterprint', () => {
      this.$store.commit('updatePrintMode', false);
    });
  }
};
</script>

<style lang="scss">
@import '@/assets/styles/base.scss';
</style>
