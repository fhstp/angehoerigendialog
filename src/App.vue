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
    // detect Ctrl+p
    window.addEventListener('keydown', event => {
      if (
        event.ctrlKey &&
        !event.altKey &&
        !event.metaKey &&
        event.keyCode === 80
      ) {
        this.$store.commit('updatePrintMode', true);
      }
    });

    window.addEventListener(
      'orientationchange',
      () => {
        location.reload();
      },
      false
    );
  }
};
</script>

<style lang="scss">
@import '@/assets/styles/base.scss';
</style>
