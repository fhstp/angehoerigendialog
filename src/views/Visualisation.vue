<template>
  <div class="an-visualisation">
    <div class="container">
      <div class="an-visualisation__actions">
        <AnExportPdf />
        <AnSendMail />
      </div>
      <h1>Auswertung</h1>
      <div class="an-visualisation__heading-wrapper">
        <h2>Überblick</h2>
        <AnEditButton :section-id="'demenzerkrankte_person'" :field-id="0" />
      </div>
      <AnBasisInformation />

      <div
        v-show="isAvailable.resources"
        class="an-visualisation__heading-wrapper"
      >
        <h2>
          Meine Ressourcen
        </h2>
        <AnEditButton :section-id="'ressourcen_belastungen'" :field-id="0" />
      </div>
      <AnResources
        v-show="isAvailable.resources"
        :available.sync="isAvailable.resources"
      />

      <div
        v-show="isAvailable.situation"
        class="an-visualisation__heading-wrapper page-break-before"
      >
        <h2>
          Zusammenfassende Einschätzung der gesundheitliche Situation
        </h2>
        <AnEditButton :section-id="'gesundheit'" :field-id="0" />
      </div>
      <AnSituation
        v-show="isAvailable.situation"
        :available.sync="isAvailable.situation"
      />

      <div
        v-show="isAvailable.flower"
        class="an-visualisation__heading-wrapper"
      >
        <h2>
          Meine Energie-Blume
        </h2>
        <AnEditButton :section-id="'ressourcen_belastungen'" :field-id="2" />
      </div>
      <AnFlower
        v-show="isAvailable.flower"
        :available.sync="isAvailable.flower"
      />

      <div
        v-show="isAvailable.careTasks"
        class="an-visualisation__heading-wrapper page-break-before"
      >
        <h2>
          Praktische Betreuungsaufgaben
        </h2>
        <AnEditButton
          :section-id="'praktische_betreungsaufgaben'"
          :field-id="0"
        />
      </div>
      <AnCareTasks
        v-show="isAvailable.careTasks"
        :available.sync="isAvailable.careTasks"
      />

      <div
        v-show="isAvailable.behaviourChanges"
        class="an-visualisation__heading-wrapper page-break-before"
      >
        <h2>
          Umgang mit Verhaltensveränderungen
        </h2>
        <AnEditButton :section-id="'verhaltensveraenderungen'" :field-id="0" />
      </div>
      <AnBehaviour
        v-show="isAvailable.behaviourChanges"
        :available.sync="isAvailable.behaviourChanges"
      />

      <div
        v-show="isAvailable.healthChanges"
        class="an-visualisation__heading-wrapper page-break-before"
      >
        <h2>
          Gesundheit
        </h2>
        <AnEditButton :section-id="'gesundheit'" :field-id="7" />
      </div>
      <AnHealth
        v-show="isAvailable.healthChanges"
        :available.sync="isAvailable.healthChanges"
      />

      <div
        v-show="isAvailable.resourcespressure"
        class="an-visualisation__heading-wrapper page-break-before"
      >
        <h2>
          Ressourcen und Belastungen
        </h2>
        <AnEditButton :section-id="'ressourcen_belastungen'" :field-id="0" />
      </div>
      <AnResourcesPressure
        v-show="isAvailable.resourcespressure"
        :available.sync="isAvailable.resourcespressure"
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
import AnHealth from '@/components/visualisations/AnHealth.vue';
import AnResources from '@/components/visualisations/AnResources.vue';
import AnResourcesPressure from '@/components/visualisations/AnResourcesPressure.vue';
import AnSendMail from '@/components/visualisations/AnSendMail.vue';
import AnSituation from '@/components/visualisations/AnSituation.vue';
import { restartQuestionnaire } from '@/helpers/form.js';
import AnEditButton from '@/components/ui/AnEditButton.vue';

export default {
  name: 'Visualisation',
  components: {
    AnBasisInformation,
    AnBehaviour,
    AnCareTasks,
    AnExportPdf,
    AnFlower,
    AnHealth,
    AnResources,
    AnResourcesPressure,
    AnSendMail,
    AnSituation,
    AnEditButton
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

  &__heading-wrapper {
    display: flex;
    flex-direction: row;
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
