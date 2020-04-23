<template>
  <div class="an-situation row">
    <div class="col-md-3">
      <IconMood class="an-situation__icon" />
      <ul>
        <li v-for="(item, i) in aspectsPositive" :key="i">{{ item }}</li>
      </ul>
    </div>
    <div class="col-md-3">
      <IconMoodBad class="an-situation__icon" />
      <ul>
        <li v-for="(item, i) in aspectsNegative" :key="i">{{ item }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import IconMood from '@/assets/icons/mood.svg';
import IconMoodBad from '@/assets/icons/mood_bad.svg';

export default {
  name: 'AnSituation',
  components: { IconMood, IconMoodBad },
  computed: {
    aspectsPositive() {
      return [];
    },
    aspectsNegative() {
      return [];
    }
  }
};
</script>

<style lang="scss" scoped>
.an-situation {
  &__icon {
    display: block;
    width: 100%;
    max-width: 200px;
    margin: 0 auto;
  }
}
</style>
