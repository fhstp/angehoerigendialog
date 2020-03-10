<template>
  <div id="app">
    <AdForm />
    <AdVisualisation />
  </div>
</template>

<script>
import AdForm from '@/components/AdForm.vue';
import AdVisualisation from '@/components/AdVisualisation.vue';

export default {
  components: {
    AdForm,
    AdVisualisation
  }
};
</script>

<style lang="scss">
@import "@/assets/styles/base.scss";
</style>
