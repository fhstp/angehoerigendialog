<template>
  <div class="an-basisinformation col-md-6 row">
    <button
      :class="[
        'col-md-3',
        'btn',
        { 'btn--active': btnActive_betreuendePerson }
      ]"
      @click="btnActive_betreuendePerson = !btnActive_betreuendePerson"
    >
      Betreuende Person
    </button>

    <button
      :class="['col-md-3', 'btn', { 'btn--active': btnActive_demenzPerson }]"
      @click="btnActive_demenzPerson = !btnActive_demenzPerson"
    >
      Demenzerkrankte Person
    </button>

    <table
      v-if="btnActive_betreuendePerson"
      class="an-basisinformation__table col-md-3"
    >
      <tr v-for="(answer, row) in answerArray_betreuendePerson[0]" :key="row">
        <td>{{ tdHeading['betreuende_person'][row] }}</td>
        <td :colspan="answer === 'ja' && row === 1 ? 0 : 2">{{ answer }}</td>
        <td v-if="answer === 'ja' && row === 1">
          {{ answerArray_betreuendePerson[1][0] }}h
        </td>
      </tr>
    </table>

    <table
      v-if="btnActive_demenzPerson"
      class="an-basisinformation__table col-md-3"
    >
      <tr v-for="(answer, row) in answerArray_demenzPerson" :key="row">
        <td>{{ tdHeading['demenzerkrankte_person'][row] }}</td>
        <td>{{ answer }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: 'AnBasisinformation',
  data() {
    return {
      btnActive_betreuendePerson: false,
      btnActive_demenzPerson: false,
      tdHeading: {
        betreuende_person: [
          'Alter',
          'Berufstätigkeit',
          'Weitere Betreuungs- oder Sorgepflichten',
          'Unterstützungsangebote'
        ],
        demenzerkrankte_person: [
          'Verwandtschaftliches Verhältnis',
          'Alter',
          'Unterstüztungsbedarf seit',
          'Ärztliche Demenzdiagnose',
          'Pflegestufe',
          'Gemeinsamer Haushalt',
          'Unterstützungsangebote'
        ]
      },
      fieldKey: {
        betreuende_person: [
          'alter',
          'beruf',
          'berufdetail',
          'sorgepflichten',
          'unterstuetzungsangebote'
        ],
        demenzerkrankte_person: [
          'verhaeltnis',
          'alter',
          'pflegebedarf',
          'diagnose',
          'pflegegelddetail',
          'haushalt',
          'unterstuetzungsangebot'
        ]
      },
      answerArray_betreuendePerson: [[], []],
      answerArray_demenzPerson: []
    };
  },
  mounted() {
    this.getBasisinfo('betreuende_person');
    this.getBasisinfo('demenzerkrankte_person');
  },
  methods: {
    getBasisinfo(sectionKey) {
      this.fieldKey[sectionKey].forEach(key => {
        let fieldValue = this.$store.getters.getFieldValue(
          `${sectionKey}-${key}`
        );
        if (fieldValue === undefined) fieldValue = '-';
        if (fieldValue === false) fieldValue = 'nein';
        else if (fieldValue === true) fieldValue = 'ja';
        if (sectionKey === 'betreuende_person') {
          if (key === 'berufdetail') {
            this.answerArray_betreuendePerson[1].push(fieldValue);
          } else this.answerArray_betreuendePerson[0].push(fieldValue);
        } else this.answerArray_demenzPerson.push(fieldValue);
      });
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
}
</style>
