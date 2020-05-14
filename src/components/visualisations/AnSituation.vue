<template>
  <div class="an-situation">
    <div
      v-for="(situation, i) in situations"
      :key="i"
      :class="[
        'an-situation__category',
        { 'an-situation__category--danger': situation.value < 4 }
      ]"
    >
      <IconMoodBad class="an-situation__legend" />
      <div
        class="an-situation__data-area"
        :style="{ '--value': situation.value / 9 - 1 / 9 }"
      >
        <component
          :is="situation.value < 4 ? 'IconPersonArmUp' : 'IconPersonStanding'"
          class="an-situation__me"
        />
        <div class="an-situation__progressbar" />
      </div>
      <IconMood class="an-situation__legend" />
      <h3 class="an-situation__heading">
        <IconWarning
          v-if="situation.value < 4"
          class="icon-warning"
          aria-hidden="true"
        />
        <span>{{ situation.title }}</span>
        <IconWarning
          v-if="situation.value < 4"
          class="icon-warning"
          aria-hidden="true"
        />
      </h3>
    </div>
  </div>
</template>

<script>
import IconMood from '@/assets/icons/mood.svg?inline';
import IconMoodBad from '@/assets/icons/mood_bad.svg?inline';
import IconPersonArmUp from '@/assets/icons/person-arm-up.svg?inline';
import IconPersonStanding from '@/assets/icons/person-standing.svg?inline';
import IconWarning from '@/assets/icons/warning.svg?inline';

const fields = {
  'gesundheit-gesundheitszustand': {
    title: 'Gesundheitszustand'
  },
  'gesundheit-nervlichebelastung': {
    title: 'nervliche Belastung'
  },
  'gesundheit-energiereserven': {
    title: 'Energiereserven'
  }
};

export default {
  name: 'AnSituation',
  components: {
    IconMood,
    IconMoodBad,
    IconPersonArmUp,
    IconPersonStanding,
    IconWarning
  },
  computed: {
    situations() {
      const situations = [];
      for (const key in fields) {
        const value = this.$store.getters.getFieldValue(key);
        if (value) {
          situations.push({
            title: fields[key].title,
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
$progressbar-border-width: 0.2rem;

.an-situation {
  &__category {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-end;
    margin-top: $spacer * 10;
  }

  &__heading {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: $progressbar-border-width;
    width: 100%;
  }

  .icon-warning {
    height: 1.5em;
    width: 1.5em;
    fill: red;

    &:first-child {
      margin-right: $spacer;
    }

    &:last-child {
      margin-left: $spacer;
    }
  }

  &__data-area {
    position: relative;
    flex-grow: 1;
    margin: 0 $spacer * 2;
    padding-top: $progressbar-border-width;
  }

  &__me {
    position: relative;
    top: -$progressbar-border-width;
    left: calc(100% * var(--value));
    padding-top: 0.25rem;
    height: 4rem;
    transform: translateX(-50%);

    .an-situation__category--danger & {
      padding-top: 0;
      fill: red;
    }
  }

  &__progressbar {
    height: 2rem;
    border: $progressbar-border-width solid #333;
    border-radius: 1000px;
    margin: 0 -$progressbar-border-width;
  }

  &__legend {
    margin-bottom: -$progressbar-border-width;
    width: 2rem;
  }
}
</style>
