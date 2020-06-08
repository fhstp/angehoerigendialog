<template>
  <div class="an-basisinformation">
    <div class="an-basisinformation__header">
      <div class="an-basisinformation__header-betreuend">
        <strong>Betreuende Person</strong>
        <template v-if="infoGeneral.values.alterBetreuend"
          >{{ infoGeneral.values.alterBetreuend }} Jahre
        </template>
      </div>
      <IconHands class="icon-hands" />
      <div class="an-basisinformation__header-erkrankt">
        <strong>Demenzerkrankte Person</strong>
        <template v-if="infoGeneral.values.alterErkrankt">
          {{ infoGeneral.values.alterErkrankt }} Jahre</template
        >
      </div>

      <div class="an-basisinformation__header-commoninfo">
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

    <div class="row">
      <div class="col-3">
        <div
          v-if="infoBetreuend.sorgepflichten"
          class="an-basisinformation-item an-basisinformation-item--sorgepflichten"
        >
          <div class="an-basisinformation-item__title">
            {{ infoBetreuend.sorgepflichten.label }}
          </div>
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

        <div v-if="infoBetreuend.beruf" class="an-basisinformation-item row">
          <div>
            <div class="an-basisinformation-item__title">
              {{ infoBetreuend.beruf.label }}
            </div>
            <div v-if="infoBetreuend.beruf.value" class="d-flex">
              <IconWarning
                v-if="infoBetreuend.beruf.value > 40"
                class="icon-warning"
                aria-hidden="true"
              />
              <component
                :is="infoBetreuend.beruf.value > 40 ? 'strong' : 'span'"
                :class="{ darkred: infoBetreuend.beruf.value > 40 }"
              >
                {{ infoBetreuend.beruf.value }}h/Woche
              </component>
            </div>
            <template v-else>keine</template>
          </div>
          <div v-if="infoBetreuend.beruf.value" class="an-dots">
            <span
              v-for="i in Math.floor(infoBetreuend.beruf.value)"
              :key="i"
              class="an-dots__dot"
            />
            <span
              v-if="
                Math.ceil(infoBetreuend.beruf.value) !==
                infoBetreuend.beruf.value
              "
              class="an-dots__dot"
              :style="{
                '--percentage':
                  (infoBetreuend.beruf.value -
                    Math.floor(infoBetreuend.beruf.value)) *
                    100 +
                  '%'
              }"
            />
          </div>
        </div>

        <div
          v-if="infoBetreuend.unterstuetzungsangebot"
          class="an-basisinformation-item an-basisinformation-item--unterstuetzungsangebot"
        >
          <div class="an-basisinformation-item__title">
            {{ infoBetreuend.unterstuetzungsangebot.label }}
          </div>
          <ul v-if="Array.isArray(infoBetreuend.unterstuetzungsangebot.value)">
            <li
              v-for="(value, i) in infoBetreuend.unterstuetzungsangebot.value"
              :key="i"
            >
              {{ value }}
            </li>
          </ul>
          <div v-else class="d-flex">
            <IconWarning class="icon-warning" aria-hidden="true" />
            <strong class="darkred">KEINE</strong>
          </div>
        </div>
      </div>

      <!-- Demenz Person Beginn -->

      <div class="col-3">
        <div v-if="infoErkrankt.diagnose" class="an-basisinformation-item">
          <div class="an-basisinformation-item__title">
            {{ infoErkrankt.diagnose.label }}
          </div>
          <div>
            <template v-if="infoErkrankt.diagnose.value">
              {{ infoErkrankt.diagnose.value }}
            </template>
            <div v-else class="d-flex">
              <IconWarning class="icon-warning" aria-hidden="true" />
              <strong class="darkred">KEINE</strong>
            </div>
          </div>
        </div>

        <div v-if="infoErkrankt.pflegegeld" class="an-basisinformation-item">
          <div class="an-basisinformation-item__title">
            {{ infoErkrankt.pflegegeld.label }}
          </div>
          <div>
            <template v-if="infoErkrankt.pflegegeld.value">
              <span
                v-html="pflegegeldLabels[infoErkrankt.pflegegeld.value]"
              ></span>
              <div class="an-mini-lollipop">
                <div
                  v-for="i in 7"
                  :key="i"
                  class="an-mini-lollipop__item"
                  :class="{
                    'an-mini-lollipop__item--active':
                      i === Number(infoErkrankt.pflegegeld.value)
                  }"
                >
                  <div class="an-mini-lollipop__bubble">{{ i }}</div>
                </div>
              </div>
            </template>
            <div v-else class="d-flex">
              <IconWarning class="icon-warning" aria-hidden="true" />
              <strong class="darkred">KEINE</strong>
            </div>
          </div>
        </div>

        <div v-if="infoErkrankt.pflegebedarf" class="an-basisinformation-item">
          <div class="an-basisinformation-item__title">
            {{ infoErkrankt.pflegebedarf.label }}
          </div>
          <div>
            <template v-if="infoErkrankt.pflegebedarf.value">
              {{ infoErkrankt.pflegebedarf.value }}
            </template>
            <template v-else>
              KEINE
            </template>
          </div>
        </div>

        <div
          v-if="infoErkrankt.unterstuetzungsangebot"
          class="an-basisinformation-item an-basisinformation-item--unterstuetzungsangebot"
        >
          <div class="an-basisinformation-item__title">
            {{ infoErkrankt.unterstuetzungsangebot.label }}
          </div>
          <ul v-if="Array.isArray(infoErkrankt.unterstuetzungsangebot.value)">
            <li
              v-for="(value, i) in infoErkrankt.unterstuetzungsangebot.value"
              :key="i"
            >
              {{ value }}
            </li>
          </ul>
          <div v-else class="d-flex">
            <IconWarning class="icon-warning" aria-hidden="true" />
            <strong class="darkred">KEINE</strong>
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

.icon-hands {
  margin-bottom: -$spacer * 2;
  width: $centerwidth;
  height: 4rem;
}

.an-basisinformation {
  color-adjust: exact;

  &__header {
    margin-bottom: $spacer;
    display: flex;
    flex-wrap: wrap;
    align-items: flex-end;

    strong {
      margin-right: $spacer;
      font-size: 1.125rem;
    }

    &-betreuend {
      width: $leftwidth;
    }

    &-erkrankt {
      width: $rightwidth;
    }

    &-commoninfo {
      border-top: 2px solid $color-theme-blue;
      background-color: $color-theme-lightgrey;
      width: 100%;
      text-align: center;
    }
  }

  .icon-warning {
    height: 1.5rem;
    width: 1.5rem;
    fill: $color-theme-darkred;
    margin-right: 1rem;
    flex-shrink: 0;
  }
}

.an-basisinformation-item {
  margin-bottom: $spacer;

  &--unterstuetzungsangebot,
  &--sorgepflichten {
    overflow-wrap: break-word;

    ul {
      display: grid;
      grid-template-columns: max-content max-content;
      grid-gap: 0 $spacer * 2;
      margin: 0;
      padding: 0;
      list-style: none;
    }

    li::before {
      content: '+';
    }
  }

  &__title {
    font-size: 1.125rem;
    font-weight: 700;
  }
}

.an-dots {
  $width: 130px;
  $margin: 2px;
  $dotamount: 8;
  $dot: ($width / $dotamount) - $margin;

  width: $width;
  display: grid;
  grid-template-columns: repeat($dotamount, 1fr);
  gap: $margin;
  margin-top: 0.3rem;
  margin-left: 1rem;

  &__dot {
    box-sizing: border-box;
    width: $dot;
    height: $dot;
    background: white;
    border: $color-theme-blue solid $dot / 6;
    border-radius: 50%;

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

.an-mini-lollipop {
  $baseheight: 4px;
  $stickwidth: 2px;
  $margin: 4px;
  $stickamount: 7;
  $bubblewidth: 24px;
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

  &__item {
    width: $bubblewidth;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    margin-right: $margin;
    margin-top: $spacer;

    @for $i from 1 through $stickamount {
      &:nth-child(#{$i}) {
        --position: #{$baseheight * $i + $baseheight + 10};
      }
    }

    &::after {
      content: '';
      width: $stickwidth;
      height: var(--position);
      background-color: $color-theme-darkgrey;
    }

    .an-mini-lollipop__bubble {
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

    &--active {
      &::after {
        width: $stickwidth * 2;
        background-color: $color-theme-darkred;
      }

      .an-mini-lollipop__bubble {
        border-color: $color-theme-darkred;
        background-color: $color-theme-darkred;
        color: white;
      }
    }
  }
}
</style>
