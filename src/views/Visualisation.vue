<template>
  <div class="container">
    <h1>Auswertung</h1>
    <h2>Meine Ressourcen</h2>
    <AnResources />
  </div>
</template>

<script>
import AnResources from '@/components/visualisations/AnResources.vue';

export default {
  name: 'Visualisation',
  components: {
    AnResources
  }
};
</script>
