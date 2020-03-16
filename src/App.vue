<template>
  <div id="app">
    <AnForm />
    <AnVisualisation />
  </div>
</template>

<script>
import AnForm from '@/components/AnForm.vue';
import AnVisualisation from '@/components/AnVisualisation.vue';

export default {
  components: {
    AnForm,
    AnVisualisation
  }
};
</script>

<style lang="scss">
@import '@/assets/styles/base.scss';
</style>
