<template>
  <div class="an-behaviour">
    <div>
      <ul>
        <li
          v-for="(behaviour, i) in behaviourChanges"
          :key="i"
          class="an-behaviour__list"
        >
          <div class="an-behaviour__text">
            <IconWarning
              v-if="behaviour.value === 3"
              class="icon-warning"
              aria-hidden="true"
            />
            <span>{{ behaviour.text }}</span>
          </div>
          <div class="an-behaviour__lollipop">
            <div class="an-behaviour__progressbar"></div>
            <div class="an-behaviour__progressicon">{{ behaviour.icon }}</div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import visJson from '@/data/visualisation.json';
import visualisation from '@/mixins/visualisation.js';
import IconWarning from '@/assets/icons/warning.svg?inline';

export default {
  name: 'AnBehaviour',
  components: { IconWarning },
  mixins: [visualisation],
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

      const typeIcon = {
        sehr_gut: '😄',
        gut: '🙂',
        mittelmäßig: '😐',
        schlecht: '😫'
      };

      if (behaviour?.length > 0) {
        behaviour.forEach(item => {
          const type = this.$store.getters.getFieldValue(
            `verhaltensveraenderungen-veraenderungen-${item}-details`
          );
          behaviourValues.push({
            value: typeValue[type],
            icon: typeIcon[type],
            text: behaviourLabel[item]
          });
        });
        this.$emit('update:available', true);
      }

      console.log(behaviourValues);

      return behaviourValues;
    }
  }
};
</script>

<style lang="scss" scoped>
.an-behaviour {
  li {
    display: flex;
  }

  &__text {
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }

  .icon-warning {
    height: 1.5em;
    width: 1.5em;
    fill: red;
  }

  &__lollipop {
    width: 50%;
    position: relative;
  }

  &__progressbar {
    height: 2rem;
    border: 0.2rem solid #3566aa;
  }

  &__progressicon {
    position: absolute;
  }
}
</style>
