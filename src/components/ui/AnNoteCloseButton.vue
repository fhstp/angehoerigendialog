<template>
  <div class="an-note-close">
    <div class="an-note-close__focusdiv" @click="focusMethod()"></div>
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
  props: {
    focusMethod: { type: Function, default: undefined }
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
  &__focusdiv {
    flex-grow: 1;
    cursor: text;
  }
}
</style>
