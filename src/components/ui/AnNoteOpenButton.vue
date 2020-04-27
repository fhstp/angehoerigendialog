<template>
  <button aria-label="Öffnen" class="an-note-open btn" @click="openNotes()">
    <span>Notiz</span><IconEdit class="icon-edit" />
  </button>
</template>

<script>
import IconEdit from '@/assets/icons/edit.svg?inline';

export default {
  name: 'AnNoteOpenButton',
  components: {
    IconEdit
  },
  methods: {
    openNotes() {
      this.$store.commit('updateShowNotes', true);
    }
  }
};
</script>

<style lang="scss" scoped>
.an-note-open {
  display: flex;
  font-size: 1.2rem;
  margin-top: 0;
  margin-bottom: 0;
}

.icon-edit {
  margin-left: $spacer / 2;
  height: 1.2rem;
}
</style>
