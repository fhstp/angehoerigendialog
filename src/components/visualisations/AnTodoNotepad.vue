<template>
  <div class="an-todonotepad row">
    <div
      v-for="(notepad, index) in answers"
      :key="index"
      class="col-md-2 an-todonotepad__image"
    >
      <div class="an-todonotepad__heading">
        {{ notepadHeading[index] }}
      </div>
      <ul>
        <!--<IconNotepad />-->
        <!--<template v-if="notepad">-->
        <li v-for="value in notepad" :key="value">{{ value }}</li>
        <!--</template>-->
      </ul>
    </div>
  </div>
</template>

<script>
// import IconNotepad from '@/assets/icons/notepad.svg';
export default {
  name: 'AnTodoNotepadVue',
  // components: { IconNotepad },
  data() {
    return {
      notepadHeading: [
        'Was bereits gut funktioniert',
        'Was teilweise funktioniert',
        'Worum ich mich noch kümmern sollte'
      ]
    };
  },
  computed: {
    answers() {
      const component = this;
      const data = [
        {
          fieldID: 'ressourcen_belastungen-rueckzugsmoeglichkeit',
          translationPro: 'Rückzugsorte',
          translationMiddle: 'Rückzugsmöglichkeiten',
          translationCon: 'Rückzugsmöglichkeiten schaffen'
        },
        {
          fieldID: 'ressourcen_belastungen-hobbysinteressen',
          translationPro: 'Zeit für meine Interessen',
          translationMiddle: 'Zeit für meine Interessen finden',
          translationCon: 'Zeit für meine Interessen schaffen'
        },
        {
          fieldID: 'ressourcen_belastungen-freizeitaktivitaeten',
          translationPro: 'Freunde treffen',
          translationMiddle: 'Freunde zu treffen',
          translationCon: 'Regelmäßig mit anderen Menschen treffen'
        },
        {
          fieldID: 'ressourcen_belastungen-zeitfuermichselbst',
          translationPro: 'Erholungszeit für mich',
          translationMiddle: 'Erholungszeit einplanen',
          translationCon: 'Erholungszeit für mich einplanen'
        },
        {
          fieldID: 'ressourcen_belastungen-beziehungen',
          translationPro: 'Zeit für Familie, Freunde & Verwandte',
          translationMiddle: 'Zeit für Familie, Freunde und Verwandte haben',
          translationCon: 'Zeit für Familie, Freunde und Verwandte einplanen'
        },
        {
          fieldID: 'ressourcen_belastungen-anforderungen',
          translationPro: 'Pflege und andere Aktivitäten vereinbaren',
          translationMiddle: 'Pflege mit Aktivitäten vereinbaren',
          translationCon:
            'Die Pflege und andere Aktivitäten miteinander vereinbaren'
        }
      ];

      const resultArray = [[], [], []];
      data.forEach(function(object, index) {
        switch (component.$store.getters.getFieldValue(object.fieldID)) {
          case 'stimmt':
            resultArray[0].push(object.translationPro);
            break;
          case 'stimmt_teilweise':
            resultArray[1].push(object.translationMiddle);
            break;
          case 'stimmt_nicht':
            resultArray[2].push(object.translationCon);
            break;
        }
      });

      console.log(resultArray);
      return resultArray;
    }
  }
};
</script>

<style lang="scss" scoped>
.an-todonotepad {
  &__heading {
    font-weight: bold;
  }

  &__image {
    //background-image: url('~@/assets/icons/notepad.svg');
    background-image: url('../../assets/icons/notepad.svg');
    //background-image: url("paper.gif");
  }
}
</style>
