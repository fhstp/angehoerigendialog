<template>
  <router-link
    tag="button"
    class="btn an-open-note"
    :to="{ query: { ...$route.query }, hash: 'notiz' }"
    replace
  >
  </router-link>
</template>

<script>
export default {
  name: 'AnNoteOpen'
};
</script>

<style lang="scss" scoped>
.an-open-note {
  position: fixed;
  bottom: 2vh;
  right: 2vh;
  z-index: 1000;

  border-radius: 50%;
  border: none;
  outline: none;
  box-shadow: 0 6px 10px 0 #666;
  transition: all 0.1s ease-in-out;
  background-image: url('~@/assets/icons/notizen.svg');
  background-repeat: no-repeat;
  background-position: center center;
  min-width: $fab-button-size;
  min-height: $fab-button-size;

  &:hover {
    box-shadow: 0 6px 14px 0 #666;
    transform: scale(1.05);
  }
}
</style>
