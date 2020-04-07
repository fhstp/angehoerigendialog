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
      showNotes: this.$store.getters.getShowNotes
    };
  },
  methods: {
    closeNotes() {
      this.$store.commit('updateShowNotes', false);
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
