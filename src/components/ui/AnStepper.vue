<template>
  <nav class="an-stepper">
    <ol class="an-stepper__list">
      <li v-for="(step, i) in steps" :key="i" class="an-stepper__step">
        <router-link :to="{ query: { step: step.id } }">
          <component
            :is="step.icon"
            :class="[
              'an-stepper__icon',
              { 'an-stepper__icon--active': $route.query.step === step.id }
            ]"
          />
          <p class="an-stepper__text">
            <span aria-hidden="true">{{ i + 1 }}.</span>&nbsp;{{ step.title }}
          </p>
        </router-link>
      </li>
    </ol>
  </nav>
</template>

<script>
export default {
  name: 'AnStepper',
  props: {
    steps: {
      type: Array,
      default: () => []
    }
  },
  created() {
    if (
      !this.$route.query.step &&
      Array.isArray(this.steps) &&
      this.steps.length
    ) {
      this.$router.replace({ query: { step: this.steps[0].id } });
    }

    for (const step of this.steps) {
      if (!(step.icon in this.$options.components)) {
        this.$options.components[step.icon] = () =>
          import(`@/assets/icons/${step.icon}.svg`);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.an-stepper {
  overflow: hidden;

  @media #{map-get($query, 'lg-and-up')} {
    height: 100%;
  }

  &__list {
    display: flex;
    width: 100%;
    overflow: auto;
    scrollbar-width: thin;

    @media #{map-get($query, 'lg-and-up')} {
      flex-direction: column;
      height: 100%;
    }
  }

  &__step {
    flex-shrink: 0;
    padding: $spacer * 4;
    width: 66%;
    list-style: none;

    @media #{map-get($query, 'sm-and-up')} {
      width: 29%;
      padding: $spacer * 2;
    }

    @media #{map-get($query, 'md-and-up')} {
      width: 22%;
    }

    @media #{map-get($query, 'lg-and-up')} {
      width: 100%;
      height: 19%;
    }

    > a {
      display: flex;
      flex-direction: column;
    }
  }

  &__icon {
    display: block;
    align-self: center;
    fill: white;
    background-color: black;
    border-radius: 50%;
    width: 50px;
    height: auto;

    &--active {
      fill: black;
      background-color: white;
    }
  }

  &__text {
    word-break: normal;
    overflow-wrap: anywhere;
  }
}
</style>
