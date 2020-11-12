<template>
  <button
    ref="button"
    class="an-exportpdf btn btn--text"
    @click="print"
  ></button>
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
  border-radius: 50%;
  outline: none;
  box-shadow: 0 6px 10px 0 #666;
  transition: all 0.1s ease-in-out;
  background-image: url('~@/assets/icons/pdf.svg');
  background-repeat: no-repeat;
  background-position: center center;
  min-width: $fab-button-size;
  min-height: $fab-button-size;

  &:hover {
    box-shadow: 0 6px 14px 0 #666;
    transform: scale(1.05);
  }
}
</style>
