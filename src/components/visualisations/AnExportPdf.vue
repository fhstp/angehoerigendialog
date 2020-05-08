<template>
  <button ref="button" class="btn an-exportpdf" @click="print">
    Handout als PDF speichern
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
  margin-right: 1rem;
}
</style>
