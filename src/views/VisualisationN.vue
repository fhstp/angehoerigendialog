<template>
  <div class="an-visualisation" :class="{ isChromium: isChromium }">
    <div class="an-form__scrollarea">
      <AnStepper
        class="hide-print"
        :steps="steps"
        :special="true"
        @input="stepperNavigation()"
      />
      <div class="an-form__content">
        <div class="container" style="margin-top: 40px;">
          <!-- General Information -->
          <div v-if="currView !== 'ende'" class="an-visualisation__infos">
            <h1 :style="{ marginBottom: '20px' }">
              Angehörigengespräch von {{ headerData.caregivername }}
            </h1>
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
            <div style="float: right; margin-top: -25px;">
              <AnEditButton
                class="hide-print"
                section-id="demenzerkrankte_person"
                field-id="0"
                :special="true"
              />
            </div>
          </div>

          <template v-if="currView === 'visuelle_auswertung'">
            <!-- Vis Page 1 -->
            <div class="an-visualisation__page">
              <div class="an-visualisation__visualisation-wrapper">
                <AnBasisInformation />
              </div>
              <div class="an-visualisation__screen_spacer" />
            </div>

            <!-- Vis Page 2 -->
            <div v-if="showVisualisations" class="an-visualisation__page">
              <div class="an-visualisation__visualisation-wrapper">
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
            </div>

            <!-- Vis Page 3 -->
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

            <!-- Vis Page 4 -->
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
              <AnCareTasks
                :available.sync="isAvailable.careTasks"
                style="margin-top: 35px;"
              />
              <div class="an-visualisation__screen_spacer" />
            </div>

            <!-- Vis Page 5 -->
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

          <template v-if="currView === 'schriftliche_auswertung'">
            <AnPlainData />
          </template>

          <template v-if="currView === 'ende'">
            <h2>Ende</h2>
            <br />
            <p>Alles erledigt.</p>
            <br />
            <br />
            <router-link
              class="btn btn--text an-fabBtn-home"
              :to="({ name: 'Start' })"
            />
            <p>Zurück zum <strong>Start</strong></p>
          </template>
        </div>
      </div>
      <div class="an-btn-menu hide-print">
        <router-link
          class="btn btn--text an-fabBtn-back"
          :to="'/fragebogen?step=ende&field=0'"
        />
        <AnExportPdf v-if="currView !== 'ende'" />
      </div>
    </div>
  </div>
</template>

<script>
import menu from '@/data/evaluation.json';
import AnBasisInformation from '@/components/visualisations/AnBasisInformation.vue';
import AnBehaviour from '@/components/visualisations/AnBehaviour.vue';
import AnCareTasks from '@/components/visualisations/AnCareTasks.vue';
import AnPlainData from '@/components/visualisations/AnPlainData.vue';
import AnEditButton from '@/components/ui/AnEditButton.vue';
import AnExportPdf from '@/components/visualisations/AnExportPdf.vue';
import AnFlower from '@/components/visualisations/AnFlower.vue';
import AnHealth from '@/components/visualisations/AnHealth.vue';
import AnResourcesPressure from '@/components/visualisations/AnResourcesPressure.vue';
import AnSituation from '@/components/visualisations/AnSituation.vue';
import AnStepper from '@/components/ui/AnStepper.vue';

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
    AnSituation,
    AnStepper
  },
  data: () => ({
    currView: 'visuelle_auswertung',
    isAvailable: {},
    isChromium: !!window.chrome
    // http://browserhacks.com/#hack-dee2c3ab477a0324b6a2283c434108c8
  }),
  computed: {
    showVisualisations() {
      return this.$route.path === '/auswertung';
    },
    steps() {
      const steps = [];
      for (const sectionId in menu) {
        steps.push({
          title: menu[sectionId].titleShort ?? menu[sectionId].title,
          icon: menu[sectionId].icon ?? sectionId,
          id: sectionId,
          done: ''
        });
      }
      return steps;
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
  created() {
    this.currView = this.$route.query.step || 'visuelle_auswertung';
  },
  methods: {
    stepperNavigation() {
      this.currView = this.$route.query.step;
    }
  }
};
</script>

<style lang="scss" scoped>
.an-form {
  &__content {
    flex-grow: 1;
    z-index: 1;
    min-height: 100vh;
    min-height: calc(var(--vh, 1vh) * 100);
    @media #{map-get($query, 'lg-and-up')} {
      margin-left: 300px;
    }
  }

  &__scrollarea {
    display: flex;
    flex-direction: column;

    > .an-stepper {
      z-index: 1;
      flex-shrink: 0;
    }
  }
}

.container {
  @media #{map-get($query, 'lg-only')} {
    margin-right: 20px;
    width: 75ch;
  }
}

.an-btn-menu {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  bottom: 2vh;
  right: 2vh;
  z-index: 1000;

  > * {
    margin: 0 10px;
  }

  .an-fabBtn-back {
    border-radius: 50%;
    outline: none;
    box-shadow: 0 6px 10px 0 #666;
    transition: all 0.1s ease-in-out;
    min-width: $fab-button-size;
    min-height: $fab-button-size;
    background-image: url('~@/assets/icons/back.svg');
    background-position: center center;
    background-repeat: no-repeat;

    &:hover {
      box-shadow: 0 6px 14px 0 #666;
      transform: scale(1.05);
    }
  }
}

.an-fabBtn-home {
  border-radius: 50%;
  outline: none;
  box-shadow: 0 6px 10px 0 #666;
  transition: all 0.1s ease-in-out;
  min-width: $fab-button-size;
  min-height: $fab-button-size;
  background-image: url('~@/assets/icons/home.svg');
  background-position: center center;
  background-repeat: no-repeat;

  &:hover {
    box-shadow: 0 6px 14px 0 #666;
    transform: scale(1.05);
  }
}

.an-visualisation {
  color-adjust: exact;

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
      break-after: page;
      overflow: hidden;
    }

    .an-visualisation.isChromium & {
      @media print {
        height: 100%; // overflow issues in firefox/safari, so height will be only defined in chrome
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
