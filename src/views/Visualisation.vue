<template>
  <div class="an-visualisation">
    <div class="container">
      <AnSendMail />
      <h1>Auswertung</h1>
      <h2 v-show="isAvailable.resources">
        Meine Ressourcen
      </h2>
      <AnResources
        v-show="isAvailable.resources"
        :available.sync="isAvailable.resources"
      />
      <h2>Gegenüberstellung</h2>
      <AnTodoNotepad
        v-show="isAvailable.todoNotepad"
        :available.sync="isAvailable.todoNotepad"
      />
      <button
        class="an-visualisation__restart btn"
        @click="restartQuestionnaire"
      >
        Neuen Fragebogen beginnen
      </button>
    </div>
  </div>
</template>

<script>
import AnResources from '@/components/visualisations/AnResources.vue';
import AnTodoNotepad from '@/components/visualisations/AnTodoNotepad.vue';
import AnSendMail from '@/components/visualisations/AnSendMail.vue';
import { restartQuestionnaire } from '@/helpers/form.js';

export default {
  name: 'Visualisation',
  components: {
    AnResources,
    AnTodoNotepad,
    AnSendMail
  },
  data: () => ({
    isAvailable: {}
  }),
  methods: {
    restartQuestionnaire
  }
};
</script>

<style lang="scss" scoped>
.an-visualisation {
  overflow: auto;
  height: 100vh;

  &__restart {
    position: fixed;
    bottom: 1.25rem;
    right: 1.25rem;
  }
}
</style>
