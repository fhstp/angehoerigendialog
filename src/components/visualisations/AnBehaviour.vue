<template>
  <div class="an-behaviour">
    <div
      class="an-behaviour__label"
      :style="{ '--labelwidth': 100 / labels.length + '%' }"
    >
      <div
        v-for="(label, i) in labels"
        :key="i"
        class="an-behaviour__label-element"
        :style="{
          '--value': -100 + (100 / maxValue) * i + '%'
        }"
      >
        <span>{{ label }}</span>
      </div>
    </div>
    <ul class="an-behaviour__list">
      <li
        v-for="(behaviour, i) in behaviourChanges"
        :key="i"
        class="an-behaviour__list-element"
      >
        <div class="an-behaviour__text">
          <IconWarning
            v-if="behaviour.value === maxValue"
            class="icon-warning"
            aria-hidden="true"
          />
          <span>{{ behaviour.text }}</span>
        </div>
        <div class="an-behaviour__lollipop">
          <div
            class="an-behaviour__progressbar-wrapper"
            :style="{
              '--value': (100 / maxValue) * behaviour.value + '%',
              '--width': (100 * maxValue) / (maxValue + 1) + '%'
            }"
          >
            <div
              class="an-behaviour__progressbar"
              :class="{
                'an-behaviour__progressbar--max': behaviour.value === maxValue
              }"
            ></div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import visJson from '@/data/visualisation.json';
import visualisation from '@/mixins/visualisation.js';
import IconWarning from '@/assets/icons/warning.svg?inline';

export default {
  name: 'AnBehaviour',
  components: { IconWarning },
  mixins: [visualisation],
  computed: {
    behaviourChanges() {
      const behaviour = this.$store.getters.getFieldValue(
        'verhaltensveraenderungen-veraenderungen'
      );
      const behaviourLabel = visJson.visualisation.behaviour;
      const behaviourValues = [];

      const typeValue = {
        sehr_gut: 0,
        gut: 1,
        mittelmäßig: 2,
        schlecht: 3
      };

      if (behaviour?.length > 0) {
        behaviour.forEach(item => {
          const type = this.$store.getters.getFieldValue(
            `verhaltensveraenderungen-veraenderungen-${item}-details`
          );
          behaviourValues.push({
            value: typeValue[type],
            text: behaviourLabel[item]
          });
        });
        this.$emit('update:available', true);
      }

      console.log(behaviourValues);

      return behaviourValues;
    },
    maxValue() {
      return this.labels.length - 1;
    },
    labels() {
      return ['sehr gut', 'gut', 'mittelmäßig', 'schlecht'];
    }
  }
};
</script>

<style lang="scss" scoped>
$lightgrey: #cccccc;
$darkgrey: #666666;
$red: #660000;
$lollipopPercentage: 60%;

.an-behaviour {
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  &__list {
    width: 100%;
  }

  &__list-element {
    display: flex;
    margin-bottom: 1rem;
    align-items: center;
  }

  &__text {
    width: 100% - $lollipopPercentage;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-right: 2rem;
    text-align: right;
  }

  .icon-warning {
    height: 1.5rem;
    width: 1.5rem;
    fill: $red;
    margin-right: 1rem;
    flex-shrink: 0;
  }

  &__lollipop {
    width: $lollipopPercentage;
    position: relative;
    padding-right: 1rem;
  }

  &__progressbar-wrapper {
    height: 1rem;
    background: $lightgrey;
    border-radius: 0.3rem / 50%;
    padding: 0 0.2rem;
    padding-top: 0.3rem;
    position: relative;
    width: 100%;
  }

  &__progressbar {
    height: 0.4rem;
    color: $darkgrey;
    background: currentColor;
    width: var(--value);

    &--max {
      color: $red;
    }

    &::after {
      content: '';
      border: 0.5rem solid currentColor;
      border-radius: 50%;
      height: 1.8rem;
      width: 1.8rem;
      background: $lightgrey;
      display: block;
      position: absolute;
      transform: translate(-50%, -50%);
      left: var(--value);
      top: 50%;
    }
  }

  &__label {
    width: $lollipopPercentage;
    height: 5rem;
    display: flex;
    padding-right: 1rem;

    &-element {
      position: relative;
      width: var(--labelwidth);
      transform: translateX(var(--value));

      &::after {
        content: '';
        height: 1rem;
        width: 0.15rem;
        background: $lightgrey;
        display: block;
        position: absolute;
        bottom: 0.6rem;
        right: 0;
        transform: translateX(50%);
      }

      span {
        bottom: 1.9rem;
        transform-origin: bottom right;
        transform: rotate(20deg);
        position: absolute;
        right: 0;
      }
    }
  }
}
</style>
