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
        <AnSendMail class="btn--text" />
        <router-link class="btn btn--text" :to="({ name: 'Start' })">
          Zurück zum Start
        </router-link>
      </div>
    </div>

    <div class="container">
      <div :class="{ 'an-visualisation__page': showVisualisations }">
        <div class="an-visualisation__infos">
          <h1 :style="{ marginBottom: '20px' }">
            Angehörigengespräch von {{ headerData.caregivername }}
          </h1>
          <p>
            Durchgeführt von {{ headerData.socialworkername }},
            {{ headerData.date }}
          </p>
          <p>
            Zweitgespräch am {{ headerData.date2 }} um
            {{ headerData.time2 }} Uhr
          </p>
        </div>

        <!-- Vis Page 1 -->

        <template v-if="showVisualisations">
          <div class="an-visualisation__visualisation-wrapper">
            <div class="an-visualisation__heading-wrapper">
              <AnEditButton section-id="demenzerkrankte_person" field-id="0" />
            </div>
            <AnBasisInformation />
            <div class="an-visualisation__screen_spacer" />

            <div v-show="isAvailable.flower">
              <div class="an-visualisation__heading-wrapper">
                <h2>Dafür habe ich Zeit</h2>
                <AnEditButton
                  section-id="ressourcen_belastungen"
                  field-id="2"
                />
              </div>
              <AnFlower :available.sync="isAvailable.flower" />
            </div>
          </div>
          <div class="an-visualisation__screen_spacer" />
        </template>
        <AnPlainData v-else />
      </div>

      <!-- Vis Page 2 -->

      <template v-if="showVisualisations">
        <div
          v-show="isAvailable.behaviourChanges || isAvailable.flower"
          class="an-visualisation__page"
        >
          <div v-show="isAvailable.behaviourChanges">
            <div class="an-visualisation__heading-wrapper">
              <h2>Verhaltensveränderungen</h2>
              <AnEditButton
                section-id="verhaltensveraenderungen"
                field-id="0"
              />
            </div>
            <AnBehaviour :available.sync="isAvailable.behaviourChanges" />
          </div>
          <div class="an-visualisation__screen_spacer" />

          <div
            v-show="isAvailable.situation || isAvailable.healthChanges"
            class="an-visualisation__heading-wrapper"
          >
            <h2>Gesundheit</h2>
            <AnEditButton section-id="gesundheit" field-id="0" />
          </div>

          <AnSituation
            v-show="isAvailable.situation"
            :available.sync="isAvailable.situation"
          />
          <div class="an-visualisation__screen_spacer" />

          <AnHealth
            v-show="isAvailable.healthChanges"
            :available.sync="isAvailable.healthChanges"
          />

          <div class="an-visualisation__screen_spacer" />
        </div>

        <!-- Vis Page 3 -->

        <div
          v-show="isAvailable.careTasks"
          class="an-visualisation__page an-visualisation__page--caretasks"
        >
          <div class="an-visualisation__heading-wrapper">
            <h2>Praktische Betreuungsaufgaben</h2>
            <AnEditButton
              section-id="praktische_betreungsaufgaben"
              field-id="0"
            />
          </div>
          <AnCareTasks :available.sync="isAvailable.careTasks" />
        </div>
        <div class="an-visualisation__screen_spacer" />

        <!-- Vis Page 4 -->

        <template v-if="showVisualisations">
          <div class="an-visualisation__page">
            <div
              v-show="isAvailable.resourcespressure"
              class="an-visualisation__balloon-wrapper"
            >
              <div class="an-visualisation__balloon-labels">
                <div
                  class="an-visualisation__heading-wrapper an-visualisation__heading-wrapper--kraft"
                >
                  <h2>Das gibt mir Kraft</h2>
                  <AnEditButton
                    section-id="ressourcen_belastungen"
                    field-id="0"
                  />
                </div>
                <div
                  class="an-visualisation__heading-wrapper an-visualisation__heading-wrapper--belastung"
                >
                  <h2>Das belastet mich</h2>
                  <AnEditButton
                    section-id="ressourcen_belastungen"
                    field-id="0"
                  />
                </div>
              </div>
              <div class="an-visualisation__balloon-container">
                <AnResourcesPressure
                  :available.sync="isAvailable.resourcespressure"
                />
              </div>
            </div>
            <div class="an-visualisation__screen_spacer" />
          </div>
        </template>
      </template>
    </div>
    <AnSendMailPopup />
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
import AnSendMailPopup from '@/components/visualisations/AnSendMailPopup.vue';
import AnSituation from '@/components/visualisations/AnSituation.vue';

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
    AnSendMailPopup,
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
  }
};
</script>

<style lang="scss" scoped>
.an-visualisation {
  color-adjust: exact;

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

  &__infos {
    margin-bottom: $spacer * 2;
    background-color: #8393a7;
    color: white;
    padding: 26px 34px;

    h1 {
      font-size: 1.6rem;
    }
  }

  &__heading-wrapper {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  &__screen_spacer {
    @media screen {
      margin-bottom: $spacer * 10;
    }
  }

  &__page {
    @media print {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      page-break-after: always;
      overflow: hidden;
    }

    .an-visualisation.isChromium & {
      @media print {
        height: 277mm; // overflow issues in firefox/safari, so height will be only defined in chrome
      }
    }

    &--caretasks {
      @media print {
        display: block;
      }
    }
  }

  &__visualisation-wrapper {
    @media print {
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
  }

  &__balloon-wrapper {
    display: flex;
  }

  &__balloon-container {
    display: flex;
    justify-content: center;
    flex: 1;
  }

  &__heading-wrapper {
    h2 {
      background-color: $color-theme-lightgrey;
      color: $color-theme-darkgrey;
      padding-top: 0.2em;
      padding-right: $spacer * 4;
      padding-bottom: 0.2em;
      padding-left: $spacer;
      display: flex;
      align-items: center;
      position: relative;
      clip-path: polygon(
        0 0,
        calc(100% - 1em) 0,
        100% 50%,
        calc(100% - 1em) 100%,
        0 100%
      );

      @media print {
        font-size: 14pt;
      }
    }

    &--kraft {
      margin-top: 10rem;
    }

    &--belastung {
      margin-top: 30rem;
    }
  }
}
</style>

<style lang="scss">
body {
  overflow: auto;
}
</style>
