<template>
  <div class="an-flower">
    <div class="flower">
      <div
        v-for="(answer, index) in answers"
        :key="index"
        class="pillwrapper"
        :class="getClass(answer.type, index)"
      >
        <div v-for="pillIndex in 3" :key="pillIndex" class="pill"></div>
        <div class="text">{{ answer.text }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import visJson from '@/data/visualisation.json';
import visualisation from '@/mixins/visualisation.js';
export default {
  name: 'AnFlower',
  mixins: [visualisation],
  computed: {
    answers() {
      const data = visJson.visualisation.flower;

      data.forEach(object => {
        switch (this.$store.getters.getFieldValue(object.fieldID)) {
          case 'stimmt':
            object.type = 3;
            break;
          case 'stimmt_teilweise':
            object.type = 2;
            break;
          case 'stimmt_nicht':
            object.type = 1;
            break;
          default:
            object.type = 0;
            break;
        }
      });

      let questionsAreAnswered = false;
      for (let i = 0; i < data.length; i++) {
        if (data[i].type !== 0) {
          questionsAreAnswered = true;
          break;
        }
      }
      this.$emit('update:available', questionsAreAnswered);
      return data;
    }
  },
  methods: {
    getClass: (type, index) => ({
      one: type === 1,
      two: type === 2,
      three: type === 3,
      reverse: index > 2
    })
  }
};
</script>

<style lang="scss" scoped>
$grey: #b7bdc4;
$background: #fff;
$pill: #e6e6e6;
$red: #dd848d;
$blue: #a3cfdf;
$size: 425px;

.an-flower {
  .flower {
    height: calc(#{$size} * 2);
    width: calc(#{$size} * 2);
    position: relative;
  }

  .flower::after {
    content: '';
    height: 120px;
    width: 120px;
    background: white;
    border-radius: 50%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .pillwrapper {
    width: $size;
    height: 100px;
    position: absolute;
    background: $pill;
    border-radius: 50px;
    top: calc(#{$size} - 50px);
    left: calc(#{$size} - 50px);
    transform-origin: 50px 50px;
  }

  .pillwrapper.reverse {
    transform-origin: calc(100% - 50px) 50px;
    left: 50px;
  }

  .pillwrapper:nth-child(1) {
    transform: rotate(-60deg);
  }
  .pillwrapper:nth-child(3) {
    transform: rotate(60deg);
  }
  .pillwrapper:nth-child(4) {
    transform: rotate(-60deg);
  }
  .pillwrapper:nth-child(6) {
    transform: rotate(60deg);
  }

  .pillwrapper.reverse .pill {
    right: 0;
  }

  .pill {
    border: 7px solid $background;
    height: 100%;
    border-radius: 50px;
    position: absolute;
  }

  .pill:nth-child(1) {
    width: 100%;
  }

  .pill:nth-child(2) {
    width: 75%;
  }

  .pill:nth-child(3) {
    width: 50%;
  }

  .text {
    position: absolute;
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    padding-left: 100px;
    align-items: center;
    font-size: 1.4rem;
    font-family: sans-serif;
  }

  .pillwrapper.reverse .text {
    padding-left: 0;
    padding-right: 100px;
  }

  .pillwrapper.one .pill:nth-child(3) {
    background: $red;
  }

  .pillwrapper.two .pill:nth-child(2) {
    background: $blue;
  }

  .pillwrapper.three .pill:nth-child(1) {
    background: $blue;
  }
}
</style>
