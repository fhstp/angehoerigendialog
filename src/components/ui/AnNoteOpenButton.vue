<template>
  <div class="an-note-open">
    <button
      aria-label="Öffnen"
      class="an-note-open__button"
      @click="openNotes()"
    >
      ✏️
    </button>
  </div>
</template>

<script>
export default {
  name: 'AnNoteOpenButton',
  data() {
    return {
      showNotes: this.$store.getters.getNotes
    };
  },
  methods: {
    openNotes() {
      // this.showNotes = true;
      this.$store.commit('updateNotes', true);
    }
  }
};
</script>

<style lang="scss" scoped>
.an-note-open {
  &__button {
    width: 50px;
    height: 50px;
  }
}
</style>
