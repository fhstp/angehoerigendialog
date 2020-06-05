<template>
  <div class="an-care-tasks">
    <template v-for="(careTaskCategory, index) in careTasks">
      <div :key="index" class="an-care-tasks__category">
        <ul>
          <li
            v-for="(careTask, i) in careTaskCategory"
            :key="i"
            class="an-care-tasks__list"
          >
            {{ careTask.text }}
          </li>
        </ul>
        <div
          class="an-care-tasks__figure"
          :class="{ 'an-care-tasks__figure--self': index === 0 }"
        >
          <component
            :is="figure.type"
            v-for="(figure, figureIndex) in careSvg[index]"
            :key="figure.type + figureIndex"
            class="an-care-tasks__svg"
            :class="`an-care-tasks__svg--${figure.class} ${highestCategory}`"
          />
        </div>
      </div>
      <div :key="`${index}-label`" class="an-care-tasks__label">
        {{ careLabels[index] }}
      </div>
    </template>
  </div>
</template>

<script>
import visJson from '@/data/visualisation.json';
import visualisation from '@/mixins/visualisation.js';
import IconPersonArmsUp from '@/assets/icons/person-arms-up.svg?inline';
import IconPersonArmUp from '@/assets/icons/person-arm-up.svg?inline';

export default {
  name: 'AnCareTasks',
  components: { IconPersonArmsUp, IconPersonArmUp },
  mixins: [visualisation],
  data() {
    return {
      careLabels: Array,
      careSvg: Array
    };
  },
  computed: {
    careTasks() {
      const careTasksValues = [[], [], [], []];
      const careTasks = this.$store.getters.getFieldValue(
        'praktische_betreungsaufgaben-situationseinschaetzung'
      );

      const careTasksLabel = visJson.visualisation.caretasks;

      if (careTasks?.length > 0) {
        careTasks.forEach(item => {
          const careTaskObject = {
            type: this.$store.getters.getFieldValue(
              `praktische_betreungsaufgaben-situationseinschaetzung-${item}-details`
            ),
            text: careTasksLabel[item]
          };

          const categoryMap = {
            ich: 0,
            ichmeist: 1,
            teilen: 2,
            anderer: 3
          };
          if (Object.hasOwnProperty.call(categoryMap, careTaskObject.type)) {
            careTasksValues[categoryMap[careTaskObject.type]].push(
              careTaskObject
            );
          }
        });
        this.$emit(
          'update:available',
          careTasksValues[0]?.length > 0 ||
            careTasksValues[1]?.length > 0 ||
            careTasksValues[2]?.length > 0 ||
            careTasksValues[3]?.length > 0
        );
        return careTasksValues;
      }
      return '';
    },
    highestCategory() {
      const noPerson = this.careTasks.some(item => item.length > 9);
      if (noPerson) return 'an-care-tasks__svg--noPerson';
      const halfPerson = this.careTasks.some(item => item.length > 7);
      if (halfPerson) return 'an-care-tasks__svg--halfPerson';

      return false;
    }
  },
  created() {
    this.careSvg = [
      [{ type: 'IconPersonArmsUp', class: 'filled' }],
      [
        { type: 'IconPersonArmsUp', class: 'filled' },
        { type: 'IconPersonArmUp', class: 'empty' }
      ],
      [
        { type: 'IconPersonArmsUp', class: 'filled' },
        { type: 'IconPersonArmsUp', class: 'empty' }
      ],
      [{ type: 'IconPersonArmsUp', class: 'empty' }]
    ];
    this.careLabels = [
      'Ich leiste die gesamte Unterstützung',
      'Jemand anderes unterstützt mich fallweise',
      'Ich teile mir die Unterstützung mit jemand anderem',
      'Jemand anderes leistet die Unterstützung'
    ];
  }
};
</script>

<style lang="scss" scoped>
.an-care-tasks {
  color-adjust: exact;
  display: grid;
  grid-template-columns: 25% 25% 25% 25%;
  grid-template-rows: auto auto;
  grid-auto-flow: column;

  @media screen and (max-width: 800px) {
    grid-template-columns: 50% 50%;
    grid-template-rows: auto auto auto auto;
  }

  &__category {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 10px;
    padding-bottom: 0;
  }

  &__figure {
    padding: 0 10px;
    display: flex;
    justify-content: space-evenly;
    position: relative;
    margin-bottom: 5px;

    &::after {
      content: '';
      position: absolute;
      height: 5px;
      background: $color-theme-darkgrey;
      width: calc(100% + 20px);
      left: -10px;
      bottom: -5px;
      z-index: -1;
    }

    @mixin first-of-line() {
      border-top-left-radius: 5px;
      border-bottom-left-radius: 5px;
    }

    @mixin last-of-line() {
      border-top-right-radius: 5px;
      border-bottom-right-radius: 5px;
    }

    .an-care-tasks__category:nth-child(1) &::after {
      @include first-of-line();
    }

    .an-care-tasks__category:nth-child(7) &::after {
      @include last-of-line();
    }

    @media screen and (max-width: 800px) {
      .an-care-tasks__category:nth-child(3) &::after {
        @include first-of-line();
      }
      .an-care-tasks__category:nth-child(5) &::after {
        @include last-of-line();
      }
    }
  }

  &__svg {
    width: 40%;

    @media print {
      &--halfPerson {
        width: 20%;
      }

      &--noPerson {
        width: 0%;
      }
    }

    &--filled {
      fill: $color-theme-darkgrey;
      stroke: $color-theme-darkgrey;
    }

    &--empty {
      fill: white;
      stroke: $color-theme-darkgrey;
    }
  }

  &__list {
    list-style: none;
    border: 5px solid $color-theme-blue;
    padding: 5px;
    text-align: center;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: $border-radius;
    margin-bottom: -5px;
    background-color: white;

    font-size: 0.7rem;

    &:nth-child(2n) {
      margin-left: -6px;
      margin-right: 6px;
    }
    &:nth-child(2n - 1) {
      margin-left: 8px;
      margin-right: -8px;
    }
  }

  &__label {
    padding-top: $spacer;
    padding-right: $spacer;
    padding-left: $spacer;
    text-align: center;
    font-size: 0.7rem;
  }
}
</style>
