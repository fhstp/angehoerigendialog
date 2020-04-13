<template>
  <button aria-label="Öffnen" class="an-note-open" @click="openNotes()">
    ✏️
  </button>
</template>

<script>
export default {
  name: 'AnNoteOpenButton',
  methods: {
    openNotes() {
      this.$store.commit('updateShowNotes', true);
    }
  }
};
</script>

<style lang="scss" scoped>
.an-note-open {
  width: 50px;
  height: 50px;
}
</style>
