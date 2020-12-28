<template>
  <nav class="an-stepper">
    <ol ref="stepsContainer" class="an-stepper__list">
      <li
        v-for="(step, i) in steps"
        :key="step.id"
        :ref="`stepperItem-${step.id}`"
        :class="[
          'an-stepper__step',
          {
            'an-stepper__step--done': step.done,
            'an-stepper__step--active': $route.query.step === step.id
          }
        ]"
      >
        <router-link
          v-if="special"
          exact-active-class="router-link-exact-active-special"
          :to="{ query: { ...$route.query, step: step.id } }"
          @click.native="$emit('input')"
        >
          <div class="an-stepper__icon-wrapper">
            <component
              :is="step.icon"
              :class="[
                'an-stepper__icon',
                { 'an-stepper__icon--active': $route.query.step === step.id }
              ]"
            />
            <IconCheckmark v-if="step.done" class="an-stepper__status" />
          </div>
          <p class="an-stepper__text">
            <span aria-hidden="true">{{ i + 1 }}.</span>
            &nbsp;{{ step.title }}
          </p>
        </router-link>

        <router-link
          v-else
          :to="{ query: { ...$route.query, step: step.id } }"
          @click.native="$emit('input')"
        >
          <div class="an-stepper__icon-wrapper">
            <component
              :is="step.icon"
              :class="[
                'an-stepper__icon',
                { 'an-stepper__icon--active': $route.query.step === step.id }
              ]"
            />
            <IconCheckmark v-if="step.done" class="an-stepper__status" />
          </div>
          <p class="an-stepper__text">
            <span aria-hidden="true">{{ i + 1 }}.</span>
            &nbsp;{{ step.title }}
          </p>
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
    },
    special: {
      type: Boolean,
      default: () => false
    }
  },
  watch: {
    '$route.query.step'(newValue) {
      this.scrollToStep(newValue, 'smooth');
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
  },
  mounted() {
    this.scrollToStep(this.$route.query.step, 'auto');
  },
  methods: {
    scrollToStep(step, behavior) {
      const foundItem = this.$refs[`stepperItem-${step}`];
      if (foundItem?.length) {
        this.$refs.stepsContainer.scrollTo({
          top: foundItem[0].offsetTop,
          left: foundItem[0].offsetLeft,
          behavior
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
$icon_width: 50px;

.router-link-exact-active {
  background-color: white;
  box-shadow: 0 0 20px 0 $color-theme-shadow;
  & p {
    color: black;
  }
}

.router-link-exact-active-special {
  background-color: #ffbe1b;
  box-shadow: 0 0 20px 0 $color-theme-shadow;
  & p {
    color: black;
  }
}

.router-link-active {
  height: 100%;
}

.an-stepper {
  overflow: hidden;

  @media #{map-get($query, 'lg-and-up')} {
    height: 100%;
    position: fixed;
    left: 0;
    width: 300px;
    top: 0;
    bottom: 0;
  }

  &__list {
    display: flex;
    width: 100%;
    overflow: auto;
    scrollbar-width: thin;
    overflow: -moz-scrollbars-none;
    scrollbar-width: none;
    -ms-overflow-style: none;
    &::-webkit-scrollbar {
      width: 0 !important;
      display: none;
    }

    a {
      text-decoration: none;
    }

    @media #{map-get($query, 'lg-and-up')} {
      flex-direction: column;
      height: 100%;
    }
  }

  &__step {
    background-color: $color-theme-lightgrey;
    flex-shrink: 0;
    width: 66%;
    list-style: none;

    &:not(:first-child):not(&--active) {
      border-left: 1px solid $color-theme-darkgrey;

      @media #{map-get($query, 'lg-and-up')} {
        border-top: 1px solid $color-theme-darkgrey;
      }
    }

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
      color: $color-theme-darkgrey;
      padding: $spacer * 4;
      justify-content: flex-start;
      z-index: 2;
      @media #{map-get($query, 'sm-and-up')} {
        padding: $spacer * 2;
      }
      @media #{map-get($query, 'lg-and-up')} {
        justify-content: center;
      }
    }
    @media #{map-get($query, 'lg-and-up')} {
      &:not(&--active) > a::after {
        content: '';
        position: absolute;
        height: 100%;
        width: 10px;
        right: 0;
        top: 0;
        background-image: linear-gradient(
          to left,
          rgba(85, 85, 85, 0.6),
          rgba(85, 85, 85, 0)
        );
      }
    }

    @media #{map-get($query, 'md-and-down')} {
      &:not(&--active) > a::after {
        content: '';
        position: absolute;
        width: 100%;
        height: 10px;
        bottom: 0;
        left: 0;
        background-image: linear-gradient(
          to top,
          rgba(85, 85, 85, 0.6),
          rgba(85, 85, 85, 0)
        );
      }
    }
  }

  &__step--active + &__step {
    border: none !important;
  }

  &__icon-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
  }

  &__icon {
    display: block;
    border-radius: 50%;
    width: $icon_width + 15px;
    height: auto;

    > circle:first-child {
      fill: $color-theme-darkgrey;
    }

    &--active {
      width: $icon_width + 15px;

      & > circle:first-child {
        fill: $color-theme-yellow;
      }
    }
  }

  &__status {
    position: absolute;
    left: 50%;
    bottom: 0;
    margin-left: $icon_width / 2;
    width: 1.2rem;

    .an-stepper__step--active & {
      margin-left: ($icon_width + 15px) / 2;
      width: 1.3rem;
      color: black;
    }
  }

  &__text {
    word-break: normal;
    overflow-wrap: anywhere;
    text-align: center;
    color: black;
  }
}
</style>
