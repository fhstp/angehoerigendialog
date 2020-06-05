<template>
  <div class="an-behaviour">
    <div class="an-behaviour__heading">
      So komme ich mit diesem Verhalten zurecht:
    </div>
    <AnLollipop :values="behaviourChanges" :labels="labels" />
  </div>
</template>

<script>
import visJson from '@/data/visualisation.json';
import visualisation from '@/mixins/visualisation.js';
import AnLollipop from '@/components/visualisations/AnLollipop.vue';

export default {
  name: 'AnBehaviour',
  components: { AnLollipop },
  mixins: [visualisation],
  data() {
    return {
      labels: Array
    };
  },
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
          if (type) {
            behaviourValues.push({
              value: typeValue[type],
              text: behaviourLabel[item]
            });
          }
        });
      }

      this.$emit('update:available', behaviourValues?.length > 0);
      return behaviourValues;
    }
  },
  created() {
    this.labels = ['sehr gut', 'gut', 'mittelmäßig', 'schlecht'];
  }
};
</script>

<style lang="scss" scoped>
.an-behaviour {
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  &__heading {
    font-size: 0.9rem;
    margin-bottom: 0.5rem;
    width: 45%;
    text-align: center;
  }
}
</style>
