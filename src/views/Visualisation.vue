<template>
  <div class="container">
    <h1>Auswertung</h1>
    <h2>Meine Ressourcen</h2>
    <AnResources />
    <h2>Gegenüberstellung</h2>
    <AnTodoNotepad />
  </div>
</template>

<script>
import AnResources from '@/components/visualisations/AnResources.vue';
import AnTodoNotepad from '@/components/visualisations/AnTodoNotepad.vue';

export default {
  name: 'Visualisation',
  components: {
    AnResources,
    AnTodoNotepad
  }
};
</script>
