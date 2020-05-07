<template>
  <div class="an-pressure">
    <div class="an-pressure__icon">
      <div class="an-pressure__list">
        <ul>
          <li v-for="(pressureItem, i) in pressure" :key="i">
            {{ pressureItem }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import visualisation from '@/mixins/visualisation.js';

export default {
  name: 'AnPressure',
  mixins: [visualisation],
  computed: {
    pressure() {
      const pressure = this.$store.getters.getFieldValue(
        'ressourcen_belastungen-belastend'
      );
      this.$emit('update:available', pressure?.length > 0);
      return pressure;
    }
  }
};
</script>
<style lang="scss" scoped>
.an-pressure {
  &__list {
    background-color: greenyellow;
  }
  &__icon {
    background-image: url('../../assets/icons/wateringcan.svg');
    background-repeat: no-repeat;
    height: 80vh;
  }
}
</style>
