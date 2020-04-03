<template>
  <div v-show="showNotes" class="an-note-text">
    <div>
      <textarea rows="1">Hallo Text der schon da war</textarea>
      <div>
        <span>{{ currentQuestion }}</span>
        <button>Frage als Überschrift einfügen</button>
      </div>
      <textarea placeholder="Hier neue Notiz einfügen" rows="1"></textarea>
    </div>
  </div>
</template>

<script>
import formJson from '@/data/form.json';

export default {
  name: 'AnNoteText',
  computed: {
    showNotes() {
      return this.$store.getters.getNotes;
    },
    currentQuestion() {
      return Object(
        formJson[this.$route.query.step].fields[this.$route.query.field].label
      );
    }
  }
};
</script>

<style lang="scss" scoped>
.an-note-text {
  width: 100vw;
  height: 100vh;
  position: absolute;
  background: red;
  opacity: 0.9;
}
</style>
