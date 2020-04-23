<template>
  <div class="">
    <div>
      Was bereits gut funktioniert
      <ul>
        <li>{{ answers }}</li>
      </ul>
    </div>

    <div>
      Was teilweise funktioniert
      <ul>
        <li></li>
      </ul>
    </div>

    <div>
      Worum ich mich noch kümmern sollte
      <ul>
        <li></li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AnTodoNotepadVue',
  computed: {
    answers() {
      /* const data = [
        'ressourcen_belastungen-rueckzugsmoeglichkeit',
        'ressourcen_belastungen-hobbysinteressen',
        'ressourcen_belastungen-freizeitaktivitaeten',
        'ressourcen_belastungen-zeitfuermichselbst',
        'ressourcen_belastungen-beziehungen',
        'ressourcen_belastungen-anforderungen'
      ].map(function(fieldID, index) {
        return {
          answer: this.$store.getters.getFieldValue(fieldID),
          index
        };
      });

*/
      const component = this;
      const data = [
        {
          fieldID: 'ressourcen_belastungen-rueckzugsmoeglichkeit',
          translationPro: 'Rückzugsorte',
          translationMiddle: 'Rückzugsmöglichkeiten',
          transltionCon: 'Rückzugsmöglichkeiten schaffen'
        },
        {
          fieldID: 'ressourcen_belastungen-hobbysinteressen',
          translationPro: 'Zeit für meine Interessen',
          translationMiddle: 'Zeit für meine Interessen finden',
          transltionCon: 'Zeit für meine Interessen schaffen'
        },
        {
          fieldID: 'ressourcen_belastungen-freizeitaktivitaeten',
          translationPro: 'Freunde treffen',
          translationMiddle: 'Freunde zu treffen',
          transltionCon: 'Regelmäßig mit anderen Menschen treffen'
        },
        {
          fieldID: 'ressourcen_belastungen-zeitfuermichselbst',
          translationPro: 'Erholungszeit für mich',
          translationMiddle: 'Erholungszeit einplanen',
          transltionCon: 'Erholungszeit für mich einplanen'
        },
        {
          fieldID: 'ressourcen_belastungen-beziehungen',
          translationPro: 'Zeit für Familie, Freunde & Verwandte',
          translationMiddle: 'Zeit für Familie, Freunde und Verwandte haben',
          transltionCon: 'Zeit für Familie, Freunde und Verwandte einplanen'
        },
        {
          fieldID: 'ressourcen_belastungen-anforderungen',
          translationPro: 'Pflege und andere Aktivitäten vereinbaren',
          translationMiddle: 'Pflege mit Aktivitäten vereinbaren',
          transltionCon:
            'Die Pflege und andere Aktivitäten miteinander vereinbaren'
        }
      ];

      const resultArray = data.map(function(object) {
        switch (component.$store.getters.getFieldValue(object.fieldID)) {
          case 'stimmt':
            return {
              translationType: 'pro',
              value: object.translationPro
            };

          case 'stimmt_teilweise':
            return {
              translationType: 'middle',
              value: object.translationMiddle
            };

          case 'stimmt_nicht':
            return {
              translationType: 'con',
              value: object.transltionCon
            };
        }
      });
      console.log(resultArray);
      return resultArray;
    }
  }
};
</script>

<style lang="scss" scoped></style>
