<template>
  <div class="an-todonotepad">
    <div v-for="(notepad, index) in answers" :key="index">
      <div class="an-todonotepad__heading">
        {{ notepadHeading[index] }}
      </div>
      <div class="an-todonotepad__list">
        <ul class="neu">
          <li v-for="value in notepad" :key="value">
            <div :class="getClass(index)" class="an-todonotepad__image"></div>
            <div class="an-todonotepad__list--text">{{ value }}</div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import visualisation from '@/mixins/visualisation.js';
export default {
  name: 'AnTodoNotepadVue',
  mixins: [visualisation],
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
      const questionsAreAnswered =
        resultArray[0].length > 0 ||
        resultArray[1].length > 0 ||
        resultArray[2].length > 0;
      this.$emit('update:available', questionsAreAnswered);
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
  display: flex;
  align-items: stretch;
  @media only screen and (max-width: 850px) {
    flex-direction: column;
    width: 42%;
    margin: 0 auto;
  }

  > div {
    flex: 1;
  }

  .neu {
    padding: 0 40px;
    background-image: url('../../assets/icons/ListeMitte.svg');
    height: 100%;
  }

  &__heading {
    font-weight: bold;
    text-align: center;
    margin: $spacer * 3;
  }

  &__list {
    height: auto;
    margin: 0 1rem;
    height: calc(100% - 65px);
    position: relative;
    padding-top: 56px;
    padding-bottom: 35px;

    @media only screen and (max-width: 850px) {
      padding-top: 65px;
      padding-bottom: 56px;
    }

    li {
      padding: $spacer 0 $spacer 0;
      list-style: none;
      display: flex;
    }
  }

  &__list:before {
    content: '';
    background-image: url('../../assets/icons/ListeOben.svg');
    background-repeat: no-repeat;
    width: 100%;
    height: 100%;
    display: block;
    position: absolute;
    top: 0;
    left: 0;
  }

  &__list:after {
    content: '';
    background-image: url('../../assets/icons/ListeUnten.svg');
    background-repeat: no-repeat;
    width: 100%;
    height: 100%;
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    background-position: bottom;
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
    background-position-y: 2px;
  }

  &__list--wave {
    background-image: url('../../assets/icons/wave.svg');
    background-position-y: 5px;
  }

  &__list--cross {
    background-image: url('../../assets/icons/cross.svg');
    background-position-y: 1px;
  }
}
</style>
