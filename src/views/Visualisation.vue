<template>
  <div class="an-visualisation" :class="{ isChromium: isChromium }">
    <div class="an-visualisation__toolbar row hide-print">
      <nav>
        <router-link
          active-class="btn--active"
          class="btn btn--text"
          to="/auswertung"
          >Visualisierungen</router-link
        >
        <router-link
          active-class="btn--active"
          class="btn btn--text"
          to="/export"
          >Export der Daten</router-link
        >
      </nav>

      <div>
        <AnExportPdf />
        <AnSendMail />
        <button class="btn btn--text" @click="restartQuestionnaire">
          Neuen Fragebogen beginnen
        </button>
      </div>
    </div>

    <div class="container">
      <div :class="{ 'an-visualisation__page': showVisualisations }">
        <div class="an-visualisation__infos row">
          <h1 class="col-md-3">
            Angehörigengespräch von<br />{{ headerData.caregivername }}
          </h1>
          <div class="col-md-3">
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

        <template v-if="showVisualisations">
          <div class="an-visualisation__visualisation-wrapper">
            <AnEditButton section-id="demenzerkrankte_person" field-id="0" />
            <AnBasisInformation />
            <div class="an-visualisation__screen_spacer" />

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
          <div class="an-visualisation__screen_spacer" />
        </template>
        <AnPlainData v-else />
      </div>

      <template v-if="showVisualisations">
        <!-- Vis Seite 2 -->
        <div class="an-visualisation__page">
          <div>
            <div
              v-show="isAvailable.behaviourChanges"
              class="an-visualisation__heading-wrapper"
            >
              <h2>
                Verhaltensveränderungen
              </h2>
              <AnEditButton
                section-id="verhaltensveraenderungen"
                field-id="0"
              />
            </div>
            <AnBehaviour
              v-show="isAvailable.behaviourChanges"
              :available.sync="isAvailable.behaviourChanges"
            />
          </div>
          <div class="an-visualisation__screen_spacer" />

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
          <div class="an-visualisation__screen_spacer" />
        </div>

        <!-- Vis Seite 3 -->

        <div class="an-visualisation__page">
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
          <div class="an-visualisation__screen_spacer" />

          <div class="an-visualisation__balloon-wrapper">
            <div class="an-visualisation__balloon-labels">
              <div
                v-show="isAvailable.resourcespressure"
                class="an-visualisation__heading-wrapper an-visualisation__heading-wrapper--kraft"
              >
                <h2>
                  Das gibt mir Kraft
                </h2>
                <AnEditButton
                  section-id="ressourcen_belastungen"
                  field-id="0"
                />
              </div>
              <div
                v-show="isAvailable.resourcespressure"
                class="an-visualisation__heading-wrapper an-visualisation__heading-wrapper--belastung"
              >
                <h2>
                  Das belastet mich
                </h2>
                <AnEditButton
                  section-id="ressourcen_belastungen"
                  field-id="0"
                />
              </div>
            </div>
            <AnResourcesPressure
              v-show="isAvailable.resourcespressure"
              :available.sync="isAvailable.resourcespressure"
            />
          </div>
        </div>
        <div class="an-visualisation__screen_spacer" />
      </template>
    </div>
  </div>
</template>

<script>
import AnBasisInformation from '@/components/visualisations/AnBasisInformation.vue';
import AnBehaviour from '@/components/visualisations/AnBehaviour.vue';
import AnCareTasks from '@/components/visualisations/AnCareTasks.vue';
import AnPlainData from '@/components/visualisations/AnPlainData.vue';
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
    AnPlainData,
    AnEditButton,
    AnExportPdf,
    AnFlower,
    AnHealth,
    AnResourcesPressure,
    AnSendMail,
    AnSituation
  },
  data: () => ({
    isAvailable: {},
    isChromium: !!window.chrome
    // http://browserhacks.com/#hack-dee2c3ab477a0324b6a2283c434108c8
  }),
  computed: {
    showVisualisations() {
      return this.$route.path === '/auswertung';
    },
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

  @media screen {
    &__screen_spacer {
      margin-bottom: $spacer * 10;
    }
  }

  &__toolbar {
    border-bottom: 1px solid $color-theme-lightgrey;
    margin-bottom: $spacer * 4;
    padding: $spacer / 2;

    nav {
      flex-grow: 1;
    }

    .btn {
      margin: $spacer / 2;
    }
  }

  h2 {
    background-color: $color-theme-lightgrey;
    color: $color-theme-darkgrey;
    height: 2.5rem;
    padding-right: 2rem;
    padding-left: 0.5rem;
    display: flex;
    align-items: center;
    position: relative;
    clip-path: polygon(
      0 0,
      calc(100% - 1.25rem) 0,
      100% 50%,
      calc(100% - 1.25rem) 100%,
      0 100%
    );
  }

  @media print {
    height: auto !important;
  }

  &__infos {
    margin-bottom: $spacer * 2;
    align-items: flex-end;

    h1 {
      font-size: 1.6rem;
      color: $color-theme-darkred;
    }
  }

  &__heading-wrapper {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  @media print {
    &__page {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      page-break-after: always;
      overflow: hidden;
    }

    &.isChromium &__page {
      height: 277mm;
      // overflow issues in firefox/safari, so height will be only defined in chrome
    }

    &__visualisation-wrapper {
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
  }

  &__balloon-wrapper {
    display: flex;

    @media print {
      flex-direction: column-reverse;
      align-items: center;
    }
  }
  .an-resources-pressure {
    flex-grow: 1;
  }
  @media print {
    .an-resources-pressure {
      transform: rotate(-90deg);
      margin-top: -120px;
      margin-bottom: -120px;
    }

    &__balloon-labels {
      display: flex;
      width: 100%;
      padding: 0 1.25rem;
      justify-content: space-between;
    }
  }

  &__heading-wrapper {
    &--kraft {
      margin-top: 6rem;

      @media print {
        margin: 0;

        h2 {
          padding-right: 0.5rem;
          padding-left: 2rem;

          &::after {
            content: '';
            border-top: 1.25rem solid transparent;
            border-bottom: 1.25rem solid transparent;
            border-left: none;
            border-right: 1.25rem solid $color-theme-darkgrey;
            position: absolute;
            left: -1.25rem;
          }
        }
      }
    }

    &--belastung {
      margin-top: 24rem;

      @media print {
        margin-top: 0;
      }
    }
  }
}
</style>

<style lang="scss">
body {
  overflow: auto;
}
</style>
