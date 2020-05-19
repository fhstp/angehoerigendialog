<template>
  <AnLollipop :values="healthChanges" :labels="labels" />
</template>

<script>
import visJson from '@/data/visualisation.json';
import visualisation from '@/mixins/visualisation.js';
import AnLollipop from '@/components/visualisations/AnLollipop.vue';

export default {
  name: 'AnHealth',
  components: { AnLollipop },
  mixins: [visualisation],
  computed: {
    healthChanges() {
      const healthLabel = visJson.visualisation.health;
      const healthValues = [];

      const typeValue = {
        stimmt: 0,
        stimmt_teilweise: 1,
        stimmt_nicht: 2
      };

      Object.keys(healthLabel).forEach(item => {
        const type = this.$store.getters.getFieldValue(`gesundheit-${item}`);
        if (type) {
          healthValues.push({
            value: typeValue[type],
            text: healthLabel[item]
          });
        }
      });

      this.$emit('update:available', healthValues?.length > 0);
      return healthValues;
    },
    labels() {
      return ['stimmt', 'stimmt teilweise', 'stimmt nicht'];
    }
  }
};
</script>

<style lang="scss" scoped></style>
