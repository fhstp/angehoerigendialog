<template>
  <div class="an-resources-pressure">
    <div class="an-resources-pressure__icon-wrapper">
      <AnBalloon class="an-resources-pressure__icon">
        <g class="an-resources-pressure__air">
          <g v-for="(resource, i) in resources" :key="i" class="ball">
            <foreignObject
              x="0"
              y="0"
              width="100%"
              height="100%"
              required-extensions="http://www.w3.org/2000/svg"
              class="an-resources-pressure__innercircle-wrapper"
            >
              <AnBalloonKugel
                class="an-resources-pressure__inncercircle"
                :text="resource"
              />
            </foreignObject>
          </g>
        </g>
      </AnBalloon>
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
import { hierarchy, pack } from 'd3-hierarchy';
import { select } from 'd3-selection';
import AnBalloon from './AnBalloon';
import AnBalloonKugel from './AnBalloonKugel';
import visualisation from '@/mixins/visualisation.js';

export default {
  name: 'AnResourcesPressure',
  components: { AnBalloon, AnBalloonKugel },
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
  },
  mounted() {
    this.$nextTick(() => {
      const packData = data =>
        pack().size([251, 251]).padding(10)(
          hierarchy({ children: data }).sum(d => 1 + Math.random() * 0.2)
        );

      const root = packData(this.resources);

      const group = select('.an-resources-pressure__air');

      const leaf = group
        .selectAll('g')
        .data(root.leaves())
        .attr('transform', d => `translate(${d.x + 1},${d.y + 1})`);

      leaf
        .select('foreignObject')
        .attr('height', d => d.r * 2)
        .attr('width', d => d.r * 2)
        .attr('x', d => -d.r)
        .attr('y', d => -d.r);
    });
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
