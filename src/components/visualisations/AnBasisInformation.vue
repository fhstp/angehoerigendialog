<template>
  <div class="an-basisinformation">
    <div class="an-basisinformation__header-wrapper">
      <div class="an-basisinformation__header-headings">
        <div class="betreuend">
          <span class="label">
            Betreuende Person
          </span>

          <template v-if="infoGeneral.values.alterBetreuend"
            >{{ infoGeneral.values.alterBetreuend }} Jahre
          </template>
        </div>
        <IconHands class="icon-hands" />

        <div class="erkrankt">
          <span class="label">
            Demenzerkrankte Person
          </span>
          <template v-if="infoGeneral.values.alterErkrankt">
            {{ infoGeneral.values.alterErkrankt }} Jahre</template
          >
        </div>
      </div>

      <div class="an-basisinformation__header-overallinfo">
        <div v-if="infoGeneral.values.verhaeltnis">
          {{
            `${infoGeneral.labels.verhaeltnis}: ${infoGeneral.values.verhaeltnis}`
          }}
        </div>
        <div v-if="infoGeneral.values.haushalt">
          {{ infoGeneral.labels.haushalt }}
        </div>
      </div>
    </div>

    <!-- Betreuende Person Beginn -->

    <div class="an-basisinformation__info-wrapper">
      <div class="an-basisinformation__info-betreuend">
        <div
          class="an-basisinformation__info-items an-basisinformation__info-sorgepflichten"
        >
          <div class="label">
            {{ infoBetreuend.sorgepflichten.label }}
          </div>
          <div class="value">
            <template v-if="Array.isArray(infoBetreuend.sorgepflichten.value)">
              <IconWarning class="icon-warning" aria-hidden="true" />
              <ul>
                <li
                  v-for="(value, i) in infoBetreuend.sorgepflichten.value"
                  :key="i"
                >
                  {{ value }}
                </li>
              </ul>
            </template>
            <template v-else>
              keine
            </template>
          </div>
        </div>

        <div
          class="an-basisinformation__info-items an-basisinformation__info-beruf"
        >
          <div class="text">
            <div class="label">
              {{ infoBetreuend.beruf.label }}
            </div>
            <div v-if="infoBetreuend.beruf.value" class="value warning">
              <IconWarning
                v-if="infoBetreuend.beruf.value > 40"
                class="icon-warning"
                aria-hidden="true"
              />
              <span :class="{ 'text-warning': infoBetreuend.beruf.value > 40 }">
                {{ infoBetreuend.beruf.value }}h/Woche
              </span>
            </div>
            <div v-else>KEINE</div>
          </div>
          <div v-if="infoBetreuend.beruf.value" class="dots">
            <span
              v-for="i in Math.ceil(infoBetreuend.beruf.value)"
              :key="i"
              class="dot"
              :style="{
                '--percentage':
                  i === Math.ceil(infoBetreuend.beruf.value)
                    ? (infoBetreuend.beruf.value -
                        Math.floor(infoBetreuend.beruf.value)) *
                        100 +
                      '%'
                    : false
              }"
            ></span>
          </div>
        </div>

        <div
          class="an-basisinformation__info-items an-basisinformation__info-unterstuetzungsangebot"
        >
          <div class="label">
            {{ infoBetreuend.unterstuetzungsangebot.label }}
          </div>
          <div class="value">
            <ul
              v-if="Array.isArray(infoBetreuend.unterstuetzungsangebot.value)"
            >
              <li
                v-for="(value, i) in infoBetreuend.unterstuetzungsangebot.value"
                :key="i"
              >
                {{ value }}
              </li>
            </ul>
            <div v-else class="warning">
              <IconWarning class="icon-warning" aria-hidden="true" />
              <span class="text-warning">KEINE</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Demenz Person Beginn -->

      <div class="an-basisinformation__info-demenz">
        <div
          class="an-basisinformation__info-items an-basisinformation__info-diagnose"
        >
          <div class="label">
            {{ infoErkrankt.diagnose.label }}
          </div>
          <div class="value">
            <template v-if="infoErkrankt.diagnose.value">
              {{ infoErkrankt.diagnose.value }}
            </template>
            <div v-else class="warning">
              <IconWarning class="icon-warning" aria-hidden="true" />
              <span class="text-warning">KEINE</span>
            </div>
          </div>
        </div>

        <div
          class="an-basisinformation__info-items an-basisinformation__info-pflegegeld"
        >
          <div class="label">
            {{ infoErkrankt.pflegegeld.label }}
          </div>
          <div class="value">
            <template v-if="infoErkrankt.pflegegeld.value">
              <span
                v-html="pflegegeldLabels[infoErkrankt.pflegegeld.value]"
              ></span>
              <div class="lollipop-field">
                <div
                  v-for="i in 7"
                  :key="i"
                  class="lollipop"
                  :class="{
                    'lollipop-active':
                      i === Number(infoErkrankt.pflegegeld.value)
                  }"
                >
                  <div class="lollipop-bubble">{{ i }}</div>
                </div>
              </div>
            </template>
            <div v-else class="warning">
              <IconWarning class="icon-warning" aria-hidden="true" />
              <span class="text-warning">KEINE</span>
            </div>
          </div>
        </div>

        <div
          class="an-basisinformation__info-items an-basisinformation__info-pflegebedarf"
        >
          <div class="label">
            {{ infoErkrankt.pflegebedarf.label }}
          </div>
          <div class="value">
            <template v-if="infoErkrankt.pflegebedarf.value">
              {{ infoErkrankt.pflegebedarf.value }}
            </template>
            <template v-else>
              KEINE
            </template>
          </div>
        </div>

        <div
          class="an-basisinformation__info-items an-basisinformation__info-unterstuetzungsangebot"
        >
          <div class="label">
            {{ infoErkrankt.unterstuetzungsangebot.label }}
          </div>
          <div class="value">
            <ul v-if="Array.isArray(infoErkrankt.unterstuetzungsangebot.value)">
              <li
                v-for="(value, i) in infoErkrankt.unterstuetzungsangebot.value"
                :key="i"
              >
                {{ value }}
              </li>
            </ul>
            <div v-else class="warning">
              <IconWarning class="icon-warning" aria-hidden="true" />
              <span class="text-warning">KEINE</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import visJson from '@/data/visualisation.json';
import IconWarning from '@/assets/icons/warning.svg?inline';
import IconHands from '@/assets/icons/hands.svg?inline';

export default {
  name: 'AnBasisinformation',
  components: { IconWarning, IconHands },
  computed: {
    infoBetreuend() {
      const betreuendLabels = visJson.visualisation.basisinfo.betreuendeperson;
      return this.getValues(betreuendLabels, 'betreuende_person');
    },
    infoErkrankt() {
      const erkranktLabels = visJson.visualisation.basisinfo.demenzperson;
      return this.getValues(erkranktLabels, 'demenzerkrankte_person');
    },
    infoGeneral() {
      const labels = {
        verhaeltnis: visJson.visualisation.basisinfo.allgemein.verhaeltnis,
        haushalt: visJson.visualisation.basisinfo.allgemein.haushalt
      };
      const values = {
        alterBetreuend: this.$store.getters.getFieldValue(
          'betreuende_person-alter'
        ),
        alterErkrankt: this.$store.getters.getFieldValue(
          'demenzerkrankte_person-alter'
        ),
        verhaeltnis: this.$store.getters.getFieldValue(
          'demenzerkrankte_person-verhaeltnis'
        ),
        haushalt: this.$store.getters.getFieldValue(
          'demenzerkrankte_person-haushalt'
        )
      };

      return { labels, values };
    }
  },
  created() {
    this.pflegegeldLabels = {
      1: 'mind. 65h/Monat',
      2: 'mind. 95h/Monat',
      3: 'mind. 120h/Monat',
      4: 'mind. 160h/Monat',
      5: 'mind. 180h/Monat<br/>+ wenn Bewegungsunfähigkeit gegeben',
      6: 'mind. 180h/Monat<br/>+ wenn Bewegungsunfähigkeit gegeben',
      7: 'mind. 180h/Monat<br/>+ wenn Bewegungsunfähigkeit gegeben'
    };
  },
  methods: {
    getValues(labels, section) {
      const values = {};
      Object.keys(labels).forEach(fieldId => {
        const value = this.$store.getters.getFieldValue(
          `${section}-${fieldId}`
        );
        if (value !== undefined) {
          values[fieldId] = {
            label: labels[fieldId],
            fieldId,
            value:
              value === true
                ? this.$store.getters.getFieldValue(
                    `${section}-${fieldId}detail`
                  )
                : value
          };
        }
      });
      return values;
    }
  }
};
</script>

<style lang="scss" scoped>
$leftwidth: 40%;
$centerwidth: 10%;
$rightwidth: 50%;

.an-basisinformation {
  color-adjust: exact;

  .label {
    font-size: 18px;
    font-weight: bold;
  }

  &__header {
    margin-bottom: 0.5rem;

    &-headings {
      display: flex;
      align-items: flex-end;

      .label {
        margin-right: 0.5rem;
      }

      .betreuend {
        width: $leftwidth;
      }

      .icon-hands {
        margin-bottom: -1rem;
        width: $centerwidth;
        height: 4rem;
      }

      .erkrankt {
        width: $rightwidth;
      }
    }
    &-overallinfo {
      border-top: 2px solid $color-theme-darkgrey;
      background-color: $color-theme-lightgrey;
      width: 100%;
      z-index: 1;
      position: relative;
      text-align: center;
    }
  }

  .warning {
    display: flex;
  }

  .icon-warning {
    height: 1.5rem;
    width: 1.5rem;
    fill: $color-theme-darkred;
    margin-right: 1rem;
    flex-shrink: 0;
  }

  .text-warning {
    color: $color-theme-darkred;
    font-weight: bold;
  }

  &__info {
    &-items {
      margin-bottom: 0.5rem;
    }

    &-wrapper {
      display: flex;
      justify-content: space-between;
    }

    &-betreuend,
    &-demenz {
      width: 50%;
    }

    &-beruf {
      display: flex;

      .dots {
        $width: 100px;
        $margin: 3px;
        $dot: ($width / 5) - $margin * 4 / 5;

        width: $width;
        display: flex;
        flex-wrap: wrap;
        margin-top: 0.3rem;
        margin-left: 1rem;

        .dot {
          box-sizing: border-box;
          width: $dot;
          height: $dot;
          background: $color-theme-lightgrey;
          border: $color-theme-darkgrey solid $dot / 6;
          border-radius: 50%;
          margin-bottom: $margin;
          margin-right: $margin;

          &:nth-child(5n) {
            margin-right: 0;
          }

          &:last-child {
            clip-path: polygon(
              0 0,
              var(--percentage) 0,
              var(--percentage) 100%,
              0 100%
            );
          }
        }
      }
    }

    &-unterstuetzungsangebot,
    &-sorgepflichten {
      overflow-wrap: break-word;

      ul {
        margin: 0;
        padding: 0;
        list-style: none;
        display: flex;
        flex-wrap: wrap;
      }

      li {
        width: 50%;
        &::before {
          content: '+';
        }
      }
    }

    &-pflegegeld {
      $baseheight: 4px;
      $stickwidth: 2px;
      $margin: 4px;
      $stickamount: 7;
      $bubblewidth: 24px;

      @for $i from 1 through $stickamount {
        .lollipop:nth-child(#{$i}) {
          --position: #{$baseheight * $i + $baseheight + 10};
        }
      }

      .lollipop-field {
        display: flex;
        position: relative;

        &::after {
          content: '';
          height: $stickwidth;
          width: ($bubblewidth + $margin) * ($stickamount - 1) + $stickwidth;
          position: absolute;
          left: $bubblewidth / 2 - $stickwidth / 2;
          bottom: 0;
          background: $color-theme-darkgrey;
        }
      }

      .lollipop {
        width: $bubblewidth;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-end;
        margin-right: $margin;
        margin-top: 0.5rem;

        &::after {
          content: '';
          width: $stickwidth;
          height: var(--position);
          background-color: $color-theme-darkgrey;
        }

        .lollipop-bubble {
          height: $bubblewidth;
          width: $bubblewidth;
          border: $color-theme-darkgrey $stickwidth solid;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          margin-bottom: -10px;
          background-color: white;
          z-index: 1;
        }

        &-active {
          &::after {
            width: $stickwidth * 2;
            background-color: $color-theme-darkred;
          }

          .lollipop-bubble {
            border-color: $color-theme-darkred;
            background-color: $color-theme-darkred;
            color: white;
          }
        }
      }
    }
  }
}
</style>
