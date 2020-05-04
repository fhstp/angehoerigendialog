<template>
  <div class="an-flower">
    <ul class="an-flower__list">
      <li v-for="(answer, index) in answers" :key="index">
        <div v-if="answer !== undefined" :class="getClass(answer.type)">
          {{ answer.text }}
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import visualisation from '@/mixins/visualisation.js';
export default {
  name: 'AnFlower',
  mixins: [visualisation],
  computed: {
    answers() {
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

      const resultArray = data.map(object => {
        switch (this.$store.getters.getFieldValue(object.fieldID)) {
          case 'stimmt':
            return {
              text: object.translationPro,
              type: 1
            };
          case 'stimmt_teilweise':
            return {
              text: object.translationMiddle,
              type: 2
            };
          case 'stimmt_nicht':
            return {
              text: object.translationCon,
              type: 3
            };
        }
      });

      let questionsAreAnswered = false;
      for (let i = 0; i < resultArray.length; i++) {
        if (resultArray[i] !== undefined) {
          questionsAreAnswered = true;
          break;
        }
      }
      this.$emit('update:available', questionsAreAnswered);
      return resultArray;
    }
  },
  methods: {
    getClass: type => ({
      'an-flower__list--bloom': type === 1,
      'an-flower__list--bloomwithered': type === 2,
      'an-flower__list--withered': type === 3
    })
  }
};
</script>

<style lang="scss" scoped>
.an-flower {
  &__list {
    list-style-type: none;

    &--bloom {
      background-color: yellow;
    }

    &--bloomwithered {
      background-color: burlywood;
    }

    &--withered {
      background-color: brown;
    }
  }
}
</style>
