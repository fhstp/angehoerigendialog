<template>
  <div class="an-resources-pressure">
    <div class="an-resources-pressure__icon-wrapper">
      <Balloon class="an-resources-pressure__icon">
        <foreignObject
          x="0"
          y="0"
          width="100%"
          height="100%"
          required-extensions="http://www.w3.org/2000/svg"
          class="an-resources-pressure__innercircle-wrapper"
        >
          <div
            v-for="(resource, i) in resources"
            :key="i"
            class="an-resources-pressure__inncercircle"
          >
            {{ resource }}
          </div>
        </foreignObject>
      </Balloon>
    </div>
    <div class="an-resources-pressure__weight-wrapper">
      <div
        v-for="(pressureItem, i) in pressure"
        :key="i"
        class="an-resources-pressure__weight-list"
      >
        {{ pressureItem }}
      </div>
    </div>
  </div>
</template>

<script>
import visualisation from '@/mixins/visualisation.js';
import Balloon from '@/assets/icons/balloon.svg?inline';

export default {
  name: 'AnResourcesPressure',
  components: { Balloon },
  mixins: [visualisation],
  computed: {
    resources() {
      const resources = this.$store.getters.getFieldValue(
        'ressourcen_belastungen-kraftausdauer'
      );
      this.$emit('update:available', resources?.length > 0);
      return resources;
    },
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
.an-resources-pressure {
  margin-bottom: 20px;
  &__icon-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__icon {
    width: 100%;
    max-width: 400px;
    padding-bottom: $spacer * 2;
  }

  &__inncercircle {
    border: 2px solid #8bafb1;
    border-radius: 80%;
    text-align: center;
    height: 50px;
    width: 50px;
    font-size: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: -5px;
  }

  &__weight-wrapper {
    background-color: #bd753a;
    padding: 10px;
    text-align: center;
    width: 25%;
    margin-left: auto;
    margin-right: auto;
    margin-top: -20px;
  }
}
</style>
