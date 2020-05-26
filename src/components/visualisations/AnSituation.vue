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
$battery-height: 1.5rem;
$pin-width: 10px;

.an-situation {
  @media print, #{map-get($query, 'md-and-up')} {
    display: flex;
    align-items: flex-end;
    margin-left: -$spacer;
    margin-right: -$spacer;
  }

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
  }

  .icon-warning {
    height: 1.5em;
    width: 1.5em;
    fill: $color-theme-darkred;
  }

  &__battery {
    position: relative;
    border: $battery-border-width solid #333;
    border-radius: 1000px;
    width: calc(100% - #{$pin-width});

    &::after {
      content: '';
      position: absolute;
      top: 20%;
      left: 100%;
      border: $battery-border-width solid #333;
      border-left: none;
      border-radius: 0 $border-radius $border-radius 0;
      margin-left: -1px;
      width: $pin-width + 1;
      height: 60%;
    }
  }

  &__progressbar {
    position: relative;
    height: 2rem;
    border: $battery-border-width solid white;
    border-radius: 1000px;
    overflow: hidden;

    &::after {
      content: '';
      position: absolute;
      background-color: $color-theme-darkgrey;
      color-adjust: exact;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      transform: translateX(var(--value));
      transition: transform 400ms ease-in-out,
        background-color 400ms ease-in-out 200ms;

      .an-situation__category--danger & {
        background-color: $color-theme-darkred;
      }
    }
  }
}
</style>
