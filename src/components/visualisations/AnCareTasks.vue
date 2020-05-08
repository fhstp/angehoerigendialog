<template>
  <div class="an-care-tasks">
    <div
      v-for="(careTaskCategory, index) in careTasks"
      :key="index"
      class="an-care-tasks__category"
    >
      <ul>
        <li
          v-for="(careTask, i) in careTaskCategory"
          :key="i"
          class="an-care-tasks__list"
        >
          <div>
            {{ careTask.text }}
          </div>
        </li>
      </ul>
      <div
        class="an-care-tasks__figure"
        :class="{ 'an-care-tasks__figure--self': index === 0 }"
      >
        <component
          :is="f.type"
          v-for="(f, fi) in careSvg[index]"
          :key="f.type + fi"
          :style="{ fill: f.fill }"
        />
      </div>
      <div class="an-care-tasks__label">{{ careLabels[index] }}</div>
    </div>
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
  computed: {
    careTasks() {
      const careTasksValues = [[], [], [], []];
      const careTasks = this.$store.getters.getFieldValue(
        'praktische_betreungsaufgaben-situationseinschaetzung'
      );
      this.$emit('update:available', careTasks?.length > 0);

      const careTasksLabel = visJson.visualisation.caretasks;

      careTasks.forEach(item => {
        const careTaskObject = {
          type: this.$store.getters.getFieldValue(
            `praktische_betreungsaufgaben-situationseinschaetzung-${item}-details`
          ),
          text: careTasksLabel[item]
        };

        switch (careTaskObject.type) {
          case 'ich':
            careTasksValues[0].push(careTaskObject);
            break;
          case 'teilen':
            careTasksValues[1].push(careTaskObject);
            break;
          case 'ichmeist':
            careTasksValues[2].push(careTaskObject);
            break;
          case 'anderer':
            careTasksValues[3].push(careTaskObject);
            break;
        }
      });
      return careTasksValues;
    },
    careSvg() {
      return [
        [{ type: 'IconPersonArmsUp', fill: '#374355' }],
        [
          { type: 'IconPersonArmsUp', fill: '#374355' },
          { type: 'IconPersonArmsUp', fill: '#ADB9C9' }
        ],
        [
          { type: 'IconPersonArmsUp', fill: '#374355' },
          { type: 'IconPersonArmUp', fill: '#ADB9C9' }
        ],
        [{ type: 'IconPersonArmsUp', fill: '#ADB9C9' }]
      ];
    },
    careLabels() {
      return [
        'Ich leiste die gesamte Unterstützung',
        'Ich teile mir die Unterstützungen mit jemandem zu in etwa gleichen Teilen',
        'Ich leiste den größten Teil der Untertützung, jemand anderes unterstützt mich fallweise',
        'Jemand anderes leistet die Unterstützung'
      ];
    }
  }
};
</script>

<style lang="scss" scoped>
.an-care-tasks {
  display: flex;
  word-break: break-word;
  flex-wrap: wrap;

  &__category {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 10px;
    padding-bottom: 0;
    width: 25%;

    @media (max-width: 800px) {
      width: 50%;
    }
  }

  &__figure {
    padding: 0 10px;
    display: flex;
    justify-content: space-evenly;
    position: relative;
    margin-bottom: 5px;

    svg {
      width: 40%;
    }

    &::after {
      content: '';
      position: absolute;
      height: 10px;
      background: #437bb9;
      border-radius: 5px;
      width: calc(100% + 50px);
      left: -25px;
      bottom: -5px;
      z-index: -1;
    }

    &--self::before {
      content: 'Das bin ich';
      height: 30px;
      width: 100px;
      position: absolute;
      left: 50%;
      top: 10px;
      transform: translateX(-110px);
      border-radius: 15px;
      border-bottom-right-radius: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      background: #ddd;
      border: 2px solid #ccc;
    }
  }

  &__list {
    list-style: none;
    border: 5px solid #8bafb1;
    padding: 10px;
    text-align: center;
    height: 90px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 3px;
    margin-bottom: -5px;

    &:nth-child(2n) {
      margin-left: -6px;
      margin-right: +6px;
    }
    &:nth-child(2n - 1) {
      margin-left: +8px;
      margin-right: -8px;
    }
  }

  &__label {
    min-height: 100px;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
