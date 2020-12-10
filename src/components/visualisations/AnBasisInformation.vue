<template>
  <div class="an-basisinformation">
    <div class="rowSpecial">
      <!-- Betreuende Person Beginn -->

      <div class="colSm">
        <PersonMe class="iconMe" />
      </div>
      <div class="colMd">
        <div class="an-basisinformation__header">
          <strong>Betreuende Person</strong>
          <template v-if="infoGeneral.values.alterBetreuend"
            >{{ infoGeneral.values.alterBetreuend }} Jahre
          </template>
        </div>
        <div class="box leftBox" style="flex: 1;">
          <div class="an-basisinformation__basic">
            <div v-if="infoGeneral.values.verhaeltnis">
              <strong> {{ infoGeneral.labels.verhaeltnis + ':' }} </strong>
              <span>{{ ` ${infoGeneral.values.verhaeltnis}` }}</span>
            </div>
            <div v-if="infoGeneral.values.haushalt">
              {{ infoGeneral.labels.haushalt }}
            </div>
          </div>

          <div
            v-if="infoBetreuend.sorgepflichten"
            class="an-basisinformation-item an-basisinformation-item--sorgepflichten"
          >
            <div class="an-basisinformation-item__title">
              {{ infoBetreuend.sorgepflichten.label + ':' }}
            </div>
            <template v-if="Array.isArray(infoBetreuend.sorgepflichten.value)">
              <!-- <IconWarning class="icon-warning" aria-hidden="true" /> -->
              <span
                v-for="(value, i) in infoBetreuend.sorgepflichten.value"
                :key="i"
              >
                {{
                  i !== infoBetreuend.sorgepflichten.value.length - 1
                    ? value + ','
                    : value
                }}
              </span>
            </template>
            <template v-else>
              keine
            </template>
          </div>

          <div v-if="infoBetreuend.beruf" class="an-basisinformation-item">
            <div>
              <div class="an-basisinformation-item__title">
                {{ infoBetreuend.beruf.label + ':' }}
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
          </div>

          <div
            v-if="infoBetreuend.unterstuetzungsangebot"
            class="an-basisinformation-item an-basisinformation-item--unterstuetzungsangebot"
          >
            <div class="an-basisinformation-item__title">
              {{ infoBetreuend.unterstuetzungsangebot.label + ':' }}
            </div>
            <div
              v-if="Array.isArray(infoBetreuend.unterstuetzungsangebot.value)"
            >
              <span
                v-for="(value, i) in infoBetreuend.unterstuetzungsangebot.value"
                :key="i"
              >
                {{
                  i !== infoBetreuend.unterstuetzungsangebot.value.length - 1
                    ? value + ','
                    : value
                }}
              </span>
            </div>
            <div v-else class="d-flex">
              <IconWarning class="icon-warning" aria-hidden="true" />
              <strong class="darkred">KEINE</strong>
            </div>
          </div>
        </div>
      </div>
      <!-- Demenz Person Beginn -->

      <div class="colMd">
        <div class="an-basisinformation__header" style="margin-left: auto;">
          <strong>Demenzerkrankte Person</strong>
          <template v-if="infoGeneral.values.alterErkrankt">
            {{ infoGeneral.values.alterErkrankt }} Jahre</template
          >
        </div>
        <div class="box rightBox" style="flex: 1;">
          <div
            v-if="infoErkrankt.diagnose"
            class="an-basisinformation-item--first"
          >
            <div class="an-basisinformation-item__title">
              {{ infoErkrankt.diagnose.label }}
            </div>
            <div>
              <template v-if="infoErkrankt.diagnose.value">
                {{ infoErkrankt.diagnose.value }}
              </template>
              <div v-else>
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
              <div v-else>
                <strong class="darkred">KEINE</strong>
              </div>
            </div>
          </div>

          <div
            v-if="infoErkrankt.pflegebedarf"
            class="an-basisinformation-item"
          >
            <div class="an-basisinformation-item__title">
              {{ infoErkrankt.pflegebedarf.label }}
            </div>
            <div>
              <template v-if="infoErkrankt.pflegebedarf.value">
                {{ infoErkrankt.pflegebedarf.value }}
              </template>
              <template v-else>
                <strong class="darkred">KEINE</strong>
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
            <div
              v-if="Array.isArray(infoErkrankt.unterstuetzungsangebot.value)"
            >
              <span
                v-for="(value, i) in infoErkrankt.unterstuetzungsangebot.value"
                :key="i"
              >
                {{
                  i !== infoErkrankt.unterstuetzungsangebot.value.length - 1
                    ? value + ','
                    : value
                }}
              </span>
            </div>
            <div v-else>
              <strong class="darkred">KEINE</strong>
            </div>
          </div>
        </div>
      </div>
      <div class="colSm">
        <PersonOther class="iconOther" />
      </div>
    </div>
  </div>
</template>

<script>
import visJson from '@/data/visualisation.json';
import IconWarning from '@/assets/icons/warning.svg?inline';
import PersonMe from '@/assets/icons/person-arms-down_ich.svg?inline';
import PersonOther from '@/assets/icons/person-arms-down_puzzle.svg?inline';

export default {
  name: 'AnBasisinformation',
  components: { IconWarning, PersonMe, PersonOther },
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
$yellow-color: $color-theme-yellow;
$blue-color: #3566aa;

.rowSpecial {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;

  .colSm {
    display: flex;
    flex-direction: column;
    flex: 0.2;
  }

  .colMd {
    display: flex;
    flex-direction: column;
    flex: 1;

    @media screen {
      padding: 10px 0;
    }
  }
}

.iconMe {
  height: 10rem;
  width: 100%;
  fill: $yellow-color;
}

.iconOther {
  height: 10rem;
  width: 100%;
  fill: $blue-color;
}

.box {
  padding: 30px 15px;
  border: 2px solid $color-theme-lightgrey;
  margin: 0 2%;
}

.leftBox {
  border-left-width: 7px;
  border-left-style: solid;
  border-left-color: $yellow-color;
}

.rightBox {
  text-align: right;
  border-right-width: 7px;
  border-right-style: solid;
  border-right-color: $blue-color;

  > * {
    float: right;
  }
}

.an-basisinformation {
  color-adjust: exact;

  &__basic {
    display: flex;
    align-items: flex-start;
    flex-wrap: wrap;
  }

  &__header {
    margin-bottom: $spacer;
    display: flex;
    flex-wrap: wrap;
    align-items: flex-end;

    strong {
      margin-right: $spacer;
    }

    &-betreuend {
      width: $leftwidth;
    }

    &-erkrankt {
      width: $rightwidth;
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
  margin-top: 20px;

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
  float: right;
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
        background-color: $color-theme-darkgrey;
      }

      .an-mini-lollipop__bubble {
        border-color: $color-theme-darkgrey;
        background-color: $color-theme-darkgrey;
        color: white;
      }
    }
  }
}
</style>
