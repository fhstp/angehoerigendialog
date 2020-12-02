<template>
  <div class="an-balloon-circle" :class="{ isSafari: isSafari }">
    <div class="an-balloon-circle__shape-left" />
    <div class="an-balloon-circle__shape-right" />
    <div ref="text" class="an-balloon-circle__text">
      <span ref="textInner">{{ text }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AnBalloonKugel',
  props: {
    text: { type: String, required: true }
  },
  data() {
    return {
      isSafari: false
    };
  },
  created() {
    const ua = navigator.userAgent.toLowerCase();
    if (ua.includes('safari')) {
      if (!ua.includes('chrome')) {
        this.isSafari = true;
      }
    }
    // https://stackoverflow.com/a/7944490
  },
  mounted() {
    setTimeout(this.calculateLabels, 500);
    setTimeout(this.calculateLabels, 5000);
    if (this.isSafari) {
      setTimeout(this.setCircleDimensions, 400);
      window.addEventListener('resize', this.setCircleDimensions);
    }
  },
  destroyed() {
    window.removeEventListener('resize', this.setCircleDimensions);
  },
  methods: {
    setCircleDimensions() {
      const { height, width } = this.$el.parentElement.getBoundingClientRect();
      this.$el.style.width = width;
      this.$el.style.height = height;
    },
    calculateLabels() {
      const getComputedStyle = (el, prop) => {
        if (el)
          return Number(window.getComputedStyle(el)[prop].replace('px', ''));
      };

      const circleHeight = getComputedStyle(this.$el, 'height');
      const text = this.$refs.text;
      const textInner = this.$refs.textInner;

      let fontSize = getComputedStyle(text, 'font-size');

      if (getComputedStyle(text, 'height') < circleHeight) {
        // add padding until text centred in circle
        let paddingTop = 1;
        while (
          paddingTop + textInner.offsetHeight / 2 <
          this.$el.offsetHeight / 2
        ) {
          text.style.paddingTop = `${paddingTop}px`;
          paddingTop++;
        }
      } else {
        console.log('resize', this.text);
        // reduce font size until text fits inside circle
        while (getComputedStyle(text, 'height') > circleHeight) {
          fontSize -= 0.1;
          text.style.fontSize = `${fontSize}px`;
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.an-balloon-circle {
  position: relative;
  height: 100%;
  width: 100%;
  background-color: $color-theme-lightblue;
  border-radius: 50%;

  &.isSafari {
    position: fixed;
    height: 260%;
    width: 260%;
    // foreignObject isn't supported in safari for 100%, that's why the circles need position fixed and 260% as width and height
    // in safari elements inside of foreignObject use html coordinate system instead of svg coordinate system
    // https://stackoverflow.com/a/62082096 https://bugs.webkit.org/show_bug.cgi?id=23113
  }

  &__shape-left,
  &__shape-right {
    width: 50%;
    height: 100%;
  }

  &__shape-left {
    float: left;
    shape-outside: polygon(
      0 0,
      98% 0,
      50% 6%,
      23.4% 17.3%,
      6% 32.6%,
      0 50%,
      6% 65.6%,
      23.4% 82.7%,
      50% 94%,
      98% 100%,
      0 100%
    );
    shape-margin: 0%;
  }

  &__shape-right {
    float: right;
    shape-outside: polygon(
      2% 0%,
      100% 0%,
      100% 100%,
      2% 100%,
      50% 94%,
      76.6% 82.7%,
      94% 65.6%,
      100% 50%,
      94% 32.6%,
      76.6% 17.3%,
      50% 6%
    );
    shape-margin: 0%;
  }

  &__text {
    font-size: 6px;
    text-align: center;
    margin: 0;

    .isSafari & {
      font-size: 12px;
    }
  }
}
</style>
