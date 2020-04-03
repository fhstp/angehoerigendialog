<template>
  <div v-show="showNotes" class="an-note-text container">
    <div class="an-note__notebox">
      <textarea rows="1">Hallo Text der schon da war</textarea>
      <div>
        <span>Aktuell aktive Frage</span>
        <button>Frage als Überschrift einfügen</button>
      </div>
      <textarea placeholder="Hier neue Notiz einfügen" rows="1"></textarea>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AnNoteText',
  computed: {
    showNotes() {
      return this.$store.getters.getNotes;
    }
  }
};
</script>

<style lang="scss" scoped></style>
