<template>
  <div class="an-visualisation">
    <div class="container">
      <AnSendMail />
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
      <h2 v-show="isAvailable.situation">
        Zusammenfassende Einschätzung der gesundheitliche Situation
      </h2>
      <AnSituation
        v-show="isAvailable.situation"
        :available.sync="isAvailable.situation"
      />
      <h2>Meine Energie-Blume</h2>
      <AnFlower
        v-show="isAvailable.flower"
        :available.sync="isAvailable.flower"
      />
      <button
        class="an-visualisation__restart btn"
        @click="restartQuestionnaire"
      >
        Neuen Fragebogen beginnen
      </button>
    </div>
  </div>
</template>

<script>
import AnBasisInformation from '@/components/visualisations/AnBasisInformation.vue';
import AnFlower from '@/components/visualisations/AnFlower.vue';
import AnResources from '@/components/visualisations/AnResources.vue';
import AnSendMail from '@/components/visualisations/AnSendMail.vue';
import AnSituation from '@/components/visualisations/AnSituation.vue';
import { restartQuestionnaire } from '@/helpers/form.js';

export default {
  name: 'Visualisation',
  components: {
    AnBasisInformation,
    AnFlower,
    AnResources,
    AnSendMail,
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
.an-visualisation {
  overflow: auto;
  height: 100vh;

  &__restart {
    position: fixed;
    bottom: 1.25rem;
    right: 1.25rem;
  }
}
</style>
