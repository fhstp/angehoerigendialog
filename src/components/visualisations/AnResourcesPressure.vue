<template>
  <div class="an-resources-pressure">
    <div class="an-resources-pressure__icon-wrapper">
      <AnBalloon
        :show-ropes="pressure && pressure.length > 0"
        class="an-resources-pressure__icon"
      >
        <g class="an-resources-pressure__air">
          <foreignObject
            v-for="(resource, i) in resources"
            :key="i"
            x="0"
            y="0"
            width="100%"
            height="100%"
            required-extensions="http://www.w3.org/2000/svg"
            class="an-resources-pressure__innercircle-wrapper"
          >
            <AnBalloonCircle
              class="an-resources-pressure__inncercircle"
              :text="resource"
            />
          </foreignObject>
        </g>
      </AnBalloon>
    </div>
    <div v-if="pressure" class="an-resources-pressure__weight-wrapper">
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
import AnBalloonCircle from './AnBalloonCircle';
import visualisation from '@/mixins/visualisation.js';

export default {
  name: 'AnResourcesPressure',
  components: { AnBalloon, AnBalloonCircle },
  mixins: [visualisation],
  computed: {
    resources() {
      const resources = this.$store.getters.getFieldValue(
        'ressourcen_belastungen-kraftausdauer'
      );
      return resources;
    },
    pressure() {
      const pressure = this.$store.getters.getFieldValue(
        'ressourcen_belastungen-belastend'
      );
      return pressure;
    }
  },
  mounted() {
    this.$emit(
      'update:available',
      this.resources?.length > 0 || this.pressure?.length > 0
    );

    this.$nextTick(() => {
      const packData = data =>
        pack().size([251, 251]).padding(10)(
          hierarchy({ children: data }).sum(d => 1 + Math.random() * 0.2)
        );

      const root = packData(this.resources);

      const group = select('.an-resources-pressure__air');

      group
        .selectAll('foreignObject')
        .data(root.leaves())
        .attr('transform', d => `translate(${d.x + 1},${d.y + 1})`)
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

  &__weight {
    $bgcolor: #975824;
    $fgcolor: #bd753a;
    $ringsize: 60px;
    $bordersize: 4px;

    &-wrapper {
      background-color: $bgcolor;
      padding: $bordersize;
      text-align: center;
      width: max-content;
      max-width: 100%;
      min-width: 150px;
      margin-left: auto;
      margin-right: auto;
      position: relative;

      &::before {
        content: '';
        width: $ringsize;
        height: $ringsize;
        border: $bordersize * 4 solid $bgcolor;
        border-radius: 50%;
        background-color: transparent;
        position: absolute;
        top: -($ringsize - $bordersize * 3);
        z-index: -2;
        margin-left: -($ringsize / 2);
      }

      &::after {
        content: '';
        width: $ringsize - $bordersize * 2;
        height: $ringsize - $bordersize * 2;
        border: $bordersize * 2 solid $fgcolor;
        border-radius: 50%;
        background-color: transparent;
        position: absolute;
        top: -($ringsize - $bordersize * 4);
        margin-left: -($ringsize / 2 - $bordersize);
        z-index: 0;
      }
    }
    &-list {
      background: $fgcolor;
      margin-bottom: $bordersize;
      padding: $bordersize;

      &:last-child {
        margin: 0;
      }
    }
  }
}
</style>
