<template>
  <div class="an-basisinformation col-md-6 row">
    <button
      :class="[
        'col-md-3 btn',
        {
          'col-md-3 btn--active': btnActive_pflegendePerson
        }
      ]"
      @click="btnActive_pflegendePerson = !btnActive_pflegendePerson"
    >
      Pflegende Person
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
      v-if="btnActive_pflegendePerson"
      class="an-basisinformation__table"
      :class="{
        'col-md-2': btnActive_pflegendePerson && btnActive_demenzPerson
      }"
    >
      <tr>
        <td>Alter</td>
        <td>Inhalt dynamisch</td>
      </tr>
      <tr>
        <td>Berufstätigkeit</td>
        <td>Inhalt dynamisch</td>
      </tr>
      <tr>
        <td>Weitere Betreuungs- oder Sorgepflichten</td>
        <td>Inhalt dynamisch</td>
      </tr>
      <tr>
        <td>Unterstützungsangebote</td>
        <td>Inhalt dynamisch</td>
      </tr>
    </table>

    <table
      v-if="btnActive_demenzPerson"
      class="an-basisinformation__table "
      :class="{
        'col-md-2 !important':
          btnActive_pflegendePerson && btnActive_demenzPerson
      }"
    >
      <tr>
        <td>Verwandtschaftliches Verhätnis</td>
        <td>Inhalt dynamisch</td>
      </tr>
      <tr>
        <td>Alter</td>
        <td>Inhalt dynamisch</td>
      </tr>
      <tr>
        <td>Unterstüztungsbedarf seit</td>
        <td>Inhalt dynamisch</td>
      </tr>
      <tr>
        <td>Pflegestufe</td>
        <td>Inhalt dynamisch</td>
      </tr>
      <tr>
        <td>Gemeinsamer Haushalt</td>
        <td>Inhalt dynamisch</td>
      </tr>
      <tr>
        <td>Unterstützungsangebote</td>
        <td>Inhalt dynamisch</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: 'AnBasisinformation',
  data() {
    return {
      btnActive_pflegendePerson: false,
      btnActive_demenzPerson: false
    };
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
  td,
  th {
    text-align: left;
    padding: 8px;
    border-collapse: collapse;
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
