<template>
  <div class="an-situation">
    <div
      v-for="(situation, i) in situations"
      :key="i"
      class="an-situation__category"
    >
      <h3 class="an-situation__heading">{{ situation.title }}</h3>
      <IconMoodBad class="an-situation__legend" />
      <div
        class="an-situation__data-area"
        :style="{ '--value': situation.value / 10 }"
      >
        <IconWaving class="an-situation__me" />
        <div class="an-situation__indicator" />
        <div class="an-situation__progressbar" />
      </div>
      <IconMood class="an-situation__legend" />
    </div>
  </div>
</template>

<script>
import IconWaving from '@/assets/icons/waving.svg?inline';
import IconMood from '@/assets/icons/mood.svg?inline';
import IconMoodBad from '@/assets/icons/mood_bad.svg?inline';

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
  components: { IconMood, IconMoodBad, IconWaving },
  computed: {
    situations() {
      const situations = [];
      for (const key in fields) {
        if (this.$store.getters.getFieldCompletion(key)) {
          situations.push({
            title: fields[key].title,
            value: this.$store.getters.getFieldValue(key)
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
.an-situation {
  $me-size: 75px;

  &__category {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-end;
    margin-top: $spacer * 10;
  }

  &__heading {
    width: 100%;
  }

  &__data-area {
    position: relative;
    flex-grow: 1;
    margin: 0 $spacer * 2;
  }

  &__indicator,
  &__me {
    position: relative;
    left: calc(100% * var(--value));
    transform: translateX(-50%);
  }

  &__me {
    width: $me-size;
  }

  &__indicator {
    width: 0;
    border-top: 15px solid #333;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
  }

  &__progressbar {
    height: 50px;
    border: 5px solid #333;
    border-radius: 10px;
    margin: 0 -5px;
    background: linear-gradient(to right, red, white 45% 55%, green);
  }

  &__legend {
    width: 50px;
  }
}
</style>
