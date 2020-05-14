<template>
  <nav class="an-stepper">
    <ol ref="stepsContainer" class="an-stepper__list">
      <li
        v-for="(step, i) in steps"
        :key="step.id"
        :ref="`stepperItem-${step.id}`"
        :class="['an-stepper__step', { 'an-stepper__step--done': step.done }]"
      >
        <router-link
          :to="{ query: { ...$route.query, step: step.id } }"
          @click.native="$emit('input')"
        >
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
          <IconCheckmark v-if="step.done" class="an-stepper__status" />
        </router-link>
      </li>
    </ol>
  </nav>
</template>

<script>
export default {
  name: 'AnStepper',
  components: {
    IconCheckmark: () => import('@/assets/icons/checkmark.svg?inline')
  },
  props: {
    steps: {
      type: Array,
      default: () => []
    }
  },
  watch: {
    '$route.query.step'(newValue) {
      const foundItem = this.$refs[`stepperItem-${newValue}`];
      if (foundItem?.length) {
        this.$refs.stepsContainer.scrollTo({
          top: foundItem[0].offsetTop,
          left: foundItem[0].offsetLeft,
          behavior: 'smooth'
        });
      }
    }
  },
  created() {
    if (
      !this.$route.query.step &&
      Array.isArray(this.steps) &&
      this.steps.length
    ) {
      this.$router.replace({
        query: { ...this.$route.query, step: this.steps[0].id }
      });
    }

    for (const step of this.steps) {
      if (!(step.icon in this.$options.components)) {
        this.$options.components[step.icon] = () =>
          import(`@/assets/icons/${step.icon}.svg?inline`);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
$icon_width: 50px;

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
    background-color: #f2f5f9;

    @media #{map-get($query, 'lg-and-up')} {
      flex-direction: column;
      height: 100%;
    }
  }

  &__step {
    flex-shrink: 0;
    width: 66%;
    list-style: none;

    @media #{map-get($query, 'sm-and-up')} {
      width: 29%;
    }

    @media #{map-get($query, 'md-and-up')} {
      width: 22%;
    }

    @media #{map-get($query, 'lg-and-up')} {
      width: 100%;
      height: 12rem;
    }

    > a {
      position: relative;
      display: flex;
      flex-direction: column;
      color: black;
      padding: $spacer * 4;

      @media #{map-get($query, 'sm-and-up')} {
        padding: $spacer * 2;
      }
    }
  }

  &__icon {
    display: block;
    align-self: center;
    border-radius: 50%;
    width: $icon_width;
    height: auto;

    > circle:first-child {
      fill: $color-steppericon-inactive;
    }

    &--active > circle:first-child {
      fill: $color-steppericon-active;
    }
  }

  &__text {
    word-break: normal;
    overflow-wrap: anywhere;
  }

  &__status {
    position: absolute;
    width: 1.2rem;
    left: 50%;
    margin-left: $icon_width / 2;
  }
}
</style>
