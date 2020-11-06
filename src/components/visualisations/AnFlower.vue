<template>
  <div class="an-flower">
    <div class="grid-container">
      <div v-if="highItems.length" class="an-High" :class="checkSmall()">
        <div class="an-Text"></div>
        <div class="an-Image">
          <IconFlowerBig class="flowerBig" />
        </div>
        <div class="an-Boxes">
          <div
            v-for="(answer, index) in highItems"
            :key="index"
            class="an-textBox"
            :class="index === 0 ? 'no-offset' : ''"
          >
            <span v-html="answer.text"></span>
          </div>
        </div>
      </div>
      <div v-if="mediumItems.length" class="an-Medium" :class="checkSmall()">
        <div class="an-Text2"></div>
        <div class="an-Image2">
          <IconFlowerSmall class="flowerSmall" />
        </div>
        <div class="an-Boxes2">
          <div
            v-for="(answer, index) in mediumItems"
            :key="index"
            class="an-textBox"
            :class="index === 0 ? 'no-offset' : ''"
          >
            <span class="an-answerText" v-html="answer.text"></span>
          </div>
        </div>
      </div>
      <div v-if="wateringcanItems.length" class="an-Low" :class="checkSmall()">
        <div class="an-Text3">
          <strong>... und darum muss ich mich kümmern:</strong>
        </div>
        <div class="an-Image3">
          <IconSeedCan class="seedCan" />
        </div>
        <div class="an-Boxes3">
          <div
            v-for="(answer, index) in wateringcanItems"
            :key="index"
            class="an-textBox"
            :class="index === 0 ? 'no-offset' : ''"
          >
            <span v-html="answer.text"></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { numberOfNonEmptyArrays } from '@/helpers/util.js';
import visJson from '@/data/visualisation.json';
import visualisation from '@/mixins/visualisation.js';
import IconFlowerBig from '@/assets/icons/blume_gross.svg?inline';
import IconFlowerSmall from '@/assets/icons/blume_klein.svg?inline';
import IconSeedCan from '@/assets/icons/knospe_und_giesskanne.svg?inline';
export default {
  name: 'AnFlower',
  components: { IconFlowerBig, IconFlowerSmall, IconSeedCan },
  mixins: [visualisation],
  computed: {
    answers() {
      const data = visJson.visualisation.flower;

      let questionsAreAnswered = false;
      data.forEach(object => {
        object.type = this.$store.getters.getFieldValue(object.fieldID);
        if (object.type !== undefined) {
          questionsAreAnswered = true;
        }
      });
      this.$emit('update:available', questionsAreAnswered);
      return data;
    },
    highItems() {
      return this.answers.filter(obj => obj.type === 'stimmt');
    },
    mediumItems() {
      return this.answers.filter(obj => obj.type === 'stimmt_teilweise');
    },
    wateringcanItems() {
      return this.answers.filter(object => {
        return object.type === 'stimmt_nicht';
      });
    }
  },
  methods: {
    checkSmall() {
      const cols = numberOfNonEmptyArrays(
        this.highItems,
        this.mediumItems,
        this.wateringcanItems
      );
      const columnCssClasses = ['oneCol', 'twoCols', ''];
      return columnCssClasses[cols - 1];
    }
  }
};
</script>

<style lang="scss" scoped>
$grey: $color-theme-lightgrey;
$centerSize: 64px;

.grid-container {
  margin-top: 40px;
  width: 100%;
  display: grid;
  grid-template-columns: 0.7fr 0.7fr 0.7fr;
  grid-template-areas: 'an-High an-Medium an-Low';
  gap: 0px 20px;
}

.an-High {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 0.2fr 1fr 1fr;
  gap: 0px 0px;
  grid-template-areas:
    'an-Text'
    'an-Image'
    'an-Boxes';
  grid-area: an-High;
}

.an-Text {
  grid-area: an-Text;
}

.an-Image {
  grid-area: an-Image;
  display: flex;
  align-items: flex-end;
  justify-content: center;

  > .flowerBig {
    position: relative;
    z-index: -1;
    top: 0;
    right: 0;
    width: 30%;
  }
}

.an-Boxes {
  grid-area: an-Boxes;
}

.an-Medium {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 0.2fr 1fr 1fr;
  gap: 0px 0px;
  grid-template-areas:
    'an-Text2'
    'an-Image2'
    'an-Boxes2';
  grid-area: an-Medium;
}

.an-Text2 {
  grid-area: an-Text2;
}

.an-Image2 {
  grid-area: an-Image2;
  display: flex;
  align-items: flex-end;
  justify-content: center;

  > .flowerSmall {
    position: relative;
    z-index: -1;
    top: 0;
    right: 0;
    width: 25%;
  }
}

.an-Boxes2 {
  grid-area: an-Boxes2;
}

.an-Low {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 0.2fr 1fr 1fr;
  gap: 0px 0px;
  grid-template-areas:
    'an-Text3'
    'an-Image3'
    'an-Boxes3';
  grid-area: an-Low;
}

.an-Text3 {
  grid-area: an-Text3;
}

.an-Image3 {
  grid-area: an-Image3;
  display: flex;
  align-items: flex-end;
  justify-content: center;

  > .seedCan {
    position: relative;
    z-index: -1;
    top: 0;
    right: 0;
    width: 44%;
  }
}

.an-Boxes3 {
  grid-area: an-Boxes3;
}

.an-textBox {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: $grey;
  border-radius: 6px;
  height: $centerSize;
  padding: 5px;
  margin: 4px 0;
}

.no-offset {
  margin-top: 0px;
}

.twoCols {
  grid-template-rows: 0.2fr 1fr 1fr;
}

.oneCol {
  grid-template-rows: 0fr auto 1fr;
}
</style>
