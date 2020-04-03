<template>
  <div class="an-note-button container">
    <button
      :aria-label="showNotes ? 'Schließen' : 'Öffnen'"
      class="an-note-button__button--closed"
      :class="{ 'an-note-button__button--opened': showNotes }"
      @click="openNotes()"
    ></button>
  </div>
</template>

<script>
export default {
  name: 'AnNoteButton',
  data() {
    return {
      showNotes: this.$store.getters.getNotes
    };
  },
  watch: {
    showNotes(newVal) {
      this.$store.commit('updateNotes', newVal);
    }
  },
  methods: {
    openNotes() {
      this.showNotes = !this.showNotes;
    }
  }
};
</script>

<style lang="scss" scoped>
.an-note-button {
  display: flex;
  //justify-content: flex-end;
  flex-direction: row-reverse;

  &__button--closed::before {
    content: '✏️';
  }
  &__button--opened::before {
    content: 'X';
  }
}
</style>
