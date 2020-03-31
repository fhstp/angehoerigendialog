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
  width: 100%;
}
</style>
