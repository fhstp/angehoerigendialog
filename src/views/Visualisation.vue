<template>
  <div class="an-visualisation">
    <div class="container">
      <div class="an-visualisation__actions">
        <AnExportPdf />
        <AnSendMail />
      </div>

      <!-- Überschift mit Daten -->

      <div class="page">
        <div class="an-visualisation__infos">
          <h1>Angehörigengespräch von<br />{{ headerData.caregivername }}</h1>
          <div>
            <p>
              Durchgeführt von {{ headerData.socialworkername }},
              {{ headerData.date }}
            </p>
            <p>
              Zweitgespräch am {{ headerData.date2 }} um
              {{ headerData.time2 }} Uhr
            </p>
          </div>
        </div>

        <!-- Vis Seite 1 -->

        <div class="visualisation">
          <div>
            <div class="an-visualisation__heading-wrapper">
              <h2>Überblick</h2>
              <AnEditButton section-id="demenzerkrankte_person" field-id="0" />
            </div>
            <AnBasisInformation />
          </div>

          <div>
            <div
              v-show="isAvailable.careTasks"
              class="an-visualisation__heading-wrapper"
            >
              <h2>
                Praktische Betreuungsaufgaben
              </h2>
              <AnEditButton
                section-id="praktische_betreungsaufgaben"
                field-id="0"
              />
            </div>
            <AnCareTasks
              v-show="isAvailable.careTasks"
              :available.sync="isAvailable.careTasks"
            />
          </div>
        </div>
      </div>

      <!-- Vis Seite 2 -->

      <div class="page">
        <div>
          <div
            v-show="isAvailable.behaviourChanges"
            class="an-visualisation__heading-wrapper"
          >
            <h2>
              Verhaltensveränderungen
            </h2>
            <AnEditButton section-id="verhaltensveraenderungen" field-id="0" />
          </div>
          <AnBehaviour
            v-show="isAvailable.behaviourChanges"
            :available.sync="isAvailable.behaviourChanges"
          />
        </div>

        <div>
          <div
            v-show="isAvailable.flower"
            class="an-visualisation__heading-wrapper"
          >
            <h2>
              Ressource und Belastungen
            </h2>
            <AnEditButton section-id="ressourcen_belastungen" field-id="2" />
          </div>
          <AnFlower
            v-show="isAvailable.flower"
            :available.sync="isAvailable.flower"
          />
        </div>
      </div>

      <!-- Vis Seite 3 -->

      <div class="page">
        <div
          v-show="isAvailable.situation || isAvailable.healthChanges"
          class="an-visualisation__heading-wrapper"
        >
          <h2>
            Gesundheit
          </h2>
          <AnEditButton section-id="gesundheit" field-id="0" />
        </div>

        <AnSituation
          v-show="isAvailable.situation"
          :available.sync="isAvailable.situation"
        />

        <AnHealth
          v-show="isAvailable.healthChanges"
          :available.sync="isAvailable.healthChanges"
        />

        <div class="balloon-wrapper">
          <div>
            <div
              v-show="isAvailable.resourcespressure"
              class="an-visualisation__heading-wrapper kraft"
            >
              <h2>
                Das gibt mir Kraft
              </h2>
              <AnEditButton section-id="ressourcen_belastungen" field-id="0" />
            </div>
            <div
              v-show="isAvailable.resourcespressure"
              class="an-visualisation__heading-wrapper belastung"
            >
              <h2>
                Das belastet mich
              </h2>
              <AnEditButton section-id="ressourcen_belastungen" field-id="0" />
            </div>
          </div>
          <AnResourcesPressure
            v-show="isAvailable.resourcespressure"
            :available.sync="isAvailable.resourcespressure"
          />
        </div>
      </div>

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
import AnEditButton from '@/components/ui/AnEditButton.vue';
import AnExportPdf from '@/components/visualisations/AnExportPdf.vue';
import AnFlower from '@/components/visualisations/AnFlower.vue';
import AnHealth from '@/components/visualisations/AnHealth.vue';
import AnResourcesPressure from '@/components/visualisations/AnResourcesPressure.vue';
import AnSendMail from '@/components/visualisations/AnSendMail.vue';
import AnSituation from '@/components/visualisations/AnSituation.vue';
import { restartQuestionnaire } from '@/helpers/form.js';

export default {
  name: 'Visualisation',
  components: {
    AnBasisInformation,
    AnBehaviour,
    AnCareTasks,
    AnEditButton,
    AnExportPdf,
    AnFlower,
    AnHealth,
    AnResourcesPressure,
    AnSendMail,
    AnSituation
  },
  data: () => ({
    isAvailable: {}
  }),
  computed: {
    headerData() {
      return {
        date: new Date(
          this.$store.getters.getFieldValue('startseite-datum')
        ).toLocaleDateString('de-AT', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit'
        }),
        caregivername: this.$store.getters.getFieldValue(
          'startseite-angehoerigenname'
        ),
        socialworkername: this.$store.getters.getFieldValue(
          'startseite-sozialarbeitername'
        ),
        date2: new Date(
          this.$store.getters.getFieldValue('ende-datum')
        ).toLocaleDateString('de-AT', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit'
        }),
        time2: this.$store.getters.getFieldValue('ende-uhrzeit')
      };
    }
  },
  methods: {
    restartQuestionnaire
  }
};
</script>

<style lang="scss" scoped>
.an-visualisation {
  color-adjust: exact;
  overflow: auto;
  height: 100vh;

  h2 {
    background-color: $color-theme-darkgrey;
    color: white;
    height: 2.5rem;
    padding-right: 2rem;
    padding-left: 0.5rem;
    display: flex;
    align-items: center;
    position: relative;

    &::after {
      content: '';
      width: 0;
      height: 0;
      border-top: 1.25rem solid transparent;
      border-bottom: 1.25rem solid transparent;
      border-left: 1.25rem solid $color-theme-darkgrey;
      position: absolute;
      right: -1.25rem;
    }
  }

  @media print {
    height: auto !important;

    &__restart,
    &__actions {
      display: none;
    }
  }

  &__infos {
    margin-bottom: 1rem;
    display: flex;
    align-items: flex-end;

    h1 {
      font-size: 1.6rem;
      flex: 1;
      color: $color-theme-blue;
    }

    div {
      flex: 1;
    }
  }

  &__restart {
    position: fixed;
    bottom: 1.25rem;
    right: 1.25rem;
    z-index: 100;
  }

  &__actions {
    position: fixed;
    top: 1.25rem;
    right: 1.25rem;
    z-index: 100;
  }

  &__heading-wrapper {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
}

@media print {
  .page {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    page-break-after: always;
    height: 277mm;
    overflow: hidden;

    .visualisation {
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
  }
}

.balloon-wrapper {
  display: flex;

  .an-resources-pressure {
    flex-grow: 1;
  }

  .kraft {
    margin-top: 6rem;
  }

  .belastung {
    margin-top: 18rem;
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
