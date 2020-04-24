<template>
  <div class="an-resources row">
    <div class="an-resources__icon-wrapper col-sm-3">
      <IconBeach class="an-resources__icon" />
    </div>
    <div class="an-resources__list-wrapper col-sm-3">
      <ul class="an-resources__list">
        <li v-for="(resource, i) in resources" :key="i">{{ resource }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import IconBeach from '@/assets/icons/beach.svg?inline';

export default {
  name: 'AnResources',
  components: { IconBeach },
  computed: {
    resources() {
      return this.$store.getters.getFieldValue(
        'ressourcen_belastungen-kraftausdauer'
      );
    }
  }
};
</script>

<style lang="scss" scoped>
.an-resources {
  &__icon-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;

    @media #{map-get($query, 'sm-and-up')} {
      justify-content: flex-end;
    }
  }

  &__icon {
    width: 100%;
    max-width: 200px;
  }

  &__list-wrapper {
    display: flex;
    align-items: center;
  }

  &__list {
    max-width: 30ch;

    @media #{map-get($query, 'xs-only')} {
      margin: 0 auto;
    }
  }
}
</style>
