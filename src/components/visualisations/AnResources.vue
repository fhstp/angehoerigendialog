<template>
  <div class="an-resources row">
    <div class="an-resources__icon-wrapper col-md-3">
      <IconBeach class="an-resources__icon" />
    </div>
    <div class="col-md-3">
      <ul>
        <li v-for="(resource, i) in resources" :key="i">{{ resource }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import IconBeach from '@/assets/icons/beach.svg';

export default {
  name: 'AnResources',
  components: { IconBeach },
  computed: {
    resources() {
      return [];
    }
  }
};
</script>

<style lang="scss" scoped>
.an-resources {
  &__icon-wrapper {
    display: flex;
    align-content: center;
    justify-content: center;
  }

  &__icon {
    width: 75%;
  }
}
</style>
