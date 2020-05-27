<template>
  <div class="an-basisinformation row">
    <div class="col-md-2">
      <h3>Betreuende Person</h3>
      <div v-for="(info, i) in infoBetreuendePerson" :key="i">
        {{ info.label }}
        {{ info.text }}
        {{ info.value }}
      </div>
    </div>
    <div class="col-md-2">
      <h3>Demenzerkrankte Person</h3>
      <div v-for="(info, i) in infoDemenzPerson" :key="i">
        {{ info.label }}
        {{ info.text }}
        {{ info.value }}
      </div>
    </div>
  </div>
</template>

<script>
import visJson from '@/data/visualisation.json';

export default {
  name: 'AnBasisinformation',
  computed: {
    infoBetreuendePerson() {
      const basisinfoLabel = visJson.visualisation.basisinfo.betreuendeperson;
      const basisInfoValues = [];

      Object.keys(basisinfoLabel).forEach(item => {
        const value = this.$store.getters.getFieldValue(
          `betreuende_person-${item}`
        );

        if (value) {
          basisInfoValues.push({
            label: basisinfoLabel[item],
            text: 'Ja',
            value: this.$store.getters.getFieldValue(
              `betreuende_person-${item}detail`
            )
          });
        }
      });
      return basisInfoValues;
    },
    infoDemenzPerson() {
      const basisinfoLabel = visJson.visualisation.basisinfo.demenzperson;
      const basisInfoValues = [];

      Object.keys(basisinfoLabel).forEach(item => {
        const value = this.$store.getters.getFieldValue(
          `demenzerkrankte_person-${item}`
        );

        if (value) {
          basisInfoValues.push({
            label: basisinfoLabel[item],
            text: 'Ja',
            value: this.$store.getters.getFieldValue(
              `demenzerkrankte_person-${item}detail`
            )
          });
        }
      });
      return basisInfoValues;
    }
  }
};
</script>

<style lang="scss" scoped>
.an-basisinformation {
  justify-content: space-around;

  &__table {
    margin-top: $spacer * 4;
    border: 3px solid black;
    border-collapse: collapse;

    @media print {
      width: 50%;
    }
  }

  tr:nth-child(even) {
    background-color: #eee;
  }
  td {
    text-align: left;
    padding: 8px;
  }
}

.btn {
  &--active {
    background-color: lightblue !important;
    box-shadow: 3px 3px 8px #ccc;
  }
  &:focus {
    background-color: white;
  }

  @media print {
    width: 50%;
  }
}
</style>
