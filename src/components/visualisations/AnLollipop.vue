<template>
  <div class="an-lollipop">
    <div
      class="an-lollipop__label"
      :style="{ '--labelwidth': 100 / labels.length + '%' }"
      aria-hidden="true"
    >
      <div
        v-for="(label, i) in labels"
        :key="i"
        class="an-lollipop__label-element"
        :style="{
          '--value': -100 + (100 / maxValue) * i + '%'
        }"
      >
        <span>{{ label }}</span>
      </div>
    </div>
    <ul class="an-lollipop__list">
      <li
        v-for="(item, i) in values"
        :key="i"
        class="an-lollipop__list-element"
      >
        <div class="an-lollipop__text">
          <IconWarning
            v-if="item.value === maxValue"
            class="icon-warning"
            aria-hidden="true"
          />
          <span>{{ item.text }}</span>
        </div>
        <div
          class="an-lollipop__lollipop"
          :aria-label="
            labels.length > item.value ? labels[item.value] : undefined
          "
        >
          <div
            class="an-lollipop__progressbar-wrapper"
            :style="{
              '--value': (100 / maxValue) * item.value + '%',
              '--width': (100 * maxValue) / (maxValue + 1) + '%'
            }"
          >
            <div class="an-lollipop__progressbar-ticks">
              <div
                v-for="t in labels.length"
                :key="t"
                class="an-lollipop__progressbar-ticks-element"
              ></div>
            </div>
            <div
              class="an-lollipop__progressbar"
              :class="{
                'an-lollipop__progressbar--max': item.value === maxValue
              }"
            ></div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import IconWarning from '@/assets/icons/warning.svg?inline';

export default {
  name: 'AnLollipop',
  components: { IconWarning },
  props: {
    values: { type: Array, required: true },
    labels: { type: Array, required: true }
  },
  computed: {
    maxValue() {
      return this.labels.length - 1;
    }
  }
};
</script>

<style lang="scss" scoped>
$lightgrey: $color-theme-lightgrey;
$red: $color-theme-darkred;
$blue: $color-theme-blue;
$lollipopPercentage: 45%;

.an-lollipop {
  color-adjust: exact;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: 100%;

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
    font-size: 0.75rem;
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
    padding-top: 0.25rem;
    position: relative;
    width: 100%;
  }

  &__progressbar-ticks {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;

    &-element {
      height: 100%;
      width: 2px;
      background-color: white;

      &:first-child,
      &:last-child {
        opacity: 0;
      }
    }
  }

  &__progressbar {
    height: 0.5rem;
    color: $blue;
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
    font-size: 0.8rem;

    &-element {
      position: relative;
      width: var(--labelwidth);
      transform: translateX(var(--value));

      &::after {
        content: '';
        height: 1rem;
        width: 2px;
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
