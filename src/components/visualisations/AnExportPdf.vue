<template>
  <button ref="button" class="an-exportpdf btn btn--text" @click="print">
    Als PDF speichern
  </button>
</template>

<script>
export default {
  name: 'AnExportPdf',
  methods: {
    print() {
      this.$store.commit('updatePrintMode', true);
      this.$refs.button.disabled = true;
      setTimeout(() => {
        window.print();
        this.$refs.button.disabled = false;
      }, 1);
    }
  }
};
</script>

<style lang="scss" scoped>
.an-exportpdf {
  position: fixed;
  bottom: 2vh;
  right: 2vh;
  border-radius: 50%;
  z-index: 1000;
}
</style>
