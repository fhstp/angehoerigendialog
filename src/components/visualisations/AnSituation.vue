<template>
  <div class="an-situation row">
    <div
      v-for="(situation, i) in situations"
      :key="i"
      :class="[
        'an-situation__category',
        {
          'an-situation__category--danger':
            ($store.state.printMode || visualisation_gotVisible) &&
            situation.value < 4
        },
        'col-6',
        'col-md-2'
      ]"
    >
      <h3 class="an-situation__heading">
        <IconWarning
          v-if="situation.value < 4"
          class="icon-warning"
          aria-hidden="true"
        />
        <span>{{ situation.title }}</span>
      </h3>
      <div
        class="an-situation__battery"
        :style="{
          '--value':
            $store.state.printMode || visualisation_gotVisible
              ? `-${situation.value * -10 + 100}%`
              : '0%'
        }"
        :aria-label="`${situation.value} von 10`"
      >
        <div class="an-situation__progressbar" />
        <div class="an-situation__battery-sections row flex-no-wrap">
          <div v-for="section in 10" :key="section" class="col-6" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import IconWarning from '@/assets/icons/warning.svg?inline';
import visualisationMixin from '@/mixins/visualisation.js';
import visualisationData from '@/data/visualisation.json';

const fields = visualisationData.visualisation.situation;

export default {
  name: 'AnSituation',
  components: {
    IconWarning
  },
  mixins: [visualisationMixin],
  computed: {
    situations() {
      const situations = [];
      for (const key in fields) {
        const value = this.$store.getters.getFieldValue(key);
        if (value) {
          situations.push({
            title: fields[key],
            value
          });
        }
      }
      this.$emit('update:available', situations.length > 0);
      return situations;
    }
  }
};
</script>

<style lang="scss" scoped>
$battery-border-width: 2px;
$battery-border-radius: 0.5rem;
$battery-height: 1.5rem;
$pin-width: 10px;
$pin-height: 60%;

.an-situation {
  @media print, #{map-get($query, 'md-and-up')} {
    display: flex;
    align-items: flex-end;
    margin: 0 auto;
  }

  width: 80%;

  &__category {
    &:not(:first-child) {
      @media #{map-get($query, 'sm-and-down')} {
        margin-top: $spacer * 2;
      }
    }
    @media print, #{map-get($query, 'md-and-up')} {
      padding-left: $spacer;
      padding-right: $spacer;
    }
  }

  &__heading {
    display: flex;
    align-items: center;
    font-size: 16px;
    font-weight: normal;
  }

  .icon-warning {
    height: 1.5em;
    width: 1.5em;
    fill: $color-theme-darkred;
  }

  &__battery {
    position: relative;
    border: $battery-border-width solid #333;
    border-radius: $battery-border-radius;
    background-color: $color-theme-lightgrey;
    width: calc(100% - #{$pin-width});

    &::after {
      content: '';
      position: absolute;
      top: (100% - $pin-height) / 2;
      left: 100%;
      border: $battery-border-width solid #333;
      border-left: none;
      border-radius: 0 $border-radius $border-radius 0;
      width: $pin-width;
      height: $pin-height;
    }
  }

  &__progressbar {
    position: relative;
    height: $battery-height;
    border: $battery-border-width solid white;
    border-radius: $battery-border-radius;
    overflow: hidden;

    &::after {
      content: '';
      position: absolute;
      background-color: $color-theme-blue;
      color-adjust: exact;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      transform: translateX(var(--value));
      transition: transform 400ms ease-out,
        background-color 400ms ease-in-out 200ms;

      .an-situation__category--danger & {
        background-color: $color-theme-darkred;
      }
    }
  }

  &__battery-sections {
    flex-wrap: nowrap;
    position: absolute;
    top: 0;
    border: 2px solid transparent;
    height: 100%;
    width: 100%;

    & > div {
      border-left: 1px solid transparent;
      border-right: 1px solid transparent;

      &:not(:first-child) {
        border-left-color: white;
      }

      &:not(:last-child) {
        border-right-color: white;
      }
    }
  }
}
</style>
