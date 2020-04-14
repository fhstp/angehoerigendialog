<template>
  <div class="an-start">
    <h1>Angehörigendialog</h1>
    <router-link to="fragebogen" class="btn">start</router-link>
  </div>
</template>

<script>
export default {
  name: 'Start'
};
</script>

<style lang="scss" scoped>
.an-start {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  height: calc(var(--vh, 1vh) * 100);
  width: 100%;
}
</style>
