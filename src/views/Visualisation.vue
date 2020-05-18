<template>
  <div class="an-visualisation">
    <div class="container">
      <div class="an-visualisation__actions">
        <AnExportPdf />
        <AnSendMail />
      </div>
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
      <h2 v-show="isAvailable.situation" class="page-break-before">
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
      <h2 v-show="isAvailable.careTasks" class="page-break-before">
        Praktische Betreuungsaufgaben
      </h2>
      <AnCareTasks
        v-show="isAvailable.careTasks"
        :available.sync="isAvailable.careTasks"
      />
      <h2 v-show="isAvailable.behaviourChanges" class="page-break-before">
        Umgang mit Verhaltensveränderungen
      </h2>
      <AnBehaviour
        v-show="isAvailable.behaviourChanges"
        :available.sync="isAvailable.behaviourChanges"
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
import AnBehaviour from '@/components/visualisations/AnBehaviour.vue';
import AnCareTasks from '@/components/visualisations/AnCareTasks.vue';
import AnExportPdf from '@/components/visualisations/AnExportPdf.vue';
import AnFlower from '@/components/visualisations/AnFlower.vue';
import AnResources from '@/components/visualisations/AnResources.vue';
import AnSendMail from '@/components/visualisations/AnSendMail.vue';
import AnSituation from '@/components/visualisations/AnSituation.vue';
import { restartQuestionnaire } from '@/helpers/form.js';

export default {
  name: 'Visualisation',
  components: {
    AnBasisInformation,
    AnBehaviour,
    AnCareTasks,
    AnExportPdf,
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

  @media print {
    height: auto !important;

    &__restart,
    &__actions {
      display: none;
    }
  }

  &__restart {
    position: fixed;
    bottom: 1.25rem;
    right: 1.25rem;
  }

  &__actions {
    position: fixed;
    top: 1.25rem;
    right: 1.25rem;
  }
}
</style>

<style lang="scss">
body {
  @media print {
    overflow: auto;
  }
}
</style>
