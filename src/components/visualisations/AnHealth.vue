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
  data() {
    return {
      labels: Array
    };
  },
  computed: {
    healthChanges() {
      const healthLabel = visJson.visualisation.health;
      const healthValues = [];

      const typeValue = {
        stimmt: 2,
        stimmt_teilweise: 1,
        stimmt_nicht: 0
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
    }
  },
  created() {
    this.labels = ['stimmt nicht', 'stimmt teilweise', 'stimmt'];
  }
};
</script>

<style lang="scss" scoped></style>
