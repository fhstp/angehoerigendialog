<template>
  <div class="an-visualisation">
    <div class="container">
      <div class="an-visualisation__actions">
        <AnExportPdf @beforePrint="beforePrint" />
        <AnSendMail />
      </div>
      <h1>Auswertung</h1>
      <h2>Überblick</h2>
      <AnBasisInformation :print-mode="printMode" />
      <h2 v-show="isAvailable.resources">
        Meine Ressourcen
      </h2>
      <AnResources
        v-show="isAvailable.resources"
        :available.sync="isAvailable.resources"
      />
      <div class="page-break"></div>
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
import AnExportPdf from '@/components/visualisations/AnExportPdf.vue';
import AnSituation from '@/components/visualisations/AnSituation.vue';
import { restartQuestionnaire } from '@/helpers/form.js';

export default {
  name: 'Visualisation',
  components: {
    AnBasisInformation,
    AnFlower,
    AnResources,
    AnSendMail,
    AnExportPdf,
    AnSituation
  },
  data: () => ({
    isAvailable: {},
    printMode: false
  }),
  created() {
    // eslint-disable-next-line nuxt/no-globals-in-created
    window.addEventListener('afterprint', this.afterPrint);
  },
  beforeDestroy() {
    window.removeEventListener('afterprint', this.afterPrint);
  },
  methods: {
    restartQuestionnaire,
    beforePrint() {
      this.printMode = true;
    },
    afterPrint() {
      this.printMode = false;
    }
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

  &__actions {
    position: fixed;
    top: 1.25rem;
    right: 1.25rem;
  }
}
</style>
