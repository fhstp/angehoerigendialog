<template>
  <div class="container">
    <h1>Auswertung</h1>
    <h2>Überblick</h2>
    <AnBasisInformation />
    <h2 v-show="isAvailable.resources">
      Meine Ressourcen
    </h2>
    <AnResources
      v-show="isAvailable.resources"
      :available.sync="isAvailable.resources"
    />
    <button class="an-visualisation__restart btn" @click="restartQuestionnaire">
      Neuen Fragebogen beginnen
    </button>
  </div>
</template>

<script>
import AnBasisInformation from '@/components/visualisations/AnBasisInformation.vue';
import AnResources from '@/components/visualisations/AnResources.vue';
import { restartQuestionnaire } from '@/helpers/form.js';

export default {
  name: 'Visualisation',
  components: {
    AnBasisInformation,
    AnResources
  },
  data: () => ({
    isAvailable: {}
  }),
  methods: {
    restartQuestionnaire
  }
};
</script>

<style lang="scss" scoped>
.an-visualisation__restart {
  position: fixed;
  bottom: 1.25rem;
  right: 1.25rem;
}
</style>
