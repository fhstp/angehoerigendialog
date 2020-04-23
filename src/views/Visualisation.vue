<template>
  <div class="container">
    <h1>Auswertung</h1>
    <h2>Meine Ressourcen</h2>
    <AnResources />
    <h2>Zusammenfassende Einschätzung der gesundheitliche Situation</h2>
    <AnSituation />
  </div>
</template>

<script>
import AnResources from '@/components/visualisations/AnResources.vue';
import AnSituation from '@/components/visualisations/AnSituation.vue';

export default {
  name: 'Visualisation',
  components: {
    AnResources,
    AnSituation
  }
};
</script>
