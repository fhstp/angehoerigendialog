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
import { select } from 'd3-selection';
import { range } from 'd3-array';
import {
  forceSimulation,
  forceCenter,
  forceCollide,
  forceManyBody
} from 'd3-force';
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

    this.$nextTick(this.packCircles);
  },
  methods: {
    packCircles() {
      const minCircleSpace = 10;

      const width = 153.8;
      const height = 153.8;

      const numNodes = this.resources.length;

      const radius = 50.45 * numNodes ** -0.4;
      const nodes = range(numNodes).map(function (d) {
        return { radius };
      });

      const simulation = forceSimulation(nodes)
        .force('charge', forceManyBody().strength(200))
        .force('center', forceCenter(width / 2, height / 2))
        .force('collision', forceCollide().radius(radius))
        .stop();

      for (let i = 0; i < 500; i++) {
        simulation.tick();
      }

      select('.an-resources__air')
        .selectAll('foreignObject')
        .data(nodes)
        .attr('transform', d => {
          const dx = (d.x = Math.max(radius, Math.min(width - radius, d.x)));
          const dy = (d.y = Math.max(radius, Math.min(height - radius, d.y)));

          const x = dx - radius + minCircleSpace / 2;
          const y = dy - radius + minCircleSpace / 2;

          return `translate(${x},${y})`;
        })
        .attr('height', d => radius * 2 - minCircleSpace)
        .attr('width', d => radius * 2 - minCircleSpace);
    }
  }
};
</script>

<style lang="scss" scoped>
$ringsize: 40px;
$bordersize: 3px;

.an-resources-pressure {
  color-adjust: exact;

  width: 100%;
  max-width: 400px;
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

      @media print {
        bottom: $ringsize / 4;
      }
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
