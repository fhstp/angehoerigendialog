<template>
  <button class="btn an-exportpdf" @click="print">
    Handout als PDF speichern
  </button>
</template>

<script>
export default {
  name: 'AnExportPdf',
  methods: {
    print() {
      this.$emit('beforePrint');
      this.$nextTick(function () {
        window.print();
      });
    }
  }
};
</script>

<style lang="scss">
@media all {
  .page-break {
    display: none;
  }
}

@media print {
  @page {
    size: A4 portrait;
    margin: 1cm;
  }

  .page-break {
    display: block;
    page-break-before: always;
  }

  body {
    overflow: auto;
  }

  .container {
    max-width: 100%;
  }

  .an-visualisation {
    height: auto !important;

    &__restart,
    &__actions {
      display: none;
    }
  }

  .an-basisinformation {
    & .btn,
    &__table {
      width: 50%;
    }
  }
}
</style>

<style lang="scss" scoped>
.an-exportpdf {
  margin-right: 1rem;
}
</style>
