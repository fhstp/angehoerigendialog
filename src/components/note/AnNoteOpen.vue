<template>
  <router-link
    tag="button"
    class="an-note-open btn"
    :to="{ query: { ...$route.query }, hash: 'notiz' }"
    replace
  >
    <span>Notiz</span><IconEdit class="icon-edit" />
  </router-link>
</template>

<script>
import IconEdit from '@/assets/icons/edit.svg?inline';

export default {
  name: 'AnNoteOpen',
  components: {
    IconEdit
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
  margin-left: $spacer;
}
</style>
