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
    if (!this.$route.query.step) {
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

  &__list {
    display: flex;
    width: 100%;
    padding-bottom: 5rem; // hide scrollbar hack
    margin-bottom: -5rem;
    overflow: auto;
  }

  &__step {
    flex-shrink: 0;
    padding: $spacer * 4;
    width: 66%;
    list-style: none;

    @media (min-width: 500px) {
      width: 40%;
    }

    @media (min-width: 750px) {
      width: 28%;
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
