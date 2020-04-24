<template>
  <div class="an-basisinformation col-md-6 row">
    <button
      :class="[
        'col-md-3 btn',
        {
          'col-md-3 btn--active': btnActive_betreuendePerson
        }
      ]"
      @click="btnActive_betreuendePerson = !btnActive_betreuendePerson"
    >
      Betreuende Person
    </button>

    <button
      :class="[
        'col-md-3 btn',
        { 'col-md-3 btn--active': btnActive_demenzPerson }
      ]"
      @click="btnActive_demenzPerson = !btnActive_demenzPerson"
    >
      Demenzerkrankte Person
    </button>

    <table
      v-if="btnActive_betreuendePerson"
      class="an-basisinformation__table col-md-3"
    >
      <tr>
        <td>Alter</td>
        <td colspan="2">{{ getBasisinfo('betreuende_person', 'alter') }}</td>
      </tr>
      <tr>
        <td>Berufstätigkeit</td>
        <td>{{ getBasisinfo('betreuende_person', 'beruf') }}</td>
        <td>{{ getBasisinfo('betreuende_person', 'berufdetail') }} h</td>
      </tr>
      <tr>
        <td>Weitere Betreuungs- oder Sorgepflichten</td>
        <td colspan="2">
          {{ getBasisinfo('betreuende_person', 'sorgepflichten') }}
        </td>
      </tr>
      <tr>
        <td>Unterstützungsangebote</td>
        <td colspan="2">
          {{ getBasisinfo('betreuende_person', 'unterstuetzungsangebote') }}
        </td>
      </tr>
    </table>

    <table
      v-if="btnActive_demenzPerson"
      class="an-basisinformation__table col-md-3 "
    >
      <tr>
        <td>Verwandtschaftliches Verhältnis</td>
        <td>
          {{ getBasisinfo('demenzerkrankte_person', 'verhaeltnis') }}
        </td>
      </tr>
      <tr>
        <td>Alter</td>
        <td>
          {{ getBasisinfo('demenzerkrankte_person', 'alter') }}
        </td>
      </tr>

      <tr>
        <td>Unterstüztungsbedarf seit</td>
        <td>{{ getBasisinfo('demenzerkrankte_person', 'pflegebedarf') }}</td>
      </tr>
      <tr>
        <td>Ärztliche Demenzdiagnose</td>
        <td>{{ getBasisinfo('demenzerkrankte_person', 'diagnose') }}</td>
      </tr>
      <tr>
        <td>Pflegestufe</td>
        <td
          :class="{
            'an-basisinformation--noscale': !getBasisinfo(
              'demenzerkrankte_person',
              'pflegegelddetail'
            )
          }"
        >
          {{ getBasisinfo('demenzerkrankte_person', 'pflegegelddetail') }}
        </td>
      </tr>
      <tr>
        <td>Gemeinsamer Haushalt</td>
        <td>{{ getBasisinfo('demenzerkrankte_person', 'haushalt') }}</td>
      </tr>
      <tr>
        <td>Unterstützungsangebote</td>
        <td>
          {{ getBasisinfo('demenzerkrankte_person', 'unterstuetzungsangebot') }}
        </td>
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
      btnActive_demenzPerson: false
    };
  },
  methods: {
    getBasisinfo(sectionKey, fieldKey) {
      let fieldValue = this.$store.getters.getFieldValue(
        sectionKey + '-' + fieldKey
      );
      if (fieldValue === undefined) fieldValue = '-';
      if (fieldValue === false) fieldValue = 'nein';
      else if (fieldValue === true) fieldValue = 'ja';
      return fieldValue;
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

  &--noscale {
    background-color: red;
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
