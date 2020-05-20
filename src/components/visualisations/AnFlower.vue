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
        <div class="text" v-html="answer.text"></div>
      </div>
    </div>
    <div v-if="ewerItems.length" class="ewer">
      <div class="ewer__circle"></div>
      <IconEwer class="ewer__trunk" />
      <div class="ewer__wrapper">
        <div class="ewer__innerbox">
          <ul class="ewer__list">
            <li v-for="(ewerItem, index) in ewerItems" :key="index">
              <div v-html="ewerItem.ewer"></div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import visJson from '@/data/visualisation.json';
import visualisation from '@/mixins/visualisation.js';
import IconEwer from '@/assets/icons/ewer.svg?inline';
export default {
  name: 'AnFlower',
  components: { IconEwer },
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
    ewerItems() {
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
$grey: #b7bdc4;
$background: #fff;
$pill: #e6e6e6;
$red: #dd848d;
$blue: #a3cfdf;
$size: 290px;
$centerSize: 80px;
$centerSizeHalf: $centerSize / 2;
//425px
.an-flower {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .flower {
    height: ($size * 2) - $centerSize;
    width: ($size * 2) - $centerSize;
    position: relative;
  }

  .flower::after {
    content: '';
    height: $centerSize;
    width: $centerSize;
    background: white;
    border-radius: 50%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .pillwrapper {
    width: $size;
    height: $centerSize;
    position: absolute;
    background: $pill;
    border-radius: $centerSizeHalf;
    top: $size - $centerSize;
    left: $size - $centerSize;
    transform-origin: $centerSizeHalf $centerSizeHalf;
  }

  .pillwrapper.reverse {
    transform-origin: calc(100% - #{$centerSizeHalf}) $centerSizeHalf;
    left: 0;
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
    border: 6px solid $background;
    height: 100%;
    border-radius: $centerSizeHalf;
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
    padding-left: $centerSize;
    align-items: center;
    font-size: 19px;
    text-align: center;
  }

  .pillwrapper.reverse .text {
    padding-left: 0;
    padding-right: $centerSize;
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

  .ewer {
    position: relative;
    font-size: 17px;
    &__innerbox {
      background-color: white;
      border-radius: 5px;
    }
    &__list {
      list-style-type: none;
      border-radius: 5px;
      background-color: #4aa1c0;

      li {
        background-color: #4aa1c0;
        height: 60px;
        display: flex;
        justify-content: center;
        align-items: center;
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
        height: 50px;
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
      left: -132px;
      width: 80%;
      z-index: -1;
      top: 0;
    }
    &__wrapper {
      width: 178px;
      color: white;
      background-color: #636261;
      border-radius: 5px;
      padding: 5px;
    }
  }
}
</style>
