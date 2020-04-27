<template>
  <div class="an-todonotepad row">
    <div v-for="(notepad, index) in answers" :key="index" class="col-md-2">
      <div class="an-todonotepad__heading">
        {{ notepadHeading[index] }}
      </div>
      <ul class="an-todonotepad__list">
        <li v-for="value in notepad" :key="value">
          <div :class="getClass(index)" class="an-todonotepad__image"></div>
          <div class="an-todonotepad__list--text">{{ value }}</div>
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
        'Was noch nicht funktioniert'
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
    text-align: center;
    margin: $spacer * 3;
  }

  &__list {
    background-image: url('../../assets/icons/notepad.svg');
    background-repeat: no-repeat;
    height: 316px;
    margin: 0 $spacer * 2;
    padding: 53px 32px;

    li {
      padding: $spacer 0 $spacer 0;
      list-style: none;
      display: flex;
    }
  }
  &__list--text {
    width: 85%;
    margin-left: 5%;
  }
  &__image {
    width: 10%;
    background-repeat: no-repeat;
  }

  &__list--check {
    background-image: url('../../assets/icons/check.svg');
  }

  &__list--wave {
    background-image: url('../../assets/icons/wave.svg');
  }

  &__list--cross {
    background-image: url('../../assets/icons/cross.svg');
  }
}
</style>
