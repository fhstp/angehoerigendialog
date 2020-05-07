<template>
  <div class="an-resources-can">
    <div class="an-resources-can__wrapper">
      <WateringCan>
        <foreignObject
          x="40"
          y="40"
          width="100%"
          height="100%"
          required-extensions="http://www.w3.org/2000/svg"
        >
          <div
            v-for="(resource, i) in resources"
            :key="i"
            class="an-resources-can__list"
          >
            {{ resource }}
          </div>
        </foreignObject>
      </WateringCan>
    </div>
  </div>
</template>

<script>
import visualisation from '@/mixins/visualisation.js';
import WateringCan from '@/assets/icons/wateringcan.svg?inline';

export default {
  name: 'AnResourcesCan',
  components: { WateringCan },
  mixins: [visualisation],
  computed: {
    resources() {
      const resources = this.$store.getters.getFieldValue(
        'ressourcen_belastungen-kraftausdauer'
      );
      this.$emit('update:available', resources?.length > 0);
      return resources;
    }
  }
};
</script>
<style lang="scss" scoped>
.an-resources-can {
  &__list {
    background-color: greenyellow;
    border: 1px solid black;
    margin-bottom: $spacer / 2;
    width: 40%;
    text-align: center;
  }
}
</style>
