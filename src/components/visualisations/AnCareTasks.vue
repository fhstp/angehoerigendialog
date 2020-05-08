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
          {{ careTask.text }}
        </li>
      </ul>
      <div class="an-care-tasks__figure">MÄNNCHEN</div>
    </div>
  </div>
</template>

<script>
import visJson from '@/data/visualisation.json';
import visualisation from '@/mixins/visualisation.js';

export default {
  name: 'AnCareTasks',
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
    }
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
.an-care-tasks {
  display: flex;
  width: 100%;

  &__category {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    border: 2px solid black;
    margin: 10px;
    padding: 10px;
    min-width: 20vw;
  }

  &__figure {
    margin-top: 10px;
    border: 1px solid blue;
  }

  &__list {
    list-style: none;
    border: 1px solid black;
    padding: 10px;
    text-align: center;
  }
}
</style>
