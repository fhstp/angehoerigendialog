<template>
  <div class="an-flower">
    <div class="grid-container">
      <div v-if="highItems.length" class="an-High">
        <div class="an-Text"></div>
        <div class="an-Image">Image</div>
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
      <div v-if="mediumItems.length" class="an-Medium">
        <div class="an-Text2"></div>
        <div class="an-Image2">Image</div>
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
      <div v-if="wateringcanItems.length" class="an-Low">
        <div class="an-Text3">
          <div class="an-watering-heading">
            <strong>... und darum muss ich mich kümmern:</strong>
          </div>
        </div>
        <div class="an-Image3">Image</div>
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
    <!-- <div class="an-flower__flower">
      <div
        v-for="(answer, index) in answers"
        :key="index"
        class="an-flower__pillwrapper"
        :class="getClass(answer.type, index)"
      >
        <div
          v-for="pillIndex in 3"
          :key="pillIndex"
          class="an-flower__pill"
        ></div>
        <div class="an-flower__text"><span v-html="answer.text"></span></div>
      </div>
      <div
        class="an-flower__overlay"
        :class="getClass(answers[0].type, 0)"
      ></div>
      <div
        class="an-flower__overlay_line"
        :class="getClass(answers[1].type, 0)"
      ></div>
    </div> -->

    <!-- <div v-if="wateringcanItems.length" class="an-flower__wateringcan">
      <div class="an-flower__wateringcan-heading">
        <strong>Darum sollte ich mich kümmern:</strong>
      </div>
      <div class="an-flower__wateringcan__circle"></div>
      <IconWateringcan
        class="an-flower__wateringcan__trunk"
        :style="{ '--stroke': -0.4 * wateringcanItems.length + 3.4 + 'px' }"
      />
      <div class="an-flower__wateringcan__wrapper">
        <div class="an-flower__wateringcan__innerbox">
          <ul class="an-flower__wateringcan__list">
            <li
              v-for="(wateringcanItem, index) in wateringcanItems"
              :key="index"
              v-html="wateringcanItem.solution"
            ></li>
          </ul>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script>
import visJson from '@/data/visualisation.json';
import visualisation from '@/mixins/visualisation.js';
// import IconWateringcan from '@/assets/icons/wateringcan.svg?inline';
export default {
  name: 'AnFlower',
  // components: { IconWateringcan },
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
    getClass: (type, index) => ({
      one: type === 'stimmt_nicht',
      two: type === 'stimmt_teilweise',
      three: type === 'stimmt',
      reverse: index > 2
    })
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
  grid-template-rows: 1fr;
  grid-template-areas: 'an-High an-Medium an-Low';
  gap: 0px 20px;
}

.an-High {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 0.5fr 1fr 1fr;
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
}

.an-Boxes {
  grid-area: an-Boxes;
}

.an-Medium {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 0.5fr 1fr 1fr;
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
}

.an-Boxes2 {
  grid-area: an-Boxes2;
}

.an-Low {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 0.5fr 1fr 1fr;
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

/**
  OLD STUFF
 */
$background: #fff;
$pill: $color-theme-lightgrey;
$red: $color-theme-red;
$blue: $color-theme-lightblue;
$size: 240px;
$centerSize: 64px;
$centerSizeHalf: $centerSize / 2;

.an-flower {
  color-adjust: exact;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &__flower {
    height: ($size * 2) - $centerSize;
    width: ($size * 2) - $centerSize;
    position: relative;
  }

  &__flower::after {
    content: '';
    height: $centerSize;
    width: $centerSize;
    background: white;
    border-radius: 50%;
    position: absolute;
    top: $size - $centerSizeHalf;
    left: $size - $centerSizeHalf;
    transform: translate(-50%, -50%);
    z-index: 3;
  }

  &__overlay {
    content: '';
    height: $centerSize / 4 * 3;
    width: $centerSize / 8 * 7;
    position: absolute;

    &.one {
      background-color: $red;
      background-image: linear-gradient(
        90deg,
        transparent 50%,
        rgba(255, 255, 255, 0.35) 50%
      );
      background-size: 10px 10px;
      background-position-x: 4px; // braucht man nur, wenn background-image gedreht ist
    }

    &.two,
    &.three {
      background-color: $blue;
    }

    z-index: 1;
    top: $size - $centerSize;
    left: $size - $centerSize;
    transform-origin: $centerSizeHalf $centerSizeHalf;
    transform: rotate(-60deg) translateX($centerSizeHalf);
    border-top: 6px solid;
    border-color: $background;
  }

  &__overlay_line {
    height: $centerSize / 4;
    position: absolute;
    width: $centerSize / 8 * 5;
    border-top: 6px solid;
    border-color: $background;

    &.one {
      background-color: $red;
      background-image: linear-gradient(
        90deg,
        transparent 50%,
        rgba(255, 255, 255, 0.35) 50%
      );
      background-size: 10px 10px;
      background-position-x: 4px; // braucht man nur, wenn background-image gedreht ist
    }

    &.two,
    &.three {
      background-color: $blue;
    }

    transform-origin: $centerSizeHalf $centerSizeHalf;
    transform: translateX($centerSizeHalf);
    z-index: 2;
    top: $size - $centerSize;
    left: $size - $centerSize;
  }

  &__pillwrapper {
    width: $size;
    height: $centerSize;
    position: absolute;
    background: $pill;
    border-radius: $centerSizeHalf;
    top: $size - $centerSize;
    left: $size - $centerSize;
    transform-origin: $centerSizeHalf $centerSizeHalf;
  }

  &__pillwrapper.reverse {
    transform-origin: calc(100% - #{$centerSizeHalf}) $centerSizeHalf;
    left: 0;
  }

  &__pillwrapper:nth-child(1) {
    transform: rotate(-60deg);
  }
  &__pillwrapper:nth-child(3) {
    transform: rotate(60deg);
  }
  &__pillwrapper:nth-child(4) {
    transform: rotate(-60deg);
  }
  &__pillwrapper:nth-child(6) {
    transform: rotate(60deg);
  }

  &__pillwrapper.reverse &__pill {
    right: 0;
  }

  &__pill {
    border: 6px solid $background;
    height: 100%;
    border-radius: $centerSizeHalf;
    position: absolute;
  }

  &__pill:nth-child(1) {
    width: 100%;
  }

  &__pill:nth-child(2) {
    width: 75%;
  }

  &__pill:nth-child(3) {
    width: 50%;
  }

  &__text {
    position: absolute;
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    padding-left: $centerSize * 1.2;
    align-items: center;
    text-align: center;
  }

  &__pillwrapper.reverse &__text {
    padding-left: 0;
    padding-right: $centerSize * 1.2;
  }

  &__pillwrapper.one &__pill:nth-child(3) {
    background: $red;
    background-image: linear-gradient(
      90deg,
      transparent 50%,
      rgba(255, 255, 255, 0.35) 50%
    );
    background-size: 10px 10px;
  }

  &__pillwrapper.two &__pill:nth-child(2) {
    background: $blue;
  }

  &__pillwrapper.three &__pill:nth-child(1) {
    background: $blue;
  }

  &__wateringcan {
    position: relative;
    margin-right: 50px;

    &-heading {
      position: absolute;
      top: -80px;
    }

    &__innerbox {
      background-color: white;
      border-radius: 5px;
    }
    &__list {
      list-style-type: none;
      border-radius: 5px;
      background-color: $blue;

      li {
        background-color: $blue;
        height: 50px;
        display: flex;
        align-items: center;
        text-align: center;
        padding: 7px;
        border-bottom: 4px solid #636261;
      }

      li:last-child {
        border-bottom: 0;
        border-radius: 5px;
      }
      &::before {
        content: '';
        display: flex;
        background-color: white;
        height: 52px;
        border-radius: 5px 5px 0% 0%;
        background-image: url('~@/assets/icons/welle.svg');
        background-position-y: 43px;
        background-repeat: repeat-x;
      }
    }

    &__circle {
      width: 100px;
      height: 100px;
      position: absolute;
      background: transparent;
      right: -50px;
      top: -50px;
      border-radius: 50px;
      border: 5px solid #636261;
      z-index: -1;
    }

    &__trunk {
      position: absolute;
      z-index: -1;
      top: 0;
      right: calc(100% - var(--stroke) - 10px);
      stroke-width: var(--stroke);
      stroke: #636261;
      height: 100%;
      width: 100px;
    }
    &__wrapper {
      width: 178px;
      background-color: #636261;
      border-radius: 10px;
      padding: 5px;
    }
  }
}
</style>
