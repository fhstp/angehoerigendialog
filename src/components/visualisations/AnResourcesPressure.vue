<template>
  <div class="an-resources-pressure">
    <AnBalloon
      :show-ropes="pressure && pressure.length > 0"
      class="an-resources__icon"
    >
      <g class="an-resources__air">
        <foreignObject
          v-for="(resource, i) in resources"
          :key="i"
          x="0"
          y="0"
          width="100%"
          height="100%"
          required-extensions="http://www.w3.org/2000/svg"
        >
          <AnBalloonCircle :text="resource" />
        </foreignObject>
      </g>
    </AnBalloon>
    <template v-if="pressure && pressure.length > 0">
      <div class="an-pressure__ropes"></div>
      <ul class="an-pressure">
        <li
          v-for="(pressureItem, i) in pressure"
          :key="i"
          class="an-pressure__item"
        >
          {{ pressureItem }}
        </li>
      </ul>
    </template>
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
        pack().size([153.8, 153.8]).padding(10)(
          hierarchy({ children: data }).sum(d => 1 + Math.random() * 0.2)
        );

      const root = packData(this.resources);

      const group = select('.an-resources__air');

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
$ringsize: 40px;
$bordersize: 3px;

.an-resources-pressure {
  color-adjust: exact;

  width: 100%;
  max-width: 350px;
}

.an-pressure {
  margin-left: auto;
  margin-right: auto;
  width: max-content;
  max-width: 25ch;
  min-width: 90px;
  position: relative;
  text-align: center;
  list-style: none;
  color: white;
  font-size: 0.9rem;

  &__ropes {
    margin: 0 auto;
    height: 40px;
    position: relative;

    &::before,
    &::after {
      content: '';
      height: 100%;
      width: $bordersize;
      background: $color-theme-darkred;
      position: absolute;
      bottom: $ringsize / 2;
      left: 50%;
      margin-left: $bordersize / -2;
      z-index: -1;
      transform-origin: bottom center;
    }

    &::before {
      transform: translateX(-8px) rotate(-10deg);
    }
    &::after {
      transform: translateX(8px) rotate(10deg);
    }
  }

  &::before {
    content: '';
    width: $ringsize;
    height: $ringsize;
    border: $bordersize * 4 solid $color-theme-darkred;
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
    border: $bordersize * 2 solid $color-theme-red;
    border-radius: 50%;
    background-color: transparent;
    position: absolute;
    top: -($ringsize - $bordersize * 4);
    margin-left: -($ringsize / 2 - $bordersize);
    z-index: 0;
  }
  &__item {
    background: $color-theme-red;
    padding: $spacer / 2;
    border-bottom: $bordersize solid $color-theme-darkred;
    border-left: $bordersize solid $color-theme-darkred;
    border-right: $bordersize solid $color-theme-darkred;

    &:first-child {
      border-top: $bordersize solid $color-theme-darkred;
    }
  }
}
</style>
