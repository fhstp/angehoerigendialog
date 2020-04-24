<template>
  <div class="an-todonotepad row">
    <div v-for="(notepad, index) in answers" :key="index" class="col-md-2">
      <div class="an-todonotepad__heading">
        {{ notepadHeading[index] }}
      </div>
      <ul :class="getClass(index)" class="an-todonotepad__image">
        <li v-for="value in notepad" :key="value">
          {{ value }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AnTodoNotepadVue',
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
      return resultArray;
    }
  },
  methods: {
    getClass(index) {
      return {
        'an-todonotepad__list--check': index === 0,
        'an-todonotepad__list--wave': index === 1,
        'an-todonotepad__list--cross': index === 2
      };
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
    background-image: url('../../assets/icons/notepad.svg');
    background-repeat: no-repeat;
    background-size: cover;
    height: 390px;
  }

  &__list--check {
    list-style-image: url('../../assets/icons/check.svg');
  }

  &__list--wave {
    list-style-image: url('../../assets/icons/wave.svg');
  }

  &__list--cross {
    list-style-image: url('../../assets/icons/cross.svg');
  }
}
</style>
