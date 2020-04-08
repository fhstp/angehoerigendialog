<template>
  <div class="an-note-close">
    <button
      aria-label="Schließen"
      class="an-note-close__button"
      @click="closeNotes()"
    >
      ❌
    </button>
  </div>
</template>

<script>
export default {
  name: 'AnNoteCloseButton',
  data() {
    return {
      showNotes: this.$store.getters.getShowNotes
    };
  },
  methods: {
    closeNotes() {
      this.$store.commit('updateShowNotes', false);
      this.$store.commit(
        'saveNotes',
        this.$store.getters.getNotes + '\n\n' + this.$store.getters.getNewNotes
      );
      this.$store.commit('saveNewNotes', '');
    }
  }
};
</script>

<style lang="scss" scoped>
.an-note-close {
  display: flex;
  justify-content: flex-end;

  &__button {
    width: 50px;
    height: 50px;
    font-size: 25px;
    cursor: pointer;
  }
}
</style>
