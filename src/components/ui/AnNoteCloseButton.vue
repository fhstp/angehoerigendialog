<template>
  <div class="an-note-close">
    <button
      aria-label="Schließen"
      class="an-note-close__button"
      @click="closeNotes()"
    >
      X
    </button>
  </div>
</template>

<script>
export default {
  name: 'AnNoteCloseButton',
  data() {
    return {
      showNotes: this.$store.getters.getNotes
    };
  },
  methods: {
    closeNotes() {
      // this.showNotes = false;
      this.$store.commit('updateNotes', false);
    }
  }
};
</script>

<style lang="scss" scoped>
.an-note-close {
  display: flex;
  justify-content: flex-end;
  &__button {
  }
}
</style>
