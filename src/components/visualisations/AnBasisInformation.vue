<template>
  <div class="an-basisinformation">
    <div class="an-basisinformation__header-wrapper">
      <div class="an-basisinformation__header-items">
        {{ infoGeneral[0].value[0] }} Jahre Betreuende Person Demenzerkrankte
        Person {{ infoGeneral[0].value[1] }} Jahre
      </div>
      <div class="an-basisinformation__header-overallifno">
        <p>
          {{ `${infoGeneral[1].label}: ${infoGeneral[1].value}` }}
        </p>
        <p v-if="infoGeneral[2].value">
          {{ `${infoGeneral[2].label}` }}
        </p>
      </div>
    </div>

    <div v-for="(info, index) in infoPerson" :key="index">
      {{ info.label }}
      {{ info.text }}
      {{ info.value }}
    </div>
  </div>
</template>

<script>
import visJson from '@/data/visualisation.json';

export default {
  name: 'AnBasisinformation',
  computed: {
    infoPerson() {
      const basisinfoLabels = [
        {
          labels: visJson.visualisation.basisinfo.betreuendeperson,
          id: 'betreuende_person'
        },
        {
          labels: visJson.visualisation.basisinfo.demenzperson,
          id: 'demenzerkrankte_person'
        }
      ];

      const basisInfoValues = [];

      basisinfoLabels.forEach(obj => {
        Object.keys(obj.labels).forEach(fieldId => {
          const value = this.$store.getters.getFieldValue(
            `${obj.id}-${fieldId}`
          );
          basisInfoValues.push({
            label: obj.labels[fieldId],
            text: value === true ? 'Ja' : value,
            value: this.$store.getters.getFieldValue(
              `${obj.id}-${fieldId}detail`
            )
          });
        });
      });
      return basisInfoValues;
    },
    infoGeneral() {
      const basisinfoLabel = visJson.visualisation.basisinfo.allgemein;
      const basisInfoValues = [];

      Object.keys(basisinfoLabel).forEach(item => {
        const value = this.$store.getters.getFieldValue(
          `demenzerkrankte_person-${item}`
        );
        basisInfoValues.push({
          label: basisinfoLabel[item],
          value:
            item === 'alter'
              ? [
                  value,
                  this.$store.getters.getFieldValue(`betreuende_person-${item}`)
                ]
              : value
        });
      });
      return basisInfoValues;
    }
  }
};
</script>

<style lang="scss" scoped>
.an-basisinformation {
  justify-content: center;
  &__header-wrapper {
    background-color: $color-theme-lightgrey;
  }
}
</style>
