<template>
  <div class="container">
    <h1>Auswertung</h1>
    <h2 v-show="isAvailable.resources">
      Meine Ressourcen
    </h2>
    <AnResources
      v-show="isAvailable.resources"
      :available.sync="isAvailable.resources"
    />
    <h2 v-show="isAvailable.situation">
      Zusammenfassende Einschätzung der gesundheitliche Situation
    </h2>
    <AnSituation
      v-show="isAvailable.situation"
      :available.sync="isAvailable.situation"
    />
    <button class="an-visualisation__restart btn" @click="restartQuestionnaire">
      Neuen Fragebogen beginnen
    </button>
  </div>
</template>

<script>
import AnResources from '@/components/visualisations/AnResources.vue';
import AnSituation from '@/components/visualisations/AnSituation.vue';
import { restartQuestionnaire } from '@/helpers/form.js';

export default {
  name: 'Visualisation',
  components: {
    AnResources,
    AnSituation
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
